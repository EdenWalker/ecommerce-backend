const pool = require('../database');

// Fetch inventory contents for a user
async function getinventoryContents(userId) {
  const [rows] = await pool.query(
    `SELECT 
    c.product_id, 
    p.name AS productName, 
    p.price, 
    p.image, 
    c.quantity 
   FROM 
    inventory_items c 
   JOIN 
    products p 
   ON 
    c.product_id = p.id 
   WHERE 
    c.user_id = ?`,
  [userId]
  );
  return rows;
}

// Bulk update the inventory contents
async function updateinventory(userId, inventoryItems) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Clear existing inventory items for the user
    await connection.query('DELETE FROM inventory_items WHERE user_id = ?', [userId]);

    // Insert each item in the new inventory
    for (const item of inventoryItems) {
      await connection.query(
        'INSERT INTO inventory_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, item.product_id, item.quantity]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  getinventoryContents,
  updateinventory, // New bulk update function
};
