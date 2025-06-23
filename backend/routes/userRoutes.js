// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello user with ID: ${req.user.userId}` });
});

module.exports = router;
