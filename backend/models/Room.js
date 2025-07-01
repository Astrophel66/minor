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
    creatorId: {
  type: DataTypes.INTEGER,
  allowNull: false
}
});
 Room.associate = (models) => {
    Room.belongsToMany(models.User, { through: 'RoomUsers' });
  };
  return Room;
};
