
const querystring = require('querystring');
const crypto = require('crypto');

const HASH_KEY = process.env.HASH_KEY;
const HASH_IV = process.env.HASH_IV;


// 計算 CheckMacValue
export const computeCheckMacValue = (data) => {
    // 將參數按照參數名稱的字母順序排序
    const sortedData = Object.keys(data).sort().reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});
  
    // 將參數轉換成 URL 字串
    // const urlEncodedData = querystring.stringify(sortedData);
    const urlEncodedString = Object.entries(sortedData).map(([key, value]) => `${key}=${value}`).join('&');
    // 將 HashKey 加到 URL 字串的前面，將 HashIV 加到 URL 字串的後面
    const urlEncodedDataWithHash = `HashKey=${HASH_KEY}&${urlEncodedString}&HashIV=${HASH_IV}`;
    // console.log(urlEncodedDataWithHash)
    // 將 URL 字串轉換成小寫的 STRING
    const lowercaseEncodedDataWithHash = encodeURIComponent(urlEncodedDataWithHash).toLowerCase().replace(/%20/g, "+");
  
    // console.log(lowercaseEncodedDataWithHash)
    // 使用 SHA256 加密 HEX 字串，並轉換成大寫的 SHA256 字串
    const hash = crypto.createHash('sha256').update(lowercaseEncodedDataWithHash).digest('hex').toUpperCase();
    return hash;
  };
  