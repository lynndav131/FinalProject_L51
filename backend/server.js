const express = require('express');
const app = express();
const db = require('./utils/db'); // ✅ Import your DB pool
require('dotenv').config();

// Middleware
app.use(express.json());

// Routers
const chartsRouter = require('./routes/charts');
const authRouter = require('./routes/auth');

app.use('/charts', chartsRouter);
app.use('/auth', authRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // ✅ Test DB connection after server starts
  (async () => {
    try {
      const [rows] = await db.query('SELECT 1');
      console.log('✅ DB connection successful');
    } catch (err) {
      console.error('❌ DB connection failed:', err.message);
    }
  })();
});
