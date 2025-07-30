// 📁 src/Components/UpdateItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './UpdateInventory.css'; // connect your CSS

function UpdateItem() {
  const [id, setId] = useState('');
  const [item_name, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !item_name || !quantity || !unit || !price) {
      setMessage('🚨 All fields are required!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
const user_id = user ? user.id : null;

    if (!user_id) {
      setMessage('❌ User not logged in. Please log in first.');
      return;
    }

    const updatedItem = { item_name, quantity, unit, price, user_id };

    try {
      const response = await axios.put(
       `http://localhost:5000/api/inventory/${id}?user_id=${user_id}`
,
        updatedItem
      );
      setMessage(`✅ ${response.data.message}`);
    } catch (error) {
      setMessage('❌ Error updating item. Please try again.');
      console.error('❌ Error:', error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Inventory Item</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>Item ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="form-input"
            required
          >
            <option value="">--Select Unit--</option>
            <option value="kg">kg</option>
            <option value="gram">gram</option>
            <option value="litre">litre</option>
            <option value="ml">ml</option>
            <option value="piece">piece</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="update-btn">
          Update Item
        </button>
      </form>

      {message && <p className="update-message">{message}</p>}
    </div>
  );
}

export default UpdateItem;
