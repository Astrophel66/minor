// backend/models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Task;
