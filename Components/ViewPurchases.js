// src/pages/ViewPurchases.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PurchasePage.css';

const ViewPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // get user from localStorage
  const user_id = user?.id;

  useEffect(() => {
    if (!user_id) return;

    axios.get('http://localhost:5000/api/purchases', {
      params: { user_id }  // pass user_id as query param
    })
      .then(res => setPurchases(res.data))
      .catch(err => console.log(err));
  }, [user_id]);

  return (
    <div className="view-purchases-container">
      <h1>📋 All Purchases</h1>
      <table className="purchase-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor ID</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit ₹</th>
            <th>Total ₹</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.vendor_id}</td>
              <td>{purchase.item_name}</td>
              <td>{purchase.quantity}</td>
              <td>₹{purchase.unit_price}</td>
              <td>₹{(purchase.unit_price * purchase.quantity).toFixed(2)}</td>
              <td>{purchase.purchase_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPurchases;
