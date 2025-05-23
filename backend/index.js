const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./models/db');
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const submitRoutes = require('./routes/submit');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;
const codeBotRoute = require('./routes/codeBot');
// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the CodeMaster API!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submit', submitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/codebot', codeBotRoute);
// 404 Handler (for unknown routes)
app.use((req, res, next) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
