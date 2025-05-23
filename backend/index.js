const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./models/db');
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const submitRoutes = require('./routes/submit');
const userRoutes = require('./routes/users');
const codeBotRoute = require('./routes/codeBot');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Middleware
// You can customize CORS options here if needed
app.use(cors({
  origin: '*' // or restrict to your frontend URL(s)
}));
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

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
