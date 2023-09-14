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
    const orderid = `T${(new Date()).getTime()}${Math.floor(Math.random() * 100)}`;
    const { username, phone, email, itemname, amount, bookingdate, allowtosend } = req.body;

    const result = await client.query(`
        INSERT INTO accentcoach_bookings 
        (orderid, username, phone, email, itemname, amount, bookingdate, created_datetime, paystatus, bookstatus, allowtosend)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, $9)
      `, [orderid, username, phone, email, itemname, amount, new Date(bookingdate), new Date(), allowtosend]);

    res.status(200).json({ orderid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating booking' });
  } finally {
    client.release();
  }
}
