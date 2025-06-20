const Room = require('../models/Room');
const { nanoid } = require('nanoid');

exports.createRoom = async (req, res) => {
  try {
    const code = nanoid(6); // short unique code
    const room = await Room.create({ name: req.body.name, code, users: [req.user.id] });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.body.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (!room.users.includes(req.user.id)) {
      room.users.push(req.user.id);
      await room.save();
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
