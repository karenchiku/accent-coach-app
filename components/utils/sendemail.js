import nodemailer from 'nodemailer';
const sql = require('mssql');
import dbconfig from '../../config/config';

const pool = new sql.ConnectionPool(dbconfig);

const g_admin = process.env.ADMIN_EMAIL;
const g_pass = process.env.ADMIN_PASS;


export async function sendEmail(orderid) {

  try {
    await pool.connect();
   
    console.log('send-email:', orderid)
    const query = `SELECT * FROM dbo.accentcoach_bookings WHERE orderid ='${orderid}'`;
    const result = await pool.request().query(query);
    const booking =result.recordset[0]

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
      subject: 'test',
      text: `Hi ${booking.username},
        \nThank you for attending the accent coach class.
        \nHere is your booking information, after the teacher confirmed we will send you a confirmation email with location address.
        \n\n1.你的訂單編號:${orderid}
        \n2.預約日期:${booking.bookingdate}
        \n3.預約項目:${booking.itemname}
        \n
        \n If you have any further questions pleas let us know.
        \n Best,
        \n Accent Coach Team
        `,
    
    };
  } catch (error) {
    console.error(error);
    
  }
}