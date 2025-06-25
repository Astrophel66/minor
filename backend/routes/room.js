const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');  // Adjust path if needed

// Create room
router.post('/create', auth, roomController.createRoom);

// Join room by POST body
router.post('/join', auth, roomController.joinRoom);

// Join room by URL param
router.post('/join/:code', auth, roomController.joinRoom);

// Get user's rooms
router.get('/my-rooms', auth, roomController.getUserRooms);

// Get room details by room ID
router.get('/:id', auth, roomController.getRoomDetails);

// Get shareable link for a room
router.get('/shareable-link/:id', auth, roomController.getShareableLink);

module.exports = router;
