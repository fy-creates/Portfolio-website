const express = require('express');
const router = express.Router();
const sql = require('../db');
const { pageviewLimiter } = require('../middleware/rateLimiter');

// Public: record a page view
router.post('/pageview', pageviewLimiter, async (req, res) => {
  try {
    // req.ip is the real client IP because 'trust proxy' is set in index.js.
    // (The raw x-forwarded-for header can be spoofed and may hold several IPs.)
    const ip = req.ip || null;
    const userAgent = (req.headers['user-agent'] || '').slice(0, 300) || null;
    const rawPath = typeof req.body?.path === 'string' ? req.body.path : '/';
    const path = rawPath.startsWith('/') ? rawPath.slice(0, 200) : '/';

    await sql`
      INSERT INTO "PageView" (ip, "userAgent", path)
      VALUES (${ip}, ${userAgent}, ${path})
    `;

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to record view' });
  }
});

module.exports = router;
