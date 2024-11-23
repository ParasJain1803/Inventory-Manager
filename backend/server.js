const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const inventoryRoutes = require('./api/inventoryRoutes');
const userRoutes = require('./api/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // For parsing JSON

// API Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
