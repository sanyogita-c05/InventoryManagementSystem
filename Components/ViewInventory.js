// 📁 Components/ViewInventory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewInventory.css';

function ViewInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user.id : null;

    if (!user_id) {
      setError("❌ User not logged in. Please log in first.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/inventory?user_id=${user_id}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Error fetching inventory:', error);
        setError("❌ Error fetching inventory, please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="inventory-container">
      <h2>📦 Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>₹{item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No inventory found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewInventory;
