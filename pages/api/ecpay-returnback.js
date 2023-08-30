
const sql = require('mssql');
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

//updata the rtncode to the database
async function handleTimeSheet(RtnCode, MerchantTradeNo, PaymentDate) {
  try {
    await pool.connect();
    const request = new sql.Request(pool);
    request.input('OrderID', sql.VarChar, MerchantTradeNo);
    const result = await request.query(`
        exec dbo.sp_UpdateAccentCoachTimeSheetStatus @OrderID
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

