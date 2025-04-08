const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModels"); // Correct path, defined once
const router = express.Router();

// Create API route (POST /)
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    return res.status(201).json(userAdded); // Single response
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message }); // Single error response
  }
});

// Get all users (GET /)
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    return res.status(200).json(showAll); // Single response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Single error response
  }
});

// get Single user

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const singleUser = await User.findById({_id : id});
    return res.status(200).json(singleUser); // Single response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Single error response
  }
});

// Delete Operation for any _id
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const singleUser = await User.findByIdAndDelete({_id : id});
    return res.status(200).json(singleUser); // Single response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Single error response
  }
});

//put/update/patch
router.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const {name,email,age} = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
    return res.status(200).json(updateUser); // Single response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Single error response
  }
});


module.exports = router;