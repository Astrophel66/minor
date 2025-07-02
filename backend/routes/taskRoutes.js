const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// No verifyToken here, it's applied globally in server.js

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/toggle', taskController.toggleTask);

module.exports = router;
