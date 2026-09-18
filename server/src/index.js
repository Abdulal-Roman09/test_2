const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const menuRoutes = require('./routes/menu');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV === 'development' || origin === CLIENT_URL || origin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for preview/local demo purposes
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Ember & Bloom Roastery API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root API greeting
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Ember & Bloom Coffee Roasters API',
    endpoints: {
      health: 'GET /api/health',
      menu: 'GET /api/menu',
      menuFiltered: 'GET /api/menu?category=...&dietary=...&featured=true',
      contact: 'POST /api/contact',
      newsletter: 'POST /api/newsletter'
    }
  });
});

// Mount modular routes
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// 404 handler for unknown routes
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

// Only listen if not imported by tests
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`☕ Ember & Bloom API server is running on http://localhost:${PORT}`);
    console.log(`👉 CORS enabled for client: ${CLIENT_URL}`);
  });
}

module.exports = app;
