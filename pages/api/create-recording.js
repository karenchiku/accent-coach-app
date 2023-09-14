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
    const { username, email } = req.body;
    const result = await client.query(`
        INSERT INTO accentcoach_recording (username, email, created_datetime)
        VALUES ( $1, $2, $3)
      `,[username, email, new Date()]);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating newsletters' });
  } finally {
    client.release();
  }

}