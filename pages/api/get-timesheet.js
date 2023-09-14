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
    const { teacherid } = req.body;

    // Using parameterized query for safety
    const query = `
      SELECT opendatetime, EXTRACT(DOW FROM opendatetime) AS weekday 
      FROM accentcoach_timesheet
      WHERE teacherid = $1
      AND opendatetime > NOW() + INTERVAL '1 day'
      AND opendatetime < NOW() + INTERVAL '8 days'
      ORDER BY 1`;

    const result = await client.query(query, [teacherid]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error querying timesheet' });
  } finally {
    client.release();
  }
}
