const express = require('express');
const router = express.Router();
const sql = require('../db');
const { contactLimiter } = require('../middleware/rateLimiter');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: 'One or more fields exceed the allowed length' });
  }
  try {
    const [saved] = await sql`
      INSERT INTO "Message" (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id
    `;
    res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    console.error('CONTACT ROUTE ERROR:', err);
    res.status(500).json({ error: 'Something went wrong saving your message' });
  }
});

module.exports = router;
