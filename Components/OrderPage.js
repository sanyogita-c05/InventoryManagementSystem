import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';
import Navbar from './Navbar'; // ✅ Import Navbar

function OrderPage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    dish_name: '',
    quantity: '',
    price: '',
    order_date: '',
    partner: '',
  });

  const navigate = useNavigate();
  const user_id = 1; // ✅ Temporary user ID (Replace with actual user ID after login)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id }), // ✅ Add user_id here
      });

      if (response.ok) {
        alert('✅ Order added successfully!');
        setFormData({
          customer_name: '',
          dish_name: '',
          quantity: '',
          price: '',
          order_date: '',
          partner: '',
        });
        navigate('/view-orders');
      } else {
        const errorData = await response.json();
        alert(`🚨 Error: ${errorData.message || 'Failed to add order'}`);
      }
    } catch (err) {
      console.error('❌ Error adding order:', err);
      alert('❌ Error adding order');
    }
  };

  return (
    <>
      <Navbar />
      <div className="order-page">
        <h1>Order Management</h1>
        <form className="order-form" onSubmit={handleSubmit}>
          <input type="text" name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} required />
          <input type="text" name="dish_name" placeholder="Dish Name" value={formData.dish_name} onChange={handleChange} required />
          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input type="date" name="order_date" value={formData.order_date} onChange={handleChange} required />
          <select name="partner" value={formData.partner} onChange={handleChange} required>
            <option value="">Select Partner</option>
            <option value="Zomato">Zomato</option>
            <option value="Swiggy">Swiggy</option>
            <option value="Uber Eats">Uber Eats</option>
            <option value="In-House">In-House</option>
          </select>
          <button type="submit" className="submit-btn">➕ Add Order</button>
        </form>
        <button className="view-orders-btn" onClick={() => navigate('/view-orders')}>📄 View All Orders</button>
      </div>
    </>
  );
}

export default OrderPage;
