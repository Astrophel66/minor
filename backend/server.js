const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All routes mounted with /api prefix
app.use('/api/auth', routes.authRoutes);
app.use('/api/rooms', routes.roomRoutes);
app.use('/api/tasks', routes.taskRoutes);
app.use('/api/timers', routes.timerRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/sessions', routes.sessionRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Study Room Backend API is working');
});

// Database Sync
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Sync failed:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
