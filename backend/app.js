const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const projectRoutes = require('./routes/project');

require('dotenv').config();

// DB connection
const connectMongo = require('./config/mongo');
connectMongo();

const app = express();

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
