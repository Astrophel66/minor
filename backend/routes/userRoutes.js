const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Specific routes first
router.get('/dashboard-stats', verifyToken, userController.getDashboardStats);

// Dynamic :id route last to avoid conflicts
router.get('/:id', verifyToken, userController.getUserProfile);

module.exports = router;
