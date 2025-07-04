module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: true },
    filePath: { type: DataTypes.STRING, allowNull: true }
  });

  Note.associate = (models) => {
    Note.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Note;
};
