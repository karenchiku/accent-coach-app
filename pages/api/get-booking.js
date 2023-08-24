const sql = require('mssql');
import config from '../../config/config';

const pool = new sql.ConnectionPool(config);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await pool.connect();

    const { orderid } = req.body;
    // console.log(orderid)
    const query = `SELECT * FROM dbo.accentcoach_bookings WHERE orderid ='${orderid}'`;
    // console.log(query)
    const result = await pool.request().query(query);
    // console.log(result.recordset[0])
    res.status(200).json(result.recordset);
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error get booking' });
  } finally {
    await pool.close();
  }
}