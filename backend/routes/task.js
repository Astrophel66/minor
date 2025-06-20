const express = require('express');
const router = express.Router();
const { createTask, getUserTasks, toggleTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createTask);
router.get('/', auth, getUserTasks);
router.patch('/:id/toggle', auth, toggleTask);

module.exports = router;
