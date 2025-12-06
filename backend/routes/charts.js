const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/summary-data', authenticateToken, (req, res) => {
  res.json({
    data: [
      { label: 'Transformer Models', value: 40 },
      { label: 'Diffusion Models', value: 30 },
      { label: 'Multimodal AI', value: 20 },
      { label: 'AI in Art', value: 10 }
    ]
  });
});

router.get('/reports-data', authenticateToken, (req, res) => {
  res.json({
    data: [
      { label: 'OpenAI', value: 35 },
      { label: 'Anthropic', value: 25 },
      { label: 'Google DeepMind', value: 20 },
      { label: 'Meta AI', value: 20 }
    ]
  });
});

module.exports = router;
