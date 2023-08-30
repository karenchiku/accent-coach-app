import nodemailer from 'nodemailer';


const g_admin = process.env.ADMIN_EMAIL;
const g_pass = process.env.ADMIN_PASS;


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  try {

    const orderid = req.query.orderid

    const response = await fetch('api/get-booking',{
      method: 'POST',
      body:JSON.stringify({orderid}),
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json
    const booking = data[0]
    console.log(booking)
 
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
      to: `${booking.email};${g_admin}`,
      subject: 'Accent Coach Confirmation Email',
      text: `Hi ${booking.username},
        \nThank you to attend the accent coach prviate class.
        \nHere is your booking information, after the teacher confirmed we will send you a confirmation email with location address.
        \n\n1.Oreder ID:${orderid}
        \n2.預約日期:${booking.bookingdate}
        \n3.預約項目:${bookingdate.itemname}
        \n
        \n If you have any further questions pleas let us know
        `,
    
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'success' });
   
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