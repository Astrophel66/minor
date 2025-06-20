const Session = require('../models/Session');

exports.startSession = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const duration = (new Date(endTime) - new Date(startTime)) / 60000;

    const session = await Session.create({
      user: req.user.id,
      room: req.body.room,
      startTime,
      endTime,
      duration
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
