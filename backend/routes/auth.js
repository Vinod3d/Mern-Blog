const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// Register Route
router.post('/register', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).json({ error: 'Please provide a username, email, and password.' });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({ error: 'A user with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password:hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});


//LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '3d',
    });

    res.cookie("token", token).status(200).json({ user, token, message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to log in.' });
  }
});



// Logout Route
router.post('/logout', (req, res) => {
  // Clear the JWT token on the client-side. In this example, we clear the 'token' cookie.
  res.clearCookie('token');

  // Send a response indicating successful logout.
  res.status(200).json({ message: 'Logout successful' });
});



module.exports = router;
