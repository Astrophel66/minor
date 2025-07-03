const { User, Room, Session } = require('../models');
const { Op, fn, col, literal } = require('sequelize');
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'createdAt']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const studyMinutes = await Session.sum('duration', { where: { UserId: userId } }) || 0;
const studyHours = (studyMinutes / 60).toFixed(2);

    const activeRooms = await Room.count({
      include: [{
        association: 'Users',
        where: { id: userId }
      }]
    });
    const goalsMet = await Session.count({
      where: {
        UserId: userId,
        duration: 25
      }
    });

    const sessions = await Session.findAll({
      where: { UserId: userId },
    attributes: [
  [fn('DATE', col('startTime')), 'sessionDate']
],
group: [fn('DATE', col('startTime'))],
      order: [[fn('DATE', col('startTime')), 'DESC']]
    });

    const sessionDates = sessions.map(s => s.get('sessionDate'));
    const today = new Date();
    let streak = 0;

    for (let i = 0; i < sessionDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      const formatted= expectedDate.toISOString().split('T')[0];

      if (sessionDates.includes(formatted)) streak++;
      else break;
    }

    res.json({ studyHours, activeRooms, goalsMet, streakDays: streak });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};
