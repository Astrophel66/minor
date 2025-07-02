const { Session } = require('../models');

exports.startSession = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('User:', req.user);

    const { startTime, endTime, duration } = req.body;
    const userId = req.user.id;

    // Basic Validation
    if (!startTime || !endTime || !duration) {
      return res.status(400).json({ message: 'Start time, end time, and duration are required' });
    }

    const session = await Session.create({
      startTime,
      endTime,
      duration,
      UserId: userId,
      RoomId: roomId
    });

    res.status(201).json(session);
  } catch (err) {
    console.error('Session creation error:', err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await Session.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(sessions);
  } catch (err) {
    console.error('Get sessions error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
