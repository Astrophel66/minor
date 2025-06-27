const express = require('express');
const router = express.Router();
const { getUserById, getDashboardStats } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Specific routes come first
router.get('/dashboard-stats', verifyToken, getDashboardStats);

// Dynamic :id route comes last to avoid conflicts
router.get('/:id', verifyToken, getUserById);

module.exports = router;
