

import nodemailer from 'nodemailer';
const crypto = require('crypto');
import { computeCheckMacValue } from '../../components/utils/checkmachinevalue';

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?ssl=true&sslmode=require",
});

const MERCHANT_ID = process.env.MERCHANT_ID;
const HASH_KEY = process.env.HASH_KEY;
const HASH_IV = process.env.HASH_IV;

const g_admin = process.env.ADMIN_EMAIL;
const g_pass = process.env.ADMIN_PASS;



export default async function ecpaycallback(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { RtnCode, RtnMsg, MerchantID, MerchantTradeNo, PaymentDate, PaymentType, PaymentTypeChargeFee, TradeNo, TradeDate, TradeAmt, CheckMacValue } = req.body
  const data = req.body
  delete data.CheckMacValue;
  const calculateCheckMacValue = computeCheckMacValue(data);
  
  try {

    if (CheckMacValue == calculateCheckMacValue) {  // chage to chcekmacvalue
      await handleResult(RtnCode, RtnMsg, MerchantID, MerchantTradeNo, PaymentDate, PaymentType, PaymentTypeChargeFee, TradeNo, TradeDate, TradeAmt, CheckMacValue, calculateCheckMacValue)
      console.log('Insert return result ', MerchantTradeNo)
      await handleRtncode(RtnCode, MerchantTradeNo, PaymentDate)
      console.log('Update booking ', MerchantTradeNo)
      
      if (RtnCode == 1) {
      await handleBookSendEmail(MerchantTradeNo)
      console.log('Send email ', MerchantTradeNo)
      }
      // feedback to the ecpay
      res.status(200).send('1|OK')
    } else {
      // feedback to the ecpay
      res.status(400).send('0|FAIL')
    }

  } catch (err) {
    console.log(err)
    res.status(400).send('0|FAIL')
  }

}
//updata the rtncode to the database
async function handleRtncode(RtnCode, MerchantTradeNo, PaymentDate) {
  const client = await pool.connect();
  
  try {
    const query = `
      CALL sp_UpdateAccentCoachBooking($1, $2, $3);
    `;

    const values = [
      MerchantTradeNo,
      PaymentDate,
      RtnCode
    ];
    
    await client.query(query, values);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}
//insert the result to database 
async function handleResult(RtnCode, RtnMsg, MerchantID, MerchantTradeNo, PaymentDate, PaymentType, PaymentTypeChargeFee, TradeNo, TradeDate, TradeAmt, CheckMacValue, calculateCheckMacValue) {
  const client = await pool.connect();
  
  try {
    const query = `
      INSERT INTO accentcoach_epaycallback 
      (MerchantID, MerchantTradeNo, RtnCode, RtnMsg, PaymentDate, PaymentType, PaymentTypeChargeFee, TradeNo, TradeDate, TradeAmt , CheckMacValue, CalculateCheckMacValue)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    const values = [
      MerchantID, 
      MerchantTradeNo, 
      RtnCode, 
      RtnMsg, 
      PaymentDate, 
      PaymentType, 
      PaymentTypeChargeFee, 
      TradeNo, 
      TradeDate, 
      TradeAmt, 
      CheckMacValue, 
      calculateCheckMacValue
    ];
    
    await client.query(query, values);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

async function handleBookSendEmail(orderid) {

  const client = await pool.connect();

  try {
      
      const query = `SELECT * FROM accentcoach_bookings WHERE orderid = $1`;
      const result = await client.query(query, [orderid]);
      const booking =result.rows[0]

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
      to: `${booking.email}`,
      subject: 'Accent Coach 訂單明細',
      text: `Hi ${booking.username},
        Thank you for attending the accent coach class.
        Here is your booking information, after the teacher confirmed we will send you a confirmation email with location address.
        1.你的訂單編號:${orderid}
        2.預約日期:${booking.bookingdate}
        3.預約項目:${booking.itemname}
        Best,
        Accent Coach Team
        `,
    
    };

    // Send the email
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

// async function handleBookSendEmail(MerchantTradeNo){
//   try{
//     const response = await fetch('http://www.accentcoach.co/api/send-email', {
//       method: 'POST',
//       body: JSON.stringify({ orderid : MerchantTradeNo}),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const data = await response.json();
    
//   }catch(err){
//     console.log(err);
//   }
  
 
// }
// before delete [Object: null prototype] {
//   CustomField1: '',
//   CustomField2: '',
//   CustomField3: '',
//   CustomField4: '',
//   MerchantID: '2000132',
//   MerchantTradeNo: 'T169271317319478',
//   PaymentDate: '2023/08/22 22:07:34',
//   PaymentType: 'Credit_CreditCard',
//   PaymentTypeChargeFee: '60',
//   RtnCode: '1',
//   RtnMsg: '交易成功',
//   SimulatePaid: '0',
//   StoreID: '',
//   TradeAmt: '3000',
//   TradeDate: '2023/08/22 22:06:21',
//   TradeNo: '2308222206216430',
//   CheckMacValue: '0C9E116CB26A4ABE7E2397686ED5336ED07D648371DF35982F44B8678DD8F29C'
// }
// after delete [Object: null prototype] {
//   CustomField1: '',
//   CustomField2: '',
//   CustomField3: '',
//   CustomField4: '',
//   MerchantID: '2000132',
//   MerchantTradeNo: 'T169271317319478',
//   PaymentDate: '2023/08/22 22:07:34',
//   PaymentType: 'Credit_CreditCard',
//   PaymentTypeChargeFee: '60',
//   RtnCode: '1',
//   RtnMsg: '交易成功',
//   SimulatePaid: '0',
//   StoreID: '',
//   TradeAmt: '3000',
//   TradeDate: '2023/08/22 22:06:21',
//   TradeNo: '2308222206216430'
// }

