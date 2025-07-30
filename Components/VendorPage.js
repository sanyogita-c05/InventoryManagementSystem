import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VendorPage.css';
import Navbar from './Navbar';

function VendorPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    phone: '',
    email: '',
    address: '',
    delivery_time: '',
    payment_terms: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.id) {
      alert("User not logged in");
      navigate('/login');
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/vendors", { ...formData, user_id: user.id });
      alert(response.data.message);
      setFormData({
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        address: '',
        delivery_time: '',
        payment_terms: ''
      });
    } catch (err) {
      console.error("Error adding vendor:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="vendor-page">
        <h1>Add Vendor</h1>
        <form className="vendor-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Vendor Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="contact_person" placeholder="Contact Person" value={formData.contact_person} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange}></textarea>
          <input type="text" name="delivery_time" placeholder="Delivery Time" value={formData.delivery_time} onChange={handleChange} />
          <input type="text" name="payment_terms" placeholder="Payment Terms" value={formData.payment_terms} onChange={handleChange} />
          <button type="submit" className="add-btn">Add Vendor</button>
        </form>
        <button onClick={() => navigate('/view-vendors')} className="toggle-btn">Show Vendors</button>
      </div>
    </>
  );
}

export default VendorPage;