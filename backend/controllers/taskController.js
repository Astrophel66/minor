const { Task } = require('../models');

// Get all tasks for the logged-in user
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']],
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const task = await Task.create({
      title,
      description,
      UserId: userId
    });

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Update a task
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, completed } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.UserId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.UserId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};