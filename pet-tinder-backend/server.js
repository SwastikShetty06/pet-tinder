// server.js
require('dotenv').config();

const express       = require('express');
const cors          = require('cors');
const helmet        = require('helmet');
const cookieParser  = require('cookie-parser');
const rateLimit     = require('express-rate-limit');
const connectDB     = require('./config/db');            // ← only here
const errorHandler  = require('./middlewares/errorMiddleware');

// Routes
const authRoutes   = require('./routes/authRoutes');
const userRoutes   = require('./routes/userRoutes');
const petRoutes    = require('./routes/petRoutes');
const swipeRoutes  = require('./routes/swipeRoutes');
const matchRoutes  = require('./routes/matchRoutes');

const app = express();

// 1. Connect to MongoDB
connectDB();                                             // ← and only once

// 2. CORS
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://pet-tinder-frontend.vercel.app', 'https://pet-tinder-frontend-swastikshetty06s-projects.vercel.app'] // Vercel domains
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.options('*', cors());

// 3. Security & Parsing
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// Rate limiting - relaxed for development, strict for production
const rateLimitConfig = process.env.NODE_ENV === 'production' 
  ? { windowMs: 15 * 60 * 1000, max: 100 }  // 100 requests per 15 minutes in production
  : { windowMs: 15 * 60 * 1000, max: 1000 }; // 1000 requests per 15 minutes in development

app.use(rateLimit(rateLimitConfig));

// 4. Mount routes
app.use('/api/auth',   authRoutes);
app.use('/api/users',  userRoutes);
app.use('/api/pets',   petRoutes);
app.use('/api/swipes', swipeRoutes);
app.use('/api/matches',matchRoutes);

// 5. Error handler
app.use(errorHandler);

// 6. Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
