import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import animeVideo from '../Assets/an2.mp4'; // Adjust the path if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Welcome, ${data.username || email.split('@')[0]}!`);

        // ✅ Save user_id, username, and email
        localStorage.setItem('user', JSON.stringify({
          id: data.user_id,
          username: data.username,
          email: data.email
        }));

        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={animeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
