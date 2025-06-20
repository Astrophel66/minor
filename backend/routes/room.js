const express = require('express');
const router = express.Router();
const { createRoom, joinRoom } = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');

router.post('/create', auth, createRoom);
router.post('/join', auth, joinRoom);

module.exports = router;

