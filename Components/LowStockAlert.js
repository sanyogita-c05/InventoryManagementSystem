import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LowStockAlert.css';

function LowStockAlert() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user?.id;

    if (!user_id) {
      console.error('❌ User ID not found. Please log in.');
      setErrorMessage('❌ User not logged in.');
      return;
    }

    axios
      .get(`http://localhost:5000/api/inventory/low-stock?user_id=${user_id}`)
      .then(response => {
        if (response.data.message) {
          setErrorMessage(response.data.message);
        } else {
          setLowStockItems(response.data);
        }
      })
      .catch(error => {
        console.error('❌ Error fetching low stock items:', error);
        setErrorMessage('❌ Error fetching low stock items.');
      });
  }, []);

  return (
    <div className="low-stock-container">
      <h2>Low Stock Items</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : lowStockItems.length === 0 ? (
        <p>✅ All items have sufficient stock!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LowStockAlert;
