const sql = require('mssql');
import config from '../../config/config';

const pool = new sql.ConnectionPool(config);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
    try {
      await pool.connect();

      const { email } = req.body;
      const request = new sql.Request(pool);
      request.input('email', sql.VarChar, email);
 
      const result = await request.query(`
        INSERT INTO accentcoach_newsletter (email)
        VALUES ( @email)
      `);
      
      res.status(200).json({email});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating newsletters' });
    } finally {
      await pool.close();
    }

}