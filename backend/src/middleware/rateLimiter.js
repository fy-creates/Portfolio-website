const rateLimit = require('express-rate-limit');

// Contact form: generous enough for a real visitor, tight enough to stop spam bots
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many messages sent. Please try again in a few minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin login: strict, since this guards write access to the dashboard
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

module.exports = { contactLimiter, loginLimiter };
