// 📁 src/Components/DeleteItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './DeleteItem.css';

function DeleteItem() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user.id : null;

    if (!user_id) {
      setMessage('❌ User not logged in.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/inventory/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: { user_id } // ✅ Correctly sending user_id in DELETE request body
      });
      setMessage(`✅ ${response.data.message}`);
      setId('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('❌ Item not found.');
      } else {
        setMessage('❌ Error deleting item. Please try again.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="delete-item-container">
      <h2>Delete Inventory Item</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Item ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Delete Item</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DeleteItem;
