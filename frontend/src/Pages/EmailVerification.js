import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { verifyEmail } from '../api/Auth'; // Import the verifyEmail function
import '../styles/EmailVerification.css'; // Import CSS file

function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('Verifying email...');

  useEffect(() => {
    const handleVerification = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');

      if (!code) {
        setAlertVariant('danger');
        setAlertMessage('Verification code not found.');
        return;
      }

      try {
        await verifyEmail(code);

        setAlertVariant('success');
        setAlertMessage('Email verified successfully! You are now being redirected to the login page.');
        setTimeout(() => {
          navigate('/'); // Redirect to login after successful verification
        }, 2000); // Wait for 2 seconds before redirecting
      } catch (error) {
        console.error('Error verifying email:', error);
        setAlertVariant('danger');
        setAlertMessage('Email verification failed.');
      }
    };

    handleVerification();
  }, [location, navigate]);

  return (
    <div className="email-verification-container">
      <Alert variant={alertVariant} className={`verification-alert ${alertVariant === 'success' ? 'success' : 'failure'}`}>
        {alertMessage}
      </Alert>
    </div>
  );
}

export default EmailVerification;
