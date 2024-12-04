const inventoryData = require('../data/inventoryData');

/**
 * Fetches all inventory contents for a specific user.
 * @param {number} userId - ID of the user
 * @returns {Promise<Array>} - List of inventory items with product details
 */
async function getinventoryContents(userId) {
  return await inventoryData.getinventoryContents(userId);
}

/**
 * Updates the inventory with a new set of items.
 * This function performs a bulk update, replacing the inventory contents with the provided items.
 * @param {number} userId - ID of the user
 * @param {Array} inventoryItems - Array of items to update in the inventory
 */
async function updateinventory(userId, inventoryItems) {
  if (!Array.isArray(inventoryItems)) {
    throw new Error('inventory items must be an array');
  }
  await inventoryData.updateinventory(userId, inventoryItems);
}

module.exports = {
  getinventoryContents,
  updateinventory // Only bulk update is needed now
};
