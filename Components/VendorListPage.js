import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './VendorListPage.css';
import { useNavigate } from 'react-router-dom';

function VendorListPage() {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchVendors = useCallback(() => {
    axios.get(`http://localhost:5000/api/vendors?user_id=${user.id}`)
      .then(res => setVendors(res.data))
      .catch(err => console.error('❌ Error fetching vendors:', err));
  }, [user.id]);

  useEffect(() => {
    if (!user || !user.id) {
      alert("User not logged in");
      navigate('/login');
      return;
    }
    fetchVendors();
  }, [navigate, user, fetchVendors]);

  const deleteVendor = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      axios.delete(`http://localhost:5000/api/vendors/${id}?user_id=${user.id}`)
        .then(() => {
          alert('✅ Vendor deleted successfully');
          fetchVendors();
        })
        .catch(err => console.error('❌ Error deleting vendor:', err));
    }
  };

  return (
    <div className="vendor-list-page">
      <h1>Vendor List</h1>
      <button onClick={() => navigate('/vendor')} className="back-btn">🔙 Back to Vendor Page</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length > 0 ? (
            vendors.map((v, index) => (
              <tr key={index}>
                <td>{v.id}</td>
                <td>{v.name || '-'}</td>
                <td>{v.contact_person || '-'}</td>
                <td>{v.phone || '-'}</td>
                <td>{v.email || '-'}</td>
                <td>{v.address || '-'}</td>
                <td>
                  <button onClick={() => deleteVendor(v.id)} className="delete-btn">🗑️ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">🚫 No vendors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VendorListPage;
