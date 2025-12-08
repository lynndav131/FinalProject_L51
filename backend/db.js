require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 16751,
  ssl: {
        ca: fs.readFileSync(__dirname + '/certs/ca-certificate.crt'),
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

// --- Test block: only runs if you call `node db.js` directly ---
if (require.main === module) {
  pool.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      console.error('❌ Connection failed:', err);
      process.exit(1);
    } else {
      console.log('✅ Connected! Server time:', results[0].time);
      process.exit(0);
    }
  });
}