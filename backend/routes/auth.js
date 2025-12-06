const express = require('express');
const jwt = require('jsonwebtoken');
// Optionally: const bcrypt = require('bcryptjs'); for real hashing
const router = express.Router();

// Simple demo login (replace with real user lookup if desired)
// For your course requirement: username/password == FirstName: Lynnox
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'Lynnox' && password === 'Lynnox') {
    const payload = { sub: username, role: 'student', id: '800854051' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;
