const { Session } = require('../models');

exports.startSession = async (req, res) => {
  try {
    const { startTime, endTime, durationMinutes } = req.body;
    const userId = req.user.userId;

    // Basic Validation
    if (!startTime || !endTime || !durationMinutes) {
      return res.status(400).json({ message: 'Start time, end time, and duration are required' });
    }

    const session = await Session.create({
      startTime,
      endTime,
      durationMinutes,
      UserId: userId
    });

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const sessions = await Session.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
