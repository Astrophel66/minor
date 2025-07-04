const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const db = {};

// Load models
db.User = require('./User')(sequelize, DataTypes);
db.Room = require('./Room')(sequelize, DataTypes);
db.Task = require('./Task')(sequelize, DataTypes);
db.Session = require('./Session')(sequelize, DataTypes);
db.Note = require('./Note')(sequelize, DataTypes);  // ✅ Added Note model

// Define associations
db.User.hasMany(db.Task);
db.Task.belongsTo(db.User);

db.User.belongsToMany(db.Room, { through: 'UserRooms' });
db.Room.belongsToMany(db.User, { through: 'UserRooms' });

db.Room.hasMany(db.Task);
db.Task.belongsTo(db.Room);

db.Session.belongsTo(db.User, { foreignKey: { allowNull: false } });
db.Session.belongsTo(db.Room, { foreignKey: { allowNull: true } });

db.Note.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });  // ✅ Explicit association for notes
db.User.hasMany(db.Note, { foreignKey: 'userId', onDelete: 'CASCADE' });   // ✅ User can have many notes

// Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
