import nodemailer from 'nodemailer';
import multer from 'multer';

const storage = multer.memoryStorage(); // This will store the file in memory. You can use other storage options if needed.
const upload = multer({ storage: storage }).single('audio');

const g_admin = process.env.ADMIN_EMAIL;
const g_pass = process.env.ADMIN_PASS;


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  try {

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).send({ error: err.message });
      } else if (err) {
        return res.status(500).send({ error: err.message });
      }

    const audioFile = req.file;
    const username = req.body.username;
    const email = req.body.email;

     // Create a transporter object using the default SMTP transport
     const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: g_admin,
        pass: g_pass,
      },
    });

    const mailOptions = {
      from: g_admin,
      to: `${email};${g_admin}`,
      subject: 'Accent Coach Sample Recording',
      text: `Hi ${username},\nthank you to attend your recording test, here is your recording! \nOur Accnet Coach will give you a feedback through the the email\nThank you for your paitant!\n\n** Regarding the recording methods the audio might not play properly on iPhone, but it works well on the PC.`,
      attachments: [
        {
          filename: `recoding-${username}.mp3`,
          content: audioFile.buffer,
          contentType: 'audio/mp3',
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'success' });

  })


   

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
};