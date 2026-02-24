const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// 🔥 GET ALL USERS (Admin Only)
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;