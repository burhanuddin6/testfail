import React, { useState } from 'react';
import '../styles/Forgot.css'; // Adjusted the import path
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessageVisible(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid email address');
      setMessageVisible(false);
    }
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="email-container">
      <div className="email-box">
        <h3>Enter your Email to Reset Password</h3>
        <form>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit" onClick={handleSendEmail}>Send an Email</button>
            <button type="submit" onClick={handleBack}>Back to Login</button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {messageVisible && <p>An email has been sent</p>}
      </div>
    </div>
  );
};

export default Forgot;
