const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');
const models = require('./models');
const verifyToken = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/room');
const taskRoutes = require('./routes/taskRoutes');
const timerRoutes = require('./routes/timer');
const sessionRoutes = require('./routes/sessionRoutes');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);

app.use('/api/users', verifyToken, userRoutes);
app.use('/api/rooms', verifyToken, roomRoutes);
app.use('/api/tasks', verifyToken, taskRoutes);
app.use('/api/timer', verifyToken, timerRoutes);
app.use('/api/sessions', verifyToken, sessionRoutes);
app.use('/api/notes', verifyToken, noteRoutes);

models.sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ DB sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
