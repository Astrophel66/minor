// backend/models/index.js
const sequelize = require('../config/db');
const User = require('./User');
const Room = require('./Room');
const Task = require('./Task');
const Session = require('./Session');

// Define associations (example)
User.hasMany(Task);
Task.belongsTo(User);

User.belongsToMany(Room, { through: 'UserRooms' });
Room.belongsToMany(User, { through: 'UserRooms' });

Room.hasMany(Task);
Task.belongsTo(Room);

Session.belongsTo(User);
Session.belongsTo(Room);

module.exports = {
  sequelize,
  User,
  Room,
  Task,
  Session,
};
