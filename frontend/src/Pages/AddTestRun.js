import React, { useState } from 'react';
import '../styles/AddTestRun.css'; // Import the CSS file
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for reading query parameters
import { createTestRun } from '../api/TestRun'; // Import the createTestRun function

const AddTestRun = ({userID}) => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [milestone, setMilestone] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [testCaseSelection, setTestCaseSelection] = useState('all');

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the source page and suite name from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const sourcePage = searchParams.get('source'); // Will be either 'TestSuitesCases' or 'TestRuns'
  const suiteName = searchParams.get('suite'); // Retrieve the suite name

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prepare the test run data
    const testRunData = {
      name,
      test_suite_id: 1, 
      creator_id: userID,   
      milestone_id: 1,
      description,
      test_case_filter: testCaseSelection === 'specific' ? 'Specific Test Cases Filter' : '', 
      project_id: 1,     
    };

    try {
      // Call the API to create the test run
      await createTestRun(testRunData);
      console.log('Test run created successfully');

      // Navigate based on the source page
      if (sourcePage === 'TestRuns') {
        navigate(`/TestRuns?suite=${encodeURIComponent(suiteName)}`);
      } else {
        navigate('/TestSuitsCases'); // Default to Test Suites & Cases
      }
    } catch (error) {
      console.error('Failed to create Test Run:', error);
      // Optionally, you could show an error message to the user here
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    // Navigate based on the source page
    if (sourcePage === 'TestRuns') {
      navigate(`/TestRuns?suite=${encodeURIComponent(suiteName)}`);
    } else {
      navigate('/TestSuitsCases'); // Default to Test Suites & Cases
    }
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
            <option value="milestone1">Milestone 1</option>
            <option value="milestone2">Milestone 2</option>
            <option value="milestone3">Milestone 3</option>
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
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
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
        </div>

        <div className="test-run-case-selection">
          <div>
            <input
              type="radio"
              id="include-all"
              name="testCaseSelection"
              value="all"
              checked={testCaseSelection === 'all'}
              onChange={() => setTestCaseSelection('all')}
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
              value="specific"
              checked={testCaseSelection === 'specific'}
              onChange={() => setTestCaseSelection('specific')}
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
              value="dynamic"
              checked={testCaseSelection === 'dynamic'}
              onChange={() => setTestCaseSelection('dynamic')}
              className="test-run-radio"
            />
            <label htmlFor="dynamic-filtering" className="test-run-radio-label">
              Dynamic Filtering
            </label>
          </div>
        </div>

        <div className="test-run-buttons">
          <button type="submit" className="test-run-button test-run-submit">
            Add Test Run
          </button>
          <button
            type="button"
            className="test-run-button test-run-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestRun;
