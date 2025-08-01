const { Session } = require('../models');

const startSession = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('User:', req.user);

    const { startTime, endTime, duration, roomId } = req.body;
    const userId = req.user.id;

    if (!startTime || !endTime || !duration || !roomId) {
      return res.status(400).json({ message: 'Start time, end time, duration, and roomId are required' });
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

const getUserSessions = async (req, res) => {
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

const stopSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;

    const session = await Session.findOne({
      where: { id: sessionId, UserId: userId }
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.endTime = new Date().toISOString();
    await session.save();

    res.json(session);
  } catch (err) {
    console.error('Error stopping session:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  startSession,
  getUserSessions,
  stopSession
};
