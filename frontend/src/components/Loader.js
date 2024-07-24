import React from 'react';

const SimpleBackdrop = ({ handleClose, currentOpenState }) => {
  return (
    <div className={`backdrop ${currentOpenState ? 'open' : ''}`} onClick={handleClose}>
      {currentOpenState && (
        <div className="backdrop__content">
          <div className="backdrop__spinner"></div>
        </div>
      )}
    </div>
  );
};

export default SimpleBackdrop;
