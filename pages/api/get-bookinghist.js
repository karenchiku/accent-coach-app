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
    const { email, phone } = req.body;
    const query = `SELECT * FROM accentcoach_bookings WHERE email = $1 AND phone = $2`;
    const result = await client.query(query, [email, phone]);
    
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error query booking' });
  } finally {
    client.release();
  }
}
