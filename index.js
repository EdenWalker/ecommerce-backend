const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const inventoryRoutes = require('./routes/inventory');


// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productsRouter);
app.use('/api/register', userRoutes)
// Routes
//app.get('/', (req, res) => {
 // res.json({ message: "Welcome to the API" });
//});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});