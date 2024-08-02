import React, { useState } from 'react';
import '../styles/selectSuite.css'; // Assuming the CSS is saved in Popup.css

const Popup = ({ closePopup, onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption);
      closePopup();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Select an Option</h2>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">Select...</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
        <div className="popup-buttons">
          <button onClick={handleConfirm} disabled={!selectedOption}>
            Confirm
          </button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
