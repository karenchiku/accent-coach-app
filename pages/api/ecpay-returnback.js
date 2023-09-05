
const sql = require('mssql');
import nodemailer from 'nodemailer';
const crypto = require('crypto');
import { computeCheckMacValue } from '../../components/utils/checkmachinevalue';
import config from '../../config/config';
const pool = new sql.ConnectionPool(config);

const MERCHANT_ID = process.env.MERCHANT_ID;
const HASH_KEY = process.env.HASH_KEY;
const HASH_IV = process.env.HASH_IV;

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
      await handleBookSendEmail(MerchantTradeNo)
      console.log('Send email ', MerchantTradeNo)
   
      res.status(200).send('1|OK')

    } else {
      res.status(400).send('0|FAIL')
    }

  } catch (err) {
    console.log(err)
    res.status(400).send('0|FAIL')
  }

}
//updata the rtncode to the database
async function handleRtncode(RtnCode, MerchantTradeNo, PaymentDate) {
  try {
    await pool.connect();
    const request = new sql.Request(pool);
    request.input('OrderID', sql.VarChar, MerchantTradeNo);
    request.input('RtnCode', sql.VarChar, RtnCode);
    request.input('PaymentDate', sql.DateTime, PaymentDate);
    const result = await request.query(`
        exec dbo.sp_UpdateAccentCoachBooking @OrderID,  @PaymentDate, @RtnCode
    `);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.close();
  }
}

//insert the result to database 
async function handleResult(RtnCode, RtnMsg, MerchantID, MerchantTradeNo, PaymentDate, PaymentType, PaymentTypeChargeFee, TradeNo, TradeDate, TradeAmt, CheckMacValue, calculateCheckMacValue) {
  try {
    await pool.connect();
    const request = new sql.Request(pool);
    request.input('MerchantID', sql.VarChar, MerchantID);
    request.input('MerchantTradeNo', sql.VarChar, MerchantTradeNo);
    request.input('RtnCode', sql.VarChar, RtnCode);
    request.input('RtnMsg', sql.NVarChar, RtnMsg);
    request.input('PaymentDate', sql.DateTime, PaymentDate);
    request.input('PaymentType', sql.VarChar, PaymentType);
    request.input('PaymentTypeChargeFee', sql.VarChar, PaymentTypeChargeFee);
    request.input('TradeNo', sql.VarChar, TradeNo);
    request.input('TradeDate', sql.DateTime, TradeDate);
    request.input('TradeAmt', sql.Int, TradeAmt);
    request.input('CheckMacValue', sql.VarChar, CheckMacValue);
    request.input('CalculateCheckMacValue', sql.VarChar, calculateCheckMacValue);
    const result = await request.query(`
        INSERT INTO [accentcoach_epaycallback] (MerchantID, MerchantTradeNo, RtnCode, RtnMsg, PaymentDate, PaymentType, PaymentTypeChargeFee, TradeNo, TradeDate, TradeAmt , CheckMacValue,CalculateCheckMacValue)
        VALUES (@MerchantID, @MerchantTradeNo, @RtnCode, @RtnMsg, @PaymentDate, @PaymentType,@PaymentTypeChargeFee, @TradeNo, @TradeDate, @TradeAmt, @CheckMacValue, @CalculateCheckMacValue)
        `);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.close();
  }
}

async function handleBookSendEmail(orderid) {
 
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
      subject: 'test message',
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

    // Send the email
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error(error);
  } finally {
    await pool.close();
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

