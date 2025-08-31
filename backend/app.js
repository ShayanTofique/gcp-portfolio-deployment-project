const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const projectRoutes = require('./routes/project');

// Prometheus metrics
const client = require('prom-client');

require('dotenv').config();

// DB connection
const connectMongo = require('./config/mongo');
connectMongo();

const app = express();

// Create Prometheus metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Add to your app.js (after existing metrics)

// Real-time visitor tracking
const currentVisitors = new client.Gauge({
  name: 'current_active_visitors',
  help: 'Current active visitors on the site'
});

const visitorSessions = new client.Counter({
  name: 'visitor_sessions_total',
  help: 'Total visitor sessions',
  labelNames: ['page', 'user_agent_type']
});

// Store active sessions in memory (in production, use Redis)
const activeSessions = new Map();
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Helper function to detect device type
function getDeviceType(userAgent) {
  if (/mobile/i.test(userAgent)) return 'mobile';
  if (/tablet/i.test(userAgent)) return 'tablet';
  return 'desktop';
}

// Helper function to generate session ID
function generateSessionId(req) {
  return req.ip + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Visitor tracking middleware (add after your existing middleware)
app.use((req, res, next) => {
  const sessionId = req.headers['x-session-id'] || generateSessionId(req);
  const now = Date.now();
  const page = req.path;
  const deviceType = getDeviceType(req.headers['user-agent'] || '');
  
  // Track this session
  activeSessions.set(sessionId, {
    lastSeen: now,
    page: page,
    deviceType: deviceType,
    ip: req.ip
  });
  
  // Clean up old sessions (older than 5 minutes)
  for (const [id, session] of activeSessions.entries()) {
    if (now - session.lastSeen > SESSION_TIMEOUT) {
      activeSessions.delete(id);
    }
  }
  
  // Update metrics
  currentVisitors.set(activeSessions.size);
  
  // Track new session if it's a page visit (not API call)
  if (!page.startsWith('/api') && !path.includes('metrics')) {
    visitorSessions.labels(page, deviceType).inc();
  }
  
  // Add session ID to response header for frontend tracking
  res.setHeader('X-Session-ID', sessionId);
  
  next();
});

// New API endpoint to get current visitor count
app.get('/api/stats/visitors', (req, res) => {
  const stats = {
    currentVisitors: activeSessions.size,
    sessions: Array.from(activeSessions.values()).map(session => ({
      page: session.page,
      deviceType: session.deviceType,
      timeActive: Math.floor((Date.now() - session.lastSeen) / 1000)
    }))
  };
  res.json(stats);
});

// Real-time visitor count endpoint for frontend
app.get('/api/stats/live-count', (req, res) => {
  res.json({ 
    count: activeSessions.size,
    timestamp: new Date().toISOString()
  });
});

// Middleware to collect metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/projects', projectRoutes);

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  client.register.metrics().then(metrics => {
    res.end(metrics);
  });
});

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Serve frontend index.html for any other route (non-static)
app.get(/^\/(?!.*\.\w+$)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));