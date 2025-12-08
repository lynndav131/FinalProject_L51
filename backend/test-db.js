require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      ssl: {
        ca: fs.readFileSync(__dirname + '/certs/ca-certificate.crt'),
        rejectUnauthorized: true
      }
    });

    const [rows] = await conn.query('SELECT NOW() AS time');
    console.log('✅ Connected! Server time:', rows[0].time);
    await conn.end();
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
})();
