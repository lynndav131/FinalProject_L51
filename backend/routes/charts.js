const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const db = require('../config/db');

// Summary chart data
router.get('/summary-data', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT label, value FROM chart_data WHERE chart_type = ?',
      ['summary']
    );
    res.json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Reports chart data
router.get('/reports-data', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT label, value FROM chart_data WHERE chart_type = ?',
      ['reports']
    );
    res.json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
