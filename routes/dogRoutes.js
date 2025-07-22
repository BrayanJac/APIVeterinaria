const express = require("express");
const router = express.Router();
const Dog = require("../models/dog");

function calculateHumanAge(birthDate) {
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();

  const m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function calculateDogAge(humanAge) {
  if (humanAge === 1) return 15;
  if (humanAge === 2) return 24;
  if (humanAge >= 3) return 24 + (humanAge - 2) * 4;
  return 0;
}

router.post("/dog", async (req, res) => {
  try {
    const { idDog, birth_date, name, breed, gender, owner, phone } = req.body;

    if (!birth_date || !name || !breed || !gender || !owner || !phone || !idDog) {
      return res.status(400).json({ message: "The information is required" });
    }

    const birthDateObj = new Date(birth_date);
    if (isNaN(birthDateObj.getTime())) {
      return res.status(400).json({ message: "birth_date is invalid" });
    }

    const newDog = new Dog({
      idDog,
      name,
      breed,
      birth_date: birthDateObj,
      gender,
      owner,
      phone,
    });

    await newDog.save();

    res.status(201).json(newDog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating dog" });
  }
});

router.get("/dogs", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (error) {
    console.error("Error in /dogs route:", error);
    res.status(500).json({ message: "Error fetching dogs" });
  }
});

router.get("/dog", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json(dog);
  } catch (error) {
    console.error("Error in /dog route:", error);
    res.status(500).json({ message: "Error fetching dog" });
  }
});

router.put("/dog/:id", async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json(dog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating dog" });
  }
});

router.delete("/dog/:id", async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json({ message: "Dog deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting dog" });
  }
});

module.exports = router;