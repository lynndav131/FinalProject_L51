const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config(); // ✅ Load environment variables

// ✅ Import database pool (callback API)
const db = require('./db');

// ✅ Import routers
const chartsRouter = require('./routes/charts');
const authRouter = require('./routes/auth');

// ✅ Middleware
app.use(express.json());

// ✅ Serve frontend build files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use('/charts', chartsRouter);
app.use('/auth', authRouter);

// ✅ Catch‑all route for React client‑side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // ✅ Test DB connection after server starts (callback style)
  db.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('❌ DB connection failed:', err.message);
    } else {
      console.log('✅ DB connection successful');
    }
  });
});
