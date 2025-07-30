const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const bcrypt = require('bcrypt'); 

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
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

// ---------------------- Login API ----------------------
// ---------------------- Secure Login API ----------------------
// ✅ LOGIN Route (Updated)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const sql = 'SELECT id, username, email, password FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error during login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user_id: user.id,
      username: user.username,
      email: user.email
    });
  });
});




// ---------------------- Inventory APIs ----------------------
// ✅ POST - Add Item
app.post("/additem", (req, res) => {
  const { item_name, quantity, unit, price, user_id } = req.body;

  if (!item_name || !quantity || !unit || !user_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `INSERT INTO inventory (item_name, quantity, unit, price, user_id)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [item_name, quantity, unit, price, user_id], (err, result) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
    res.status(200).json({ message: "✅ Item added successfully!" });
  });
});




// ✅ GET - View Inventory
app.get('/api/inventory', (req, res) => {
  const user_id = req.query.user_id;
  console.log("🔍 Received User ID for Inventory:", user_id); // Debug log

  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });

  const sql = 'SELECT * FROM inventory WHERE user_id = ?';
  
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching inventory:', err);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Inventory fetched for user:", user_id, results); // Debug log
    res.status(200).json(results);
  });
});


// ✅ PUT - Update Item
app.put('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, unit, price, user_id } = req.body;
  if (!id || !user_id) return res.status(400).json({ message: '🚨 Item ID and User ID are required' });

  const sql = `
    UPDATE inventory 
    SET item_name = ?, quantity = ?, unit = ?, price = ?, last_updated = CURRENT_TIMESTAMP 
    WHERE id = ? AND user_id = ?`;

  db.query(sql, [item_name, quantity, unit, price, id, user_id], (err, result) => {
    if (err) {
      console.error('❌ Error updating item:', err);
      return res.status(500).json({ message: '❌ Server error while updating item.' });
    }
    res.status(200).json({ message: result.affectedRows > 0 ? '✅ Inventory updated successfully' : '🚨 Item not found' });
  });
});


// ✅ DELETE - Delete Item
// ✅ DELETE - Delete Item
app.delete('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  console.log("🔧 Delete Request - User ID:", user_id, "Item ID:", id); // ✅ Debug log

  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });

  const sql = 'DELETE FROM inventory WHERE id = ? AND user_id = ?';
  db.query(sql, [id, user_id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting item:', err);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Delete Result:", result); // ✅ Debug log
    res.status(200).json({ message: result.affectedRows > 0 ? '✅ Item deleted successfully' : '🚨 Item not found for this user' });
  });
});





// ✅ GET - Fetch Low Stock Items (Backend)

// ✅ GET - Fetch Low Stock Items (Backend)
app.get('/api/inventory/low-stock', (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });

  const query = 'SELECT * FROM inventory WHERE user_id = ? AND quantity < 10 ORDER BY quantity ASC';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching low stock items:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(200).json({ message: '✅ All items have sufficient stock!' });
    }

    res.status(200).json(results);
  });
});


// ---------------------- Vendor APIs ----------------------
// Backend - server.js
// POST Vendor with user_id
// Create Vendor
app.post('/api/vendors', (req, res) => {
  const { name, contact_person, phone, email, address, delivery_time, payment_terms, user_id } = req.body;

  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });
  if (!name) return res.status(400).json({ message: '🚨 Vendor name is required' });

  const sql = `INSERT INTO vendors (name, contact_person, phone, email, address, delivery_time, payment_terms, user_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, contact_person, phone, email, address, delivery_time, payment_terms, user_id], 
    (err, result) => {
      if (err) return res.status(500).json({ error: '❌ Failed to add vendor', details: err.message });
      res.status(201).json({ message: '✅ Vendor added successfully', id: result.insertId });
    }
  );
});

// Fetch Vendors for User
app.get('/api/vendors', (req, res) => {
  const user_id = req.query.user_id;
  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });

  const sql = 'SELECT * FROM vendors WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: '❌ Failed to fetch vendors', details: err.message });
    res.status(200).json(results);
  });
});

