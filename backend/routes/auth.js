const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your user schema/model

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).json({ error: 'Please provide a username, email, and password.' });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({ error: 'A user with this email already exists.' });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

module.exports = router;
