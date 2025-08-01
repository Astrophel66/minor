const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/dashboard-stats', verifyToken, userController.getDashboardStats);
router.get('/:id', verifyToken, userController.getUserProfile);

module.exports = router;
