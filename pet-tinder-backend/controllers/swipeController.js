const Swipe = require('../models/Swipe');
const Match = require('../models/Match');

// @route POST /api/swipes
exports.recordSwipe = async (req, res, next) => {
  try {
    const { petId, direction } = req.body;
    const swipe = await Swipe.create({
      userId: req.user._id,
      petId,
      direction,
    });

    if (direction === 'like') {
      // Create a match when user likes a pet (for adoption app)
      await Match.create({ userId: req.user._id, petId });
    }

    res.status(201).json(swipe);
  } catch (err) { next(err); }
};

// @route GET /api/swipes/user/:userId
exports.getSwipes = async (req, res, next) => {
  try {
    const swipes = await Swipe.find({ userId: req.params.userId });
    res.json(swipes);
  } catch (err) { next(err); }
};
