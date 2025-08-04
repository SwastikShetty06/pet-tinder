const Match = require('../models/Match');
const Pet = require('../models/Pet');

// @route GET /api/matches
exports.getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ userId: req.user._id }).populate('petId');
    res.json(matches);
  } catch (err) { next(err); }
};
