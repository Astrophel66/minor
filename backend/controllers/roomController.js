const { Room, User } = require('../models');
const { nanoid } = require('nanoid');

exports.createRoom = async (req, res) => {
  try {
    const code = nanoid(6);

    const room = await Room.create({
      name: req.body.name,
      code,
      creatorId: req.user.id   // Add creatorId field
    });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await room.addUser(user);

    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Join room by code (POST body or URL param)
exports.joinRoom = async (req, res) => {
  try {
    const code = req.body.code || req.params.code;
    if (!code) return res.status(400).json({ error: 'Room code is required' });

    const room = await Room.findOne({ where: { code } });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMember = await room.hasUser(user);
    if (!isMember) {
      await room.addUser(user);
    }

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all rooms the user is part of
exports.getUserRooms = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Room
    });
if (!user) return res.status(404).json({ message: 'User not found' });
 console.log('✅ User Rooms:', user.Rooms);  
    res.json(user.Rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get room details by numeric room ID
exports.getRoomDetails = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    if (isNaN(roomId)) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await Room.findByPk(roomId, {
      include: {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    });

    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get shareable link for a room
exports.getShareableLink = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    if (isNaN(roomId)) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const link = `${baseUrl}/join/${room.code}`;

    res.json({ link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;

    const room = await Room.findByPk(roomId);

    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (room.creatorId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this room' });
    }

    await room.destroy();

    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


