// backend/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load .env early

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,  // Disable SQL logging in console
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Database connection established.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
