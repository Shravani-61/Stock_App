require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./src/auth/routes');
const authMiddleware = require('./src/middleware/auth');
const apiRoutes = require('./src/routes/api');
require('./src/auth/passport');

const app = express();

// CORS: only allow the frontend origin
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(express.json());

// Session is used only for the OAuth handshake; we issue JWT afterwards
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth routes
app.use('/auth', authRoutes);

// Protected API routes
app.use('/api', authMiddleware, apiRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_auth';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
