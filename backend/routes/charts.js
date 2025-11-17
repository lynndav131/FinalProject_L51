const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const db = require('../config/db');

// Chart 1: Line chart data (placeholder static or switch to DB query)
router.get('/chart1', authenticateToken, async (req, res) => {
  // Example static payload — replace with a DB query if needed
  // const [rows] = await db.query('SELECT ... FROM ... WHERE ...');
  return res.json({
    title: 'GenAI Mentions by Month',
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    values: [15, 22, 28, 31, 40, 45]
  });
});

// Chart 2: Bar chart data (placeholder)
router.get('/chart2', authenticateToken, async (req, res) => {
  return res.json({
    title: 'Domains Impacted by GenAI',
    categories: ['Search', 'Legal', 'Industrial', 'Research', 'Cloud'],
    counts: [5, 3, 4, 6, 7]
  });
});

// Optional: DB-backed example endpoint with placeholders
router.get('/db-example', authenticateToken, async (req, res) => {
  try {
    // Placeholder query; adjust to your schema
    // const [rows] = await db.query('SELECT category, count FROM genai_stats ORDER BY count DESC LIMIT 10');
    return res.json({
      message: 'Replace with your actual DB query and schema.',
      rows: []
    });
  } catch (err) {
    return res.status(500).json({ error: 'DB query failed', detail: String(err) });
  }
});

module.exports = router;
