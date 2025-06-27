const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'users',     // correct location for tableName
    timestamps: true,       // correct location for timestamps
  });
  // Hash password before saving
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
