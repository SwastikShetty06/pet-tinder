const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { recordSwipe, getSwipes } = require('../controllers/swipeController');
const router = express.Router();

router.post('/', protect, recordSwipe);
router.get('/user/:userId', protect, getSwipes);

module.exports = router;
