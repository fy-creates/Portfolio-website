const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sql = require('../db');
const requireAuth = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== 'string' || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  // Constant-time comparison (hash first so both buffers are the same length)
  const a = crypto.createHash('sha256').update(password).digest();
  const b = crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD).digest();
  if (!crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

router.get('/messages', requireAuth, async (req, res) => {
  try {
    const messages = await sql`
      SELECT * FROM "Message" ORDER BY "createdAt" DESC
    `;
    res.json(messages);
  } catch (err) {
    console.error('MESSAGES ROUTE ERROR:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const messages = await sql`
      SELECT * FROM "Message" ORDER BY "createdAt" DESC LIMIT 50
    `;
    const totalViews = await sql`SELECT COUNT(*) as count FROM "PageView"`;
    const uniqueVisitors = await sql`
      SELECT COUNT(DISTINCT ip) as count FROM "PageView" WHERE ip IS NOT NULL
    `;
    const totalMessages = await sql`SELECT COUNT(*) as count FROM "Message"`;

    res.json({
      messages,
      stats: {
        totalViews: Number(totalViews[0].count),
        uniqueVisitors: Number(uniqueVisitors[0].count),
        totalMessages: Number(totalMessages[0].count),
      },
    });
  } catch (err) {
    console.error('DASHBOARD ERROR:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