// Update Vendor
app.put('/api/vendors/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact_person, phone, email, address, delivery_time, payment_terms, user_id } = req.body;

  const sql = `UPDATE vendors SET name = ?, contact_person = ?, phone = ?, email = ?, 
               address = ?, delivery_time = ?, payment_terms = ? 
               WHERE id = ? AND user_id = ?`;

  db.query(sql, [name, contact_person, phone, email, address, delivery_time, payment_terms, id, user_id], 
    (err, result) => {
      if (err) return res.status(500).json({ message: '❌ Server error', error: err.message });
      if (result.affectedRows > 0) {
        res.status(200).json({ message: '✅ Vendor updated successfully' });
      } else {
        res.status(404).json({ message: '🚫 Vendor not found' });
      }
    }
  );
});

// Delete Vendor
app.delete('/api/vendors/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });

  db.query('DELETE FROM vendors WHERE id = ? AND user_id = ?', [id, user_id], 
    (err, result) => {
      if (err) return res.status(500).json({ message: '❌ Server error', error: err.message });
      if (result.affectedRows > 0) {
        res.status(200).json({ message: '✅ Vendor deleted successfully' });
      } else {
        res.status(404).json({ message: '🚫 Vendor not found' });
      }
    }
  );
});


// ---------------------- Purchase APIs ----------------------
// POST Purchase with user_id
// ✅ POST Purchase with user_id
// POST Purchase with user_id
// POST Purchase with user_id
app.post('/api/purchases', (req, res) => {
  const { vendor_id, item_name, quantity, unit_price, purchase_date, user_id } = req.body;

  if (!user_id) return res.status(400).json({ message: '🚨 User ID is required' });

  // Validate inputs
  if (!vendor_id || !item_name || !quantity || !unit_price || !purchase_date) {
    return res.status(400).json({ message: '🚨 All fields are required' });
  }

  if (quantity <= 0 || unit_price <= 0) {
    return res.status(400).json({ message: '🚨 Quantity and Unit Price must be positive values' });
  }

  const today = new Date().toISOString().split('T')[0];
  if (new Date(purchase_date) > new Date(today)) {
    return res.status(400).json({ message: '🚨 Purchase Date cannot be in the future' });
  }

  // Calculate total price
  const total_price = parseFloat(unit_price) * parseInt(quantity);

  const sql = `
    INSERT INTO purchases (vendor_id, item_name, quantity, unit_price, total_price, purchase_date, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [vendor_id, item_name, quantity, unit_price, total_price, purchase_date, user_id], (err, result) => {
    if (err) {
      console.error('❌ Error inserting purchase:', err);
      return res.status(500).json({ error: '❌ Failed to add purchase', details: err.message });
    }

    res.status(201).json({ message: '✅ Purchase added successfully', id: result.insertId });
  });
});


// GET Purchases by user_id
app.get('/api/purchases', (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) return res.status(400).json({ message: 'User ID is required' });

  db.query('SELECT * FROM purchases WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching purchases:', err);
      return res.status(500).json({ error: 'Failed to fetch purchases' });
    }
    res.status(200).json(results);
  });
});

// ---------------------- Order APIs ----------------------
// server.js - /api/orders POST API
// POST Order with user_id
app.post('/api/orders', (req, res) => {
  const { customer_name, dish_name, quantity, price, order_date, partner, user_id } = req.body;

  if (!customer_name || !dish_name || !quantity || !price || !order_date || !partner || !user_id) {
    return res.status(400).json({ message: 'All fields including user_id are required' });
  }

  const sql = `
    INSERT INTO orders (customer_name, dish_name, quantity, price, order_date, partner, user_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [customer_name, dish_name, quantity, price, order_date, partner, user_id], (err, result) => {
    if (err) {
      console.error('❌ Error adding order:', err);
      return res.status(500).json({ message: 'Failed to add order', error: err.message });
    }
    res.status(201).json({ message: 'Order added', id: result.insertId });
  });
});

// GET Orders by user_id
app.get('/api/orders', (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) return res.status(400).json({ message: 'User ID is required' });

  const sql = 'SELECT * FROM orders WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.status(200).json(results);
  });
});

// ---------------------- Signup API ----------------------
// Signup API (server.js)
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertUserSql, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });

      res.status(201).json({ message: 'Signup successful', username });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ---------------------- Start Server ----------------------

app.listen(PORT, () => {
  console.log(`🛠️ Server running on http://localhost:${PORT}`);
});
