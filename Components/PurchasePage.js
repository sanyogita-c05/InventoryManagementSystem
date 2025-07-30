// src/Components/PurchasePage.js
import React, { useState, useEffect } from 'react';
import './PurchasePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PurchasePage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    vendor_id: '',
    item_name: '',
    quantity: '',
    unit_price: '',
    purchase_date: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/vendors', { params: { user_id } })
      .then(res => setVendors(res.data))
      .catch(err => setError('Failed to load vendors. Please try again.'))
      .finally(() => setLoading(false));
  }, [user_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (formData.quantity <= 0 || formData.unit_price <= 0) {
      alert("🚨 Quantity and Unit Price must be positive values.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (new Date(formData.purchase_date) > new Date(today)) {
      alert("🚨 Purchase Date cannot be in the future.");
      return;
    }

    // Calculate total price
    const total_price = parseFloat(formData.unit_price) * parseInt(formData.quantity);

    axios.post('http://localhost:5000/api/purchases', {
      ...formData,
      total_price,
      user_id
    })
      .then(res => {
        alert(res.data.message);
        setFormData({
          vendor_id: '',
          item_name: '',
          quantity: '',
          unit_price: '',
          purchase_date: ''
        });
      })
      .catch(err => alert("❌ Error adding purchase. Please try again."));
  };

  return (
    <>
      <Navbar />
      <div className="purchase-container">
        <h1>📦 Purchase Entry Form</h1>
        {error && <p className="error-message">{error}</p>}

        <form className="purchase-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vendor</label>
            {loading ? (
              <p>Loading vendors...</p>
            ) : (
              <select name="vendor_id" value={formData.vendor_id} onChange={handleChange} required>
                <option value="">-- Select Vendor --</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Item Name</label>
            <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Unit Price (₹)</label>
            <input type="number" step="0.01" name="unit_price" min="0.01" value={formData.unit_price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Purchase Date</label>
            <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-button">➕ Add Purchase</button>
        </form>

        <button onClick={() => navigate('/view-purchases')} className="view-purchases-button">
          📄 View All Purchases
        </button>
      </div>
    </>
  );
};

export default PurchasePage;
