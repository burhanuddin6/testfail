// EditTestSuite.js

import React, { useState } from 'react';
import '../styles/EditTestSuite.css'; // Import the CSS file
import { useNavigate, useLocation } from 'react-router-dom'; // Import navigation hooks
import { updateTestSuite, deleteTestSuite } from '../api/TestSuites'; // Import the API functions
import FileUpload from '../components/fileUpload';

const EditTestSuite = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the suite ID and suite name from the URL
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const sourcePage = searchParams.get('source'); // Will be either 'TestSuitesCases' or 'TestRuns'
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

  // Initialize the name state with suiteName from URL or default name
  const [name, setName] = useState(suiteName); // Correct state initialization
  const [description, setDescription] = useState(''); // Preset with existing description if any
  const [file, setFile] = useState(null);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const projectID = sessionStorage.getItem("projectID");
      const userID = sessionStorage.getItem("user_id");

      if (!projectID || !userID) {
        console.error('Project ID or user ID is missing');
        return;
      }

      // Prepare the payload with all required fields
      const testSuiteData = {
        name,
        description,
        // file,
        project_id: projectID,
        updated_by: userID,

      };

      await updateTestSuite(suiteId, testSuiteData);

      // Navigate based on the source page and include suite ID in URL
      if (sourcePage === 'TestSuiteTestRuns') {
        navigate(`/TestSuiteTestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(name)}`); // Use updated name
      } else if (sourcePage === 'SectionsCases') {
        navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(name)}`); // Use updated name
      } else {
        navigate('/TestSuitsCases');
      }
    } catch (error) {
      // Handle error (e.g., show a notification)
      console.error("Error updating test suite:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestSuite(suiteId);
      if (sourcePage === 'TestRuns') {
        navigate(`/TestRuns`);
      } else if (sourcePage === 'SectionsCases') {
        navigate(`/SectionsCases`);
      } else {
        navigate('/TestSuitsCases');
      }
    } catch (error) {
      // Handle error (e.g., show a notification)
      console.error("Error deleting test suite:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

     // Navigate based on the source page and include suite ID in URL
     if (sourcePage === 'TestSuiteTestRuns') {
      navigate(`/TestSuiteTestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(name)}`); // Use updated name
    } else if (sourcePage === 'SectionsCases') {
      navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(name)}`); // Use updated name
    } else {
      navigate('/TestSuitsCases');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="edit-suite-container">
      {/* Display Suite ID */}
      {/* <div className="suite-id-display">
        <span className="suite-id-badge">S{suiteId}</span>
        <span className="suite-title">{suiteName}</span>
      </div> */}

      <div className="edit-suite-content">
        <form className="edit-suite-form" onSubmit={handleUpdate}>
           <h2>Edit Test Suite</h2>
          <div className="edit-suite-form-group">
            <label htmlFor="name" className="edit-suite-label">
              Name<span className="edit-suite-required">*</span>
            </label>
            <input 
              type="text"
              id="name"
              value={name} // Correctly bind to 'name' state
              onChange={(e) => setName(e.target.value)}
              className="edit-suite-input"
              required
            />
          </div>

          <div className="edit-suite-form-group">
            <label htmlFor="description" className="edit-suite-label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="edit-suite-textarea"
              placeholder='Use this description to explain the content and purpose of this test suite.'
            />
          </div>

          <FileUpload/>

          <div className="edit-suite-buttons">
            <button
              type="submit"
              className="edit-suite-button edit-suite-save"
            >
              ✓ Save Test Suite
            </button>
            <button
              type="button"
              className="edit-suite-button edit-suite-cancel"
              onClick={handleCancel}
            >
              ✗ Cancel
            </button>
          </div>
        </form>

    
        <div className="actions-section">
          {/* <p className="actions-title">Actions</p> */}
          <p className="actions-description">
            Delete this test suite to remove it from your project. <br></br>This also deletes all related test cases and running tests.
          </p>
          <button className="delete-suite-button" onClick={handleDelete}>✗ Delete this test suite</button>
        </div>
      </div>
    </div>
  );
};

export default EditTestSuite;
