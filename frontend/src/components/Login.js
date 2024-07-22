import React, { useState } from 'react';
import '../styles/Login.css'; // Adjusted the import path
import logo from '../images/Securiti_Logo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const GIT_URL = "https://organic-orbit-p47g4pqqrqj36rvv-8000.app.github.dev/";
const LOCAL_URL = "http://localhost:8000/";



const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      setMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post( `${GIT_URL}api/accounts/login/`, {
        email: formData.email,
        password: formData.password
      });

      // Assuming your backend returns a token in the response
      const token = response.data.token; // Adjust this according to your API response structure

      // Store the token in localStorage or sessionStorage for future use
      localStorage.setItem('token', token); // Example: using localStorage

      setMessage('');
      navigate('/Dashboard'); // Redirect to Dashboard or any other route upon successful login
    } catch (error) {
      setMessage('Invalid credentials. Please try again.'); // Handle login error
    }
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/SignUp');
  };

  const handleForgot = (e) => {
    e.preventDefault();
    navigate('/Forgot');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Securiti.ai" />
        <h2>Product Name</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={handleSignUp}>Sign Up</button>
            <button type="submit">Log In</button>
          </div>
          <div className="form-check">
            <input type="checkbox" id="keepLoggedIn" />
            <label htmlFor="keepLoggedIn">Keep me logged in</label>
          </div>
          <a href="#" onClick={handleForgot}>Forgot your password?</a>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
