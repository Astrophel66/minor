const express = require('express');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.authRoutes);
app.use('/rooms', routes.roomRoutes);
app.use('/tasks', routes.taskRoutes);
app.use('/timers', routes.timerRoutes);
app.use('/users', routes.userRoutes);

app.get('/', (req, res) => {
  res.send('Study Room Backend API is working');
});

db.sequelize.sync()
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Sync failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
