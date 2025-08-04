const express = require('express');
const {
  createPet,
  getPets,
  getPet,
  updatePet,
  deletePet
} = require('../controllers/petController');

// import the actual middleware function, not the whole module
const { protect } = require('../middlewares/authMiddleware');
const upload     = require('../middlewares/uploadMiddleware');

const router = express.Router();

// protect *all* pet routes
router.use(protect);

// Image upload + create
router.post('/', upload, createPet);

// Other CRUD
router.get('/',   getPets);
router.get('/:id', getPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
