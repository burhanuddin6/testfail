import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../images/Securiti_Logo.jpg';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/Auth'; 
import { SOFTWARE_TITLE } from '../utilities/globals';


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

    if (!formData.email || !formData.password) {
      setMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await login(formData);
    
      const token = response.token; 
      sessionStorage.setItem('token', token); 
      
      setMessage(''); //REVIEW USAGE

      window.location.assign("/dashboard");
    } catch (error) {
      console.log(error.status); //debug statement, remove before production
    
      if (error.status === 404) {
        setMessage('User does not exist. Please sign up.');
      } else if (error.status === 401) {
        if (error.data && error.data.detail === 'User account not verified.') {
          setMessage('Please verify your account to continue.');
        } else {
          setMessage('Invalid credentials. Please try again.');
        }
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    }
    
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleForgot = (e) => {
    e.preventDefault();
    navigate('/forgot');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Securiti.ai" />
        <h2>{SOFTWARE_TITLE}</h2>
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
          <div className='forgot-password'><a href="#" onClick={handleForgot}>Forgot your password?</a></div>
          
        </form>
        {message && <div className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}>{message}</div>}
      </div>
    </div>
  );
};

export default Login;
