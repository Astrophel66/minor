const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');

router.post('/create', auth, roomController.createRoom);
router.post('/join', auth, roomController.joinRoom);
router.post('/join/:code', auth, roomController.joinRoom);
router.get('/my-rooms', auth, roomController.getUserRooms);
router.get('/public', auth, roomController.getPublicRooms);
router.get('/:id', auth, roomController.getRoomDetails);
router.get('/shareable-link/:id', auth, roomController.getShareableLink);
router.delete('/:id', auth, roomController.deleteRoom);

module.exports = router;
