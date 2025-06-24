const { Sequelize } = require('sequelize');

// Set up Sequelize instance (adjust config as needed)
const sequelize = new Sequelize('studyroom', 'postgres', 'daisyrajbhandari', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection failed:', err));

// Export the Sequelize instance for use in other files
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
