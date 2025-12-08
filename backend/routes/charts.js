const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const db = require('../db');   // import your pool/connection

// Summary chart data
router.get('/summary-data', authenticateToken, (req, res) => {
  db.query(
    'SELECT label, value FROM chart_data WHERE chart_type = ?',
    ['summary'],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ data: results });
    }
  );
});

// Reports chart data
router.get('/reports-data', authenticateToken, (req, res) => {
  db.query(
    'SELECT label, value FROM chart_data WHERE chart_type = ?',
    ['reports'],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ data: results });
    }
  );
});

module.exports = router;

// --- Test block: only runs if you call `node charts.js` directly ---
if (require.main === module) {
  console.log('🔍 Testing charts queries...');

  // Test summary-data
  db.query(
    'SELECT label, value FROM chart_data WHERE chart_type = ?',
    ['summary'],
    (err, results) => {
      if (err) {
        console.error('❌ Summary query failed:', err);
      } else {
        console.log('✅ Summary query results:', results);
      }
    }
  );

  // Test reports-data
  db.query(
    'SELECT label, value FROM chart_data WHERE chart_type = ?',
    ['reports'],
    (err, results) => {
      if (err) {
        console.error('❌ Reports query failed:', err);
      } else {
        console.log('✅ Reports query results:', results);
      }
      // Close pool after tests
      db.end();
    }
  );
}
