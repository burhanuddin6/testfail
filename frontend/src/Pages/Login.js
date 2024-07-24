import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../images/Securiti_Logo.jpg';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/Auth'; // Import the login function

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
      const response = await login(formData);

      // Assuming your backend returns a token in the response
      const token = response.token; 

      // Store the token in localStorage or sessionStorage for future use
      localStorage.setItem('token', token); 
      setMessage('');
      navigate('/Dashboard'); 
    } catch (error) {
      console.log(error.status)
      if (error.status === 404) {
        setMessage('User does not exist. Please sign up.');
      } else if (error.status === 401) {
        setMessage('Invalid credentials. Please try again.');
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
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
        {message && <div className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}>{message}</div>}
      </div>
    </div>
  );
};

export default Login;
