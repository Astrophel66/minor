const express = require('express');
const router = express.Router();
const { User } = require('../models');
const verifyToken = require('../middleware/authMiddleware');

// Existing protected route
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello user with ID: ${req.user.userId}` });
});

// NEW: Route to get user details by ID (protected)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
