import React, { useEffect } from 'react';
import '../styles/components/Alert.css';

const AlertBox = ({ message, type, onClose }) => {
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          onClose();
        }, 1500); // Automatically dismiss after 2 seconds
  
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }
    }, [message, onClose]);
  
    if (!message) return null; // Don't render if there's no message
  
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
  
    return (
      <div className={`alert-box ${alertClass}`}>
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    );
};


export default AlertBox;
