import React, { useState } from 'react';

const ChangeSelectionFilters = ({ stepNumber, onRemove, dropOptions, onAdd }) => {
  const [selectedOptionTitle, setSelectedOptionTitle] = useState('');

  return (
    <div className='filter-add-dropdown'>
      <div className="dropdown-element">
        <select 
          onChange={(e) => setSelectedOptionTitle(e.target.value)} 
          value={selectedOptionTitle} 
          className='filter-dropdown-options'
        >
          <option value="">Select...</option>
          <option value="is">{dropOptions[0]}</option>
          <option value="isnot">{dropOptions[1]}</option>
          <option value="contains">{dropOptions[2]}</option>
          <option value="notcontains">{dropOptions[3]}</option>
        </select>

        <input type="text" className="filter-input" />


        {stepNumber != 1 &&
            <button
            className="remove-button"
            onClick={(e) => {
            e.preventDefault();
            onRemove();
            }}
            aria-label="Remove"
        >
            -
        </button>
        }
       
      </div>
    </div>
  );
};

export default ChangeSelectionFilters;
