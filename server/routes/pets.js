const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

// middleware to validate a pet ID exists
async function getPet(req, res, next) {
  let pet;
  try {
    pet = await Pet.findById(req.params.id);

    // If valid ID format but no pet found:
    if (pet == null) {
      return res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    // This error fires when ID is not a valid ObjectId format
    return res.status(400).json({ message: "Invalid ID format" });
  }

  res.pet = pet;
  next();
}

// create a new pet
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);          // Mongoose validates here
    const savedPet = await pet.save();      // Saves only if valid
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single pet by id
router.get('/:id', getPet, (req, res) => {
  res.json(res.pet);
});

// update a pet by id
router.put('/:id', getPet, async (req, res) => {
  try {
    // Copy fields from req.body into the existing pet
    Object.assign(res.pet, req.body);

    const updatedPet = await res.pet.save();  // Save updated values
    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a pet by id
router.delete('/:id', getPet, async (req, res) => {
  try {
    await res.pet.deleteOne();
    res.json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
