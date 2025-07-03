const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const models = require('./models');
const verifyToken = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/room');
const taskRoutes = require('./routes/taskRoutes');
const timerRoutes = require('./routes/timer');
const sessionRoutes = require('./routes/sessionRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

// Protected routes
app.use('/api/tasks', verifyToken, taskRoutes);
app.use('/api/timer', verifyToken, timerRoutes);
app.use('/api/sessions', verifyToken, sessionRoutes);

// DB Sync - ensure tables exist
models.sequelize.sync()

  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('DB sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
