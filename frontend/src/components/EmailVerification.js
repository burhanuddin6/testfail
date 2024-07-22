// EmailVerification.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const LOCAL_VERIFY_EMAIL_URL = "https://organic-orbit-p47g4pqqrqj36rvv-8000.app.github.dev/api/tcms/verify-email/";
const GIT_VERIFY_EMAIL_URL = "http://127.0.0.1:8000/api/tcms/verify-email/";


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
                const response = await axios.get(`${GIT_VERIFY_EMAIL_URL}?code=${code}`);
                
                if (response.status === 200) {
                    setAlertVariant('success');
                    setAlertMessage('Email verified successfully! You are now being redirected to the login page.');
                    setTimeout(() => {
                        navigate('/'); // Redirect to login after successful verification
                    }, 2000); // Wait for 2 seconds before redirecting
                } else {
                    setAlertVariant('danger');
                    setAlertMessage('Email verification failed.');
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setAlertVariant('danger');
                setAlertMessage('Email verification failed.');
            }
        };

        handleVerification();
    }, [location, navigate]);

    return (
        <div>
            <Alert variant={alertVariant}>{alertMessage}</Alert>
        </div>
    );
}

export default EmailVerification;
