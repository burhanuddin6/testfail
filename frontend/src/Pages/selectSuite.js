
import React, { useState } from 'react';
import '../styles/selectSuite.css'; // Import your CSS for the popup

const Popup = ({ onConfirm, onCancel, actionType }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption, actionType);
      // Optional: close the popup here if you want to automatically close it on confirm
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup"> 
        <h3>Select an Option</h3>
        <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
          <option value="">Select...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <div className="popup-buttons">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
