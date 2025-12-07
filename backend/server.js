const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const chartRoutes = require('./routes/charts');

const app = express();


const db = require('./utils/db');

(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ DB connection successful');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
})();


// CORS (adjust origin as needed)
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: false }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', app: 'L51' }));

app.use('/auth', authRoutes);
app.use('/charts', chartRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
