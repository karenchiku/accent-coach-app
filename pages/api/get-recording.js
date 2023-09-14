const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?ssl=true&sslmode=require",
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const client = await pool.connect();

  try {
    const { email } = req.body;
    const query = `SELECT email FROM accentcoach_recording WHERE email = $1`;
    const result = await client.query(query, [email]);
    
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error query recordings' });
  } finally {
    client.release();
  }
}
