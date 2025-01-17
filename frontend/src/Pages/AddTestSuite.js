import React, { useState } from 'react';
import '../styles/AddTestSuite.css'; 
import { useNavigate } from 'react-router-dom'; 
import { createTestSuite } from '../api/TestSuites'; 
import { getProjectID } from '../utilities/globals'; 
import FileUpload from '../components/fileUpload';

const AddTestSuite = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const [projectID] = useState(getProjectID()); 


  const handleSubmit = async (event) => {
    event.preventDefault();

    const creatorId = sessionStorage.getItem('user_id'); 

    const testSuiteData = {
      name,
      created_by: creatorId,
      description,
      project_id: projectID,
    };

    try {
      await createTestSuite(testSuiteData);
      navigate('/testsuitscases'); //URL CHANGE
    } catch (error) {
      console.error('Failed to create test suite:', error); // debug statement, remove before production
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/testsuitscases'); //URL CHANGE
  };

  const handleFilesChange = (uploadedFiles) => {
    setFiles(uploadedFiles);
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

        <FileUpload onFilesChange={handleFilesChange}/>

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
