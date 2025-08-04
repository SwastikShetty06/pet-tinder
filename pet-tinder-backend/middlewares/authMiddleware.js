// middlewares/authMiddleware.js
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');
    if (!req.user) throw new Error();

    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
