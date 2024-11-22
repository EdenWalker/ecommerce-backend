const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./database');
const app = express();

const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productsRouter);
// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});