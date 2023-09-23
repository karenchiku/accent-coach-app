
import { computeCheckMacValue } from '../../components/utils/checkmachinevalue';

const ECPAY_PAYMENT_API_URL = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';

// const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_ID = 3390141

export default async function ecpayinfo(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  try {
    const { orderid, amount, itemname, bookingdate, email } = req.body;

    let data = {
      MerchantID: MERCHANT_ID,
      MerchantTradeNo: orderid, // 產生一個唯一的訂單編號
      MerchantTradeDate: new Date().toISOString().substring(0, 19).replace('T', ' ').replace('-', '/').replace('-', '/'), // 訂單建立日期時間，格式為 yyyy/MM/dd HH:mm:ss
      PaymentType: 'aio',
      TotalAmount: amount, // 訂單總金額
      TradeDesc: `${itemname}-${bookingdate}-${email}`, // 交易描述
      ItemName: itemname, // 商品名稱
      ReturnURL: 'https://www.accentcoach.co/api/ecpay-returnback',  // ReturnURL為付款結果通知回傳網址，為特店server或主機的URL，用來接收綠界後端回傳的付款結果通知。
      ClientBackURL: 'https://www.accentcoach.co/', // 消費者點選此按鈕後，會將頁面導回到此設定的網址(返回商店按鈕)
      OrderResultURL: 'https://accentcoach.vercel.app/api/ecpay-orderresultcallback', // 消費者付款完成後，綠界會將付款結果參數以POST方式回傳到到該網址
      ChoosePayment: 'ALL',
      EncryptType: 1, // 交易資料加密類型，固定為 1

    };

    const checkMacValue = computeCheckMacValue(data);
    data.CheckMacValue = checkMacValue;
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating machine code' });
  }


};

// // 計算 CheckMacValue
// const computeCheckMacValue = (data) => {
//   // 將參數按照參數名稱的字母順序排序
//   const sortedData = Object.keys(data).sort().reduce((acc, key) => {
//     acc[key] = data[key];
//     return acc;
//   }, {});

//   // 將參數轉換成 URL 字串
//   // const urlEncodedData = querystring.stringify(sortedData);
//   const urlEncodedString = Object.entries(sortedData).map(([key, value]) => `${key}=${value}`).join('&');
//   // 將 HashKey 加到 URL 字串的前面，將 HashIV 加到 URL 字串的後面
//   const urlEncodedDataWithHash = `HashKey=${HASH_KEY}&${urlEncodedString}&HashIV=${HASH_IV}`;
//   // console.log(urlEncodedDataWithHash)
//   // 將 URL 字串轉換成小寫的 STRING
//   const lowercaseEncodedDataWithHash = encodeURIComponent(urlEncodedDataWithHash).toLowerCase().replace(/%20/g, "+");

//   // console.log(lowercaseEncodedDataWithHash)
//   // 使用 SHA256 加密 HEX 字串，並轉換成大寫的 SHA256 字串
//   const hash = crypto.createHash('sha256').update(lowercaseEncodedDataWithHash).digest('hex').toUpperCase();
//   return hash;
// };


