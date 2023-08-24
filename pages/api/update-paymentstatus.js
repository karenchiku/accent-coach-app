const sql = require('mssql');
import config from '../../config/config';
const pool = new sql.ConnectionPool(config);

//0 init, 1 student confrimed, 2 pay completed, 3 teacher confirmed, 4 applied cancel, 6 refund completed

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
    try {
      await pool.connect();

      const {  orderid } = req.body;
      const request = new sql.Request(pool);
      request.input('orderid', sql.VarChar, username);
      const result = await request.query(`
      update accentcoach_bookings set bookstatus = 1 where orderid = @orderid
      `);

      res.status(200).json({orderid});
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error update booking status'});
    } finally {
      await pool.close();
    }

}