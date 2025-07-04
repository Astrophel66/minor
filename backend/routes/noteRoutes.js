const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', noteController.getNotes);
router.post('/', upload.single('file'), noteController.createNote);
router.put('/:id', upload.single('file'), noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
