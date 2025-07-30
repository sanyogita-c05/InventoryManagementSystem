// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ROOT123',
  database: 'cloud_kitchen'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// 🆕 Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('❌ Login query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({ message: 'Login successful', username: user.username });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// ✅ Add item to inventory
app.post('/api/add-item', (req, res) => {
  const { item_name, quantity, unit, price } = req.body;

  const sql = 'INSERT INTO inventory (item_name, quantity, unit, price) VALUES (?, ?, ?, ?)';
  db.query(sql, [item_name, quantity, unit, price], (err, result) => {
    if (err) {
      console.error('❌ Error inserting item:', err);
      return res.status(500).json({ message: 'Error adding item', error: err });
    }

    res.status(200).json({ message: 'Item added successfully', result });
  });
});

// ✅ Get all items in inventory
app.get('/api/inventory', (req, res) => {
  const sql = 'SELECT * FROM inventory';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);  // Send all inventory items to frontend
  });
});

// ✅ Update item quantity
app.put('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const sql = 'UPDATE inventory SET quantity = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?';
  db.query(sql, [quantity, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Quantity updated successfully' });
  });
});

// ✅ Delete an item from inventory
app.delete('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM inventory WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
});

// ✅ Low stock alert (items with quantity < 10)
app.get('/api/inventory/low-stock', (req, res) => {
  const sql = 'SELECT * FROM inventory WHERE quantity < 10';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);  // Send low stock items to frontend
  });
});

// Start the backend server
app.listen(5000, () => {
  console.log('🛠️ Backend server running on http://localhost:5000');
});
