import React from 'react';
import '../styles/components/testSteps.css'; // Import your custom CSS

const TestStep = ({ stepNumber, onRemove }) => {
  return (
    <div className="test-step">
      <div className="step-number">{stepNumber}</div>
      <div className="step-content">
        <div className="text-area-container">
          <textarea placeholder="Step Description" className="step-description" />
        </div>
        <div className="text-area-container">
          <textarea placeholder="Expected Result" className="expected-result" />
        </div>
      </div>
      <div className="step-actions">
        <button className="action-button-delete-cases" onClick={onRemove}>
          ✗
        </button>
      </div>
    </div>
  );
};

export default TestStep;


