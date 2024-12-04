const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventoryService');
const authenticateToken = require('../middleware/UserAuth');

// Apply the authenticateToken middleware to all routes
router.use(authenticateToken);

// GET inventory contents
router.get('/', async (req, res) => {
  try {
    const inventoryContents = await inventoryService.getinventoryContents(req.user.userId);
    res.json(inventoryContents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT bulk update inventory // changed to post
router.put('/', async (req, res) => {
  try {
    const inventoryItems = req.body.inventoryItems; // Expects an array of items with productId and quantity
    await inventoryService.updateinventory(req.user.userId, inventoryItems);
    res.json({ message: 'inventory updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
