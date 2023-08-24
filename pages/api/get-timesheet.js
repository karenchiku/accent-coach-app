const sql = require('mssql');
import config from '../../config/config';

const pool = new sql.ConnectionPool(config);

// 0 close, 1 open, 2 book 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await pool.connect();

    const { teacherid } = req.body;
    const query = `SELECT opendatetime FROM accentcoach_timesheet  where teacherid = ${teacherid} and status = 1`;
    const result = await pool.request().query(query);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error query timesheet' });
  } finally {
    await pool.close();
  }



}
