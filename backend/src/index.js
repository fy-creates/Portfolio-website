require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Render (and most hosts) sit behind a reverse proxy. Without this, req.ip is the
// proxy's IP, so every visitor shares one rate-limit bucket and analytics IPs are wrong.
app.set('trust proxy', 1);

// Comma-separated list in FRONTEND_URL env var, e.g.
// FRONTEND_URL=https://portfolio-website-ruby-nine-45.vercel.app,https://yourdomain.com,https://www.yourdomain.com
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow tools like curl/Postman (no origin header) and any explicitly listed origin
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Reject without throwing so the browser gets a clean CORS failure, not a 500 stack trace
    return callback(null, false);
  },
}));
app.use(express.json({ limit: '20kb' }));

app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => res.send('Portfolio backend running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
