// // AddTestSuite.js

// import React, { useState } from 'react';
// import '../styles/AddTestSuite.css'; // Import the CSS file
// import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for reading query parameters

// const AddTestSuite = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [isFormValid, setIsFormValid] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve the source page from URL query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const sourcePage = searchParams.get('source'); // Will be 'TestSuitesCases'

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//     console.log('Form submitted with:', {
//       name,
//       description,
//     });

//     // Redirect back to the source page
//     if (sourcePage) {
//       navigate(`/${sourcePage}`); // Return to the original page
//     } else {
//       navigate('/TestSuitsCases'); // Default to Test Suites & Cases
//     }
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();

//     // Navigate back to the source page
//     if (sourcePage) {
//       navigate(`/${sourcePage}`); // Return to the original page
//     } else {
//       navigate('/TestSuitsCases'); // Default to Test Suites & Cases
//     }
//   };

//   // Handle form validation
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     if (id === 'name') setName(value);
//     else if (id === 'description') setDescription(value);

//     setIsFormValid(name.trim() !== ''); // Form is valid if name is not empty
//   };

//   return (
//     <div className="test-suite-page">
//       <div className="test-suite-container">
//         <form className="test-suite-form" onSubmit={handleSubmit}>
//           <h2 className="add-test-suite-title">Add Test Suite</h2>

//           <div className="test-suite-form-group">
//             <label htmlFor="name" className="test-suite-label">
//               Name<span className="test-suite-required">*</span>
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={handleInputChange}
//               placeholder="Ex: User Interface Test or Release Protocol"
//               className="test-suite-input"
//               required
//             />
//           </div>

//           <div className="test-suite-form-group">
//             <label htmlFor="description" className="test-suite-label">
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={handleInputChange}
//               placeholder=""
//               className="test-suite-textarea"
//             />
//             <p className="description-hint">
//               Use this description to explain the content and purpose of this
//               test suite.
//             </p>
//           </div>

//           <div className="test-suite-buttons">
//             <button
//               type="submit"
//               className="test-suite-button test-suite-submit"
//               disabled={!isFormValid}
//             >
//               ✓ Add Test Suite
//             </button>
//             <button
//               type="button"
//               className="test-suite-button test-suite-cancel"
//               onClick={handleCancel}
//             >
//               ✗ Cancel
//             </button>
//           </div>
//         </form>
//         <div className="file-upload-area">
//           <div className="file-upload-placeholder">
//             <p>Drop files here to attach,</p>
//             <p>or click on "+" to browse</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTestSuite;

import React, { useState } from 'react';
import '../styles/AddTestSuite.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { createTestSuite } from '../api/TestSuites'; // Import the API function
import { getProjectID } from '../utilities/globals'; // Import getProjectID


const AddTestSuite = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [projectID] = useState(getProjectID()); // Retrieve the project ID


  const handleSubmit = async (event) => {
    event.preventDefault();

    const creatorId = sessionStorage.getItem('user_id'); // Get the creator ID from session storage

    const testSuiteData = {
      name,
      creator_id: creatorId,
      description,
      project_id: projectID,
    };

    try {
      await createTestSuite(testSuiteData);
      navigate('/TestSuitsCases');
    } catch (error) {
      console.error('Failed to create test suite:', error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/TestSuitsCases');
  };

  return (
    <div className="test-suite-container">
      <form className="test-suite-form" onSubmit={handleSubmit}>
        <h2 className="add-test-suite-title">Add Test Suite</h2>

        <div className="test-suite-form-group">
          <label htmlFor="name" className="test-suite-label">
            Name<span className="test-suite-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: User Interface Test or Release Protocol"
            className="test-suite-input"
            required
          />
        </div>

        <div className="test-suite-form-group">
          <label htmlFor="description" className="test-suite-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Use this description to explain the content and purpose of this test suite."
            className="test-suite-textarea"
          />
        </div>

        <div className="test-suite-buttons">
          <button type="submit" className="test-suite-button test-suite-submit">
            ✓ Add Test Suite
          </button>
          <button
            type="button"
            className="test-suite-button test-suite-cancel"
            onClick={handleCancel}
          >
            ✗ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestSuite;
