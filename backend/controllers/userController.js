const { User, Room, Task, Session } = require('../models');

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboardStats = async (req, res) => {
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

    const streakDays = 5;  // Placeholder

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
};
