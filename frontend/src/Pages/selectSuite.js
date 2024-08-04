
// import React, { useState } from 'react';
// import '../styles/selectSuite.css'; // Import your CSS for the popup

// const Popup = ({ onConfirm, onCancel, actionType }) => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleConfirm = () => {
//     if (selectedOption) {
//       onConfirm(selectedOption, actionType);
//       // Optional: close the popup here if you want to automatically close it on confirm
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <h3>Select an Option</h3>
//         <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
//           <option value="">Select...</option>
//           <option value="option1">Option 1</option>
//           <option value="option2">Option 2</option>
//         </select>
//         <div className="popup-buttons">
//           <button onClick={handleConfirm}>Confirm</button>
//           <button onClick={onCancel}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;

import React, { useState, useEffect } from 'react';
import '../styles/selectSuite.css'; // Import your CSS for the popup
import { fetchTestSuites } from '../api/TestSuites'; // Import your fetchTestSuites function
import { getProjectID } from '../utilities/globals'; // Import your getProjectID function
import AlertBox from '../components/Alert'; // Import the AlertBox component

const Popup = ({ onConfirm, onCancel, actionType }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const projectID = getProjectID();

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      try {
        const data = await fetchTestSuites(projectID);
        setOptions(data); // Assuming data is the list of test suites
      } catch (err) {
        setError('Failed to fetch test suites');
        setShowAlert(true); // Show the alert box
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [projectID]);

  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption, actionType);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert box
    setError(null); // Clear the error message
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Select an Option</h3>
        {loading && <div>Loading...</div>}
        {showAlert && <AlertBox message={error} type="error" onClose={handleCloseAlert} />}
        {!loading && !error && (
          <>
            <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
              <option value="">Select...</option>
              {options.map((option) => (
                <option key={option.test_suite_id} value={option.test_suite_id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="popup-buttons">
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;

