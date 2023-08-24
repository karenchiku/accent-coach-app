


export default async function ecpaycallback(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  try {
    const { MerchantTradeNo, RtnCode, RtnMsg } = req.body

    if (RtnCode == 1 & RtnMsg == "Succeeded") {
      res.redirect(302, 'https://www.accentcoach.co/order/' + MerchantTradeNo);

    } else {
      res.redirect(302, 'https://www.accentcoach.co/order/order_fail/');

    }
  } catch (error) {
    console.log(error);
  }
}
