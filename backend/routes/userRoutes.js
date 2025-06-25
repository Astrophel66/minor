const express = require('express');
const router = express.Router();
const { User, Room, Task, Session } = require('../models');
const verifyToken = require('../middleware/authMiddleware');

// Existing protected route
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello user with ID: ${req.user.userId}` });
});

// Route to get user details by ID (protected)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// New: Route to get dynamic dashboard stats (protected)
router.get('/dashboard-stats', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalUsers = await User.count();

    const userRooms = await Room.findAll({
      include: {
        model: User,
        where: { id: userId }
      }
    });

    const activeRooms = userRooms.length;

    const goalsMet = await Task.count({
      where: { userId, completed: true }
    });

    const studyHours = await Session.sum('duration', {
      where: { userId }
    }) || 0;

    // Real streak logic: Count sessions in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const streakDays = await Session.count({
      where: {
        userId,
        createdAt: { [Op.gte]: sevenDaysAgo }
      }
    });

    res.json({
      studyHours,
      activeRooms,
      totalUsers,
      goalsMet,
      streakDays
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;