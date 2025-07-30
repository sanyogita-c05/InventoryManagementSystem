import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

function AddItem() {
  const [item_name, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item_name || !quantity || !unit || !price) {
      setMessage('🚨 All fields are required.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user ? user.id : null;
    if (!user_id) {
      setMessage('❌ User not logged in.');
      return;
    }

    const newItem = { item_name, quantity: parseInt(quantity), unit, price: parseFloat(price), user_id };

    try {
      const response = await axios.post('http://localhost:5000/additem', newItem);
      setMessage(`✅ ${response.data.message}`);
      setItemName('');
      setQuantity('');
      setUnit('');
      setPrice('');
    } catch (error) {
  console.error('❌ Error adding item:', error);

  // Enhanced error logging
  if (error.response) {
    console.error('❌ Error Response Data:', error.response.data);
    console.error('❌ Error Response Status:', error.response.status);
  } else if (error.request) {
    console.error('❌ No Response Received:', error.request);
  } else {
    console.error('❌ Error Message:', error.message);
  }

  if (error.response && error.response.data?.message) {
    setMessage(`❌ ${error.response.data.message}`);
  } else {
    setMessage('❌ Something went wrong.');
  }
}
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input"
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
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Item</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddItem;
