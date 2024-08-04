import React, { useState, useEffect } from 'react';
import '../styles/AddTestRun.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTestRun } from '../api/TestRun'; 
import { getQaUsers } from '../api/Auth'; 
import { fetchMilestonesIdName } from '../api/Milestone'; 
import { getProjectID } from '../utilities/globals'; 

const AddTestRun = ({ userID }) => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [milestone, setMilestone] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [testCaseSelection, setTestCaseSelection] = useState('all');
  const [images, setImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectID] = useState(getProjectID()); 


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { selectedOption } = location.state || {};

  
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; 
  const sourcePage = searchParams.get('source'); 
  const suiteName = searchParams.get('suite') || 'Test Suite'; 

  useEffect(() => {
    if (selectedOption) {
      setName(selectedOption);
    }

    const fetchData = async () => {
      try {
        const usersData = await getQaUsers('qa-user');
        setUsers(usersData);

        const milestonesData = await fetchMilestonesIdName(projectID);
        setMilestone(milestonesData);
      } catch (error) {
        console.error('Error fetching data:', error); // debug statement, remove before production
      }
    };

    fetchData();
  }, [projectID, selectedOption]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const testRunData = {
      name,
      test_suite_id: suiteId, 
      created_by: userID,   
      milestone_id: milestone, 
      description,
      test_case_filter: testCaseSelection, 
      project_id: projectID, 
    };

    try {
      await createTestRun(testRunData);
      console.log('Test run created successfully'); // debug statement, remove before productions

      // Navigate based on the source page
      if (sourcePage === 'TestRuns') {
        navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
      } else {
        navigate('/TestSuitsCases'); 
      }
    } catch (error) {
      console.error('Failed to create Test Run:', error);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCancel = () => { 
    navigate(from);
  };

  return (
    <div className="test-run-container">
      <form className="test-run-form" onSubmit={handleSubmit}>
        <h2 className="add-test-run-title">Add Test Run</h2>

        <div className="test-run-form-group">
          <label htmlFor="name" className="test-run-label">
            Name<span className="test-run-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter test run name"
            className="test-run-input"
            required
          />
        </div>

        <div className="test-run-form-group">
          <label htmlFor="references" className="test-run-label">
            References
          </label>
          <input
            type="text"
            id="references"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            placeholder="Add reference IDs"
            className="test-run-input"
          />
        </div>

        <div className="test-run-form-group">
          <label htmlFor="milestone" className="test-run-label">
            Milestone
          </label>
          <select
            id="milestone"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            className="test-run-select"
          >
            <option value="">Select milestone</option>
            {milestone.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="test-run-form-group">
          <label htmlFor="assignTo" className="test-run-label">
            Assign To
          </label>
          <select
            id="assignTo"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            className="test-run-select"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.email} value={user.email}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="test-run-form-group">
          <label htmlFor="description" className="test-run-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Use this description to describe the purpose of this test run."
            className="test-run-textarea"
          />
          <input 
            type="file"
            id="file-upload"
            name="file-upload"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>

        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className="preview-image"
              />
              <button
                type="button"
                className="remove-image-button"
                onClick={() => removeImage(index)}
              >
                ✗
              </button>
            </div>
          ))}
        </div>

        <div className="test-run-case-selection">
          <div>
            <input
              type="radio"
              id="include-all"
              name="testCaseSelection"
              value="ALL"
              checked={testCaseSelection === 'ALL'}
              onChange={() => setTestCaseSelection('ALL')}
              className="test-run-radio"
            />
            <label htmlFor="include-all" className="test-run-radio-label">
              Include all test cases
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="select-specific"
              name="testCaseSelection"
              value="SELECTED"
              checked={testCaseSelection === 'SELECTED'}
              onChange={() => setTestCaseSelection('SELECTED')}
              className="test-run-radio"
            />
            <label htmlFor="select-specific" className="test-run-radio-label">
              Select specific test cases
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="dynamic-filtering"
              name="testCaseSelection"
              value="REGEX_ON_NAME"
              checked={testCaseSelection === 'REGEX_ON_NAME'}
              onChange={() => setTestCaseSelection('REGEX_ON_NAME')}
              className="test-run-radio"
            />
            <label htmlFor="dynamic-filtering" className="test-run-radio-label">
              Dynamic Filtering
            </label>
          </div>
        </div>

        <div className="test-run-buttons">
          <button type="submit" className="test-run-button test-run-submit">
            ✓ Add Test Run
          </button>
          <button
            type="button"
            className="test-run-button test-run-cancel"
            onClick={handleCancel}
          >
            ✗ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestRun;




