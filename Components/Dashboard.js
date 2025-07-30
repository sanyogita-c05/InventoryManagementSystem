import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import img1 from '../Assets/1.jpg';
import img2 from '../Assets/2.jpg';
import img3 from '../Assets/3.jpg';
import img4 from '../Assets/4.jpg';
import img5 from '../Assets/5.jpg';
import Navbar from './Navbar'; // Import Navbar

// Intersection Observer hook
const useIntersectionObserver = (callback, options) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const elements = document.querySelectorAll('.feature-card');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [callback, options]);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';


  
  const features = [
    {
      title: 'Inventory Management',
      desc: 'Manage ingredients, track quantities, expiry, and low-stock alerts.',
      img: img1,
      path: '/inventory',
    },
    {
      title: 'Vendor Management',
      desc: 'Store vendor details, contacts, delivery times, and payment terms.',
      img: img2,
      path: '/vendor',
    },
    {
      title: 'Purchase Management',
      desc: 'Record stock entries, generate purchase orders, auto-update inventory.',
      img: img3,
      path: '/purchase',
    },
    {
      title: 'Recipe Management',
      desc: 'Define dishes, link ingredients, auto-reduce stock per order.',
      img: img4,
      path: '/recipe',
    },
    {
      title: 'Order Management',
      desc: 'Record customer orders, auto-update stock, filter by date or partner.',
      img: img5,
      path: '/order',
    },
  ];

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  };

  const options = { threshold: 0.5 };
  useIntersectionObserver(handleIntersection, options);

  return (
    <div className="dashboard-container">
      <Navbar /> {/* Navbar at the top */}
      <div className="welcome-box">
        <button className="welcome-button">Welcome, {username} 👋</button>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.img} alt={feature.title} className="feature-image" />
            <div className="feature-overlay"></div>
            <div className="feature-content">
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
              <button
                className="order-button"
                onClick={() => navigate(feature.path)}
              >
                Go to {feature.title}
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="dashboard-footer">
        © 2025 Cloud Kitchen Dashboard. Built with ❤️ for efficiency.
      </footer>
    </div>
  );
};

export default Dashboard;
