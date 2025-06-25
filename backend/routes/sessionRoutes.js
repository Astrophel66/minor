const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/authMiddleware');

router.post('/start', auth, sessionController.startSession);
router.get('/my-sessions', auth, sessionController.getUserSessions);

module.exports = router;
