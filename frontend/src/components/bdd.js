import React from 'react';
import '../styles/components/bdd.css'; // Import your custom CSS


const BDD = ({ bddNumber, onRemove }) => {
    return (
      <div className="test-bdd">
        <div className="bdd-number">{bddNumber}</div>
        <div className="bdd-content">
            <textarea placeholder="Scenerio Description" className="bdd-description" />
        </div>
        <div className="bdd-actions">
          <button className="action-button-delete-bdd" onClick={onRemove}>
            ✗
          </button>
        </div>
      </div>
    );
  };
  
  export default BDD;