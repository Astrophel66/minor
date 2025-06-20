const express = require('express');
const router = express.Router();
const { startSession, getUserSessions } = require('../controllers/timerController');
const auth = require('../middleware/authMiddleware');

router.post('/start', auth, startSession);
router.get('/', auth, getUserSessions);

module.exports = router;
