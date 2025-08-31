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