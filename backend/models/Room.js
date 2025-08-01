module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('public', 'private'),
      defaultValue: 'private'
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Room.associate = (models) => {
    Room.belongsToMany(models.User, { through: 'UserRooms', as: 'users' });

  };

  return Room;
};
