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
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  return Session;
};
