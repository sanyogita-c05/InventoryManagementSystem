// 📁 src/Components/ViewOrders.js
import React, { useEffect, useState } from 'react';
import './OrderPage.css';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [filterPartner, setFilterPartner] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const user_id = 1; // ✅ Replace with the actual user ID after login implementation
    const res = await fetch(`http://localhost:5000/api/orders?user_id=${user_id}`);
    const data = await res.json();
    console.log("Fetched Orders:", data);
    setOrders(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};


  const filteredOrders = orders.filter(order => {
    const matchPartner = filterPartner ? order.partner?.toLowerCase().includes(filterPartner.toLowerCase()) : true;
    const matchDate = filterDate ? order.order_date?.startsWith(filterDate) : true;
    return matchPartner && matchDate;
  });

  return (
    <div className="order-page">
      <h1>All Orders</h1>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Filter by Partner" 
          value={filterPartner}
          onChange={(e) => setFilterPartner(e.target.value)}
        />
        <input 
          type="date" 
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="order-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div className="order-card" key={index}>
              <h3>{order.customer_name}</h3>
              <p><strong>Dish:</strong> {order.dish_name}</p>
              <p><strong>Partner:</strong> {order.partner}</p>
              <p><strong>Date:</strong> {order.order_date}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Price:</strong> ₹{order.price}</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewOrders;
