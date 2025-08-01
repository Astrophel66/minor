const { Room, User } = require('../models');
const { nanoid } = require('nanoid');
const { Op } = require('sequelize');

exports.createRoom = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !['public', 'private'].includes(type)) {
      return res.status(400).json({ error: 'Room name and valid type are required' });
    }

    const code = nanoid(6);

    const room = await Room.create({
      name,
      type,
      code,
      creatorId: req.user.id
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


exports.joinRoom = async (req, res) => {
  try {
    const code = req.params.code || req.body.code;
    if (!code) return res.status(400).json({ error: 'Room code is required' });

    const room = await Room.findOne({
      where: { code: { [Op.iLike]: code.trim() } }
    });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const user = await User.findByPk(req.user.id);
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

exports.getUserRooms = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: { model: Room, through: { attributes: [] } }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.Rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPublicRooms = async (req, res) => {
  try {
    const publicRooms = await Room.findAll({
      where: { type: 'public' },
      include: [{ model: User, through: { attributes: [] } }]
    });

    const roomsWithCount = publicRooms.map(room => ({
      id: room.id,
      name: room.name,
      code: room.code,
      participantCount: room.Users.length
    }));

    res.json(roomsWithCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRoomDetails = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    if (isNaN(roomId)) return res.status(400).json({ error: 'Invalid room ID' });

    const room = await Room.findByPk(roomId, {
      include: { model: User, attributes: ['id', 'username', 'email'] }
    });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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

exports.getShareableLink = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    if (isNaN(roomId)) return res.status(400).json({ error: 'Invalid room ID' });

    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const link = `${baseUrl}/join/${room.code}`;

    res.json({ link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
