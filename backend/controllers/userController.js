const { User } = require('../models');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboardStats = (req, res) => {
  console.log(req.user);
  res.json({
    studyHours: 120,
    activeRooms: 5,
    goalsMet: 8,
    streakDays: 15,
  });
};
