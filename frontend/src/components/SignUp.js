import React, { useState } from 'react';
import '../styles/SignUp.css'; // Adjusted the import path
import { useNavigate } from 'react-router-dom';
import logo from '../images/Securiti_Logo.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    password: '',
    terms: false,
    newsletter: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      formData.firstName &&
      formData.lastName &&
      formData.workEmail &&
      formData.password &&
      formData.terms
    ) {
      setMessage('Account has been created successfully!');
    } else {
      setMessage('Please fill in all required fields.');
    }
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return ( 
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="Securiti.ai" />
        <h2>Product Name</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">First Name<span className="required">*</span></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name<span className="required">*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email<span className="required">*</span></label>
            <input type="email" name="workEmail" value={formData.workEmail} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password<span className="required">*</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-check">
            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} required />
            <label htmlFor="terms">
                I agree to the Terms of Service and Privacy Policy<span className="required">*</span>
            </label>
          </div>

          {/* <div className="form-check">
            <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
            <label htmlFor="newsletter">
              I'd like to learn about testing best practices, what's new in the industry, and how to use TestRail more effectively. Please send me a weekly newsletter!
            </label>
          </div> */}

          <div className="button-group">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleBackToLogin}>Login</button>
          </div>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default SignUp;
