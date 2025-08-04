const User = require('../models/User');

// @route GET /api/users/:id
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

// @route PUT /api/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const updates = (({ name, email }) => ({ name, email }))(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true
    }).select('-passwordHash');
    res.json(user);
  } catch (err) { next(err); }
};
