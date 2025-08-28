const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const projectRoutes = require('./routes/project');
const contactRoutes = require('./routes/contact');
const connectMongo = require('./config/mongo');

// 🔹 DB connection
connectMongo();

const app = express();


// -------------------- Prometheus Monitoring --------------------
const promClient = require('prom-client');

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add default metrics collection (CPU, memory, event loop, etc.)
promClient.collectDefaultMetrics({ 
  register,
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], 
});

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new promClient.Gauge({
  name: 'nodejs_active_connections',
  help: 'Number of active connections'
});

// Register custom metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);

// Middleware to track metrics
app.use((req, res, next) => {
  const startTime = Date.now();
  activeConnections.inc();

  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestDuration.labels(req.method, route, res.statusCode).observe(duration);
    httpRequestsTotal.labels(req.method, route, res.statusCode).inc();
    activeConnections.dec();
  });

  next();
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    res.status(500).end(error.message);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
// ---------------------------------------------------------------


// -------------------- Middleware --------------------
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Log requests
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// -------------------- Routes --------------------
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Serve frontend index.html for any other route
app.get(/^\/(?!.*\.\w+$)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// -------------------- Server --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Metrics at http://localhost:${PORT}/metrics`);
  console.log(`❤️ Health at http://localhost:${PORT}/health`);
});
