const Pet        = require('../models/Pet');
const cloudinary = require('../config/cloudinary');
const multer     = require('multer');
const DatauriParser = require('datauri/parser');

const storage = multer.memoryStorage();
const upload  = multer({ storage }).array('images', 5);
const parser  = new DatauriParser();

const parseBuffer = (file) => parser.format(file.originalname, file.buffer).content;

// @route POST /api/pets
exports.createPet = async (req, res, next) => {
  try {
    const images = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const dataUri = parseBuffer(file);
        const { secure_url } = await cloudinary.uploader.upload(dataUri);
        images.push(secure_url);
      }
    }

    const pet = await Pet.create({
      ownerId: req.user._id,
      ...req.body,
      images,
    });
    res.status(201).json(pet);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/pets
exports.getPets = async (req, res, next) => {
  try {
    const Swipe = require('../models/Swipe');
    
    // Get pets that the user has already swiped on
    const swipedPets = await Swipe.find({ userId: req.user._id }).select('petId');
    const swipedPetIds = swipedPets.map(swipe => swipe.petId);
    
    // Get pets excluding user's own pets and already swiped pets
    const pets = await Pet.find({ 
      ownerId: { $ne: req.user._id },
      _id: { $nin: swipedPetIds }
    }).limit(20);
    
    res.json(pets);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/pets/:id
exports.getPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/pets/:id
exports.updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!pet) return res.status(404).json({ message: 'Pet not found or unauthorized' });
    res.json(pet);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/pets/:id
exports.deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
    if (!pet) return res.status(404).json({ message: 'Pet not found or unauthorized' });
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    next(err);
  }
};
