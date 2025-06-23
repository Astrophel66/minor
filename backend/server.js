const express = require('express');
const app = require('./app'); // Assuming all routes/middleware are inside app.js
const sequelize = require('./config/db'); // Only declared ONCE
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const app = express();
const userRoutes = require('./routes/userRoutes'); // ← import the new route
const authRoutes = require('./routes/authRoutes');
// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // Base path for user routes
app.use('/api/users', authRoutes);
// Start server
app.listen(3000, () => console.log('Server is running on port 3000'));
