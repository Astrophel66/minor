module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Session.associate = function(models) {
    Session.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    Session.belongsTo(models.Room, {
      foreignKey: 'RoomId',
      onDelete: 'CASCADE'
    });
  };

  return Session;
};
