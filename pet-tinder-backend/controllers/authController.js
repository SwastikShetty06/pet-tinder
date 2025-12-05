const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Session = require('../models/Session');

// Helper to issue JWT and set cookie
const issueToken = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  // save session (optional)
  await Session.create({
    userId: user._id,
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Cookie configuration optimized for mobile browsers
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Better mobile compatibility
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };

  // For mobile browsers, we might need to adjust secure flag
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
    cookieOptions.sameSite = 'none'; // Required for cross-origin in production
  }

  res.cookie('token', token, cookieOptions);
  return token;
};

// @route POST /api/auth/signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = await issueToken(user, res);
    res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
  } catch (err) { next(err); }
};

// @route POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await issueToken(user, res);
    res.json({ id: user._id, name: user.name, email: user.email, token });
  } catch (err) { next(err); }
};

// @route GET /api/auth/me
exports.getMe = (req, res) => {
  res.json(req.user);
};

// @route POST /api/auth/logout
exports.logout = async (req, res, next) => {
  try {
    // Clear the cookie with same options as setting
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    };

    res.clearCookie('token', cookieOptions);

    // Optionally, remove session from database if token is provided
    const token = req.cookies.token;
    if (token) {
      await Session.deleteOne({ token });
    }

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};
