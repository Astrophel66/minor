const { Note } = require('../models');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.id },
      order: [['updatedAt', 'DESC']]
    });
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title = '', content = '' } = req.body;

    if (title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      filePath: req.file ? req.file.path : null,
      userId: req.user.id
    });

    res.status(201).json(note);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note || note.userId !== req.user.id) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const { title, content } = req.body;

    await note.update({
      title: title !== undefined ? title.trim() : note.title,
      content: content !== undefined ? content.trim() : note.content,
      filePath: req.file ? req.file.path : note.filePath
    });

    res.json(note);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note || note.userId !== req.user.id) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.destroy();
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
