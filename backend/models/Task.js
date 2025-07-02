module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
  title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoomId: {
  type: DataTypes.INTEGER,
  allowNull: true, 
  references: {
    model: 'Rooms',
    key: 'id'
  }
}
  });
Task.associate = models => {
  Task.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
    Task.belongsTo(models.Room, { foreignKey: 'RoomId', as: 'room' });
  };
  return Task;
};
