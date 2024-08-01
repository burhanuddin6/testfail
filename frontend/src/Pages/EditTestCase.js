// EditTestSuite.js

import React, { useState } from 'react';
// import '../styles/EditTestSuite.css'; // Import the CSS file
import { useNavigate, useLocation } from 'react-router-dom'; // Import navigation hooks

const EditTestCase = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Extract the suite ID and suite name from the URL
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const testCaseId = searchParams.get('testCaseId') || 'C18969'; // Default to 'C18969' if no testCaseId is provided
  const testCaseName = searchParams.get('testCaseName') || 'Opening and navigating on Chrome'; // Default to the provided name
  const sourcePage = searchParams.get('source'); // Will be either 'TestSuitesCases' or 'TestRuns'

  const suiteName = searchParams.get('suite') || 'General UI Testcases'; // Fetch the suite name from the query params
  const sectionName = searchParams.get('section') || 'General Cases'; // Fetch the section name from the query params
  

  // Initialize the name state with testcaseName from URL or default name
  const [section, setSection] = useState('General Cases');
  const [template, setTemplate] = useState('Test Case (Text)');
  const [type, setType] = useState('Functional');
  const [priority, setPriority] = useState('Medium');
  const [estimate, setEstimate] = useState('');
  const [title, setTitle] = useState(testCaseName); // Title state added
  const [references, setReferences] = useState('');
  const [automationType, setAutomationType] = useState('Need to Triage');
  const [obsolete, setObsolete] = useState(false);
  const [preconditions, setPreconditions] = useState('');
  const [steps, setSteps] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [automatedCases, setAutomatedCases] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Edited Case with:', {
        section,
        template,
        type,
        priority,
        estimate,
        title,
        references,
        automationType,
        obsolete,
        preconditions,
        steps,
        expectedResult,
        automatedCases,
        file
    });

    // Navigate based on the source page and include suite ID in URL
    
    if (sourcePage === 'TestCaseDetails') {
      navigate(`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
    } else if (sourcePage === 'TestsResults') {
        navigate(`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
    } else if (sourcePage === 'TestCaseDefects') {
        navigate(`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
    } else {
        navigate(`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    // Navigate based on the source page and include suite ID in URL

    if (sourcePage === 'TestCaseDetails') {
        navigate(`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
      } else if (sourcePage === 'TestsResults') {
          navigate(`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
      } else if (sourcePage === 'TestCaseDefects') {
          navigate(`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
      } else {
          navigate(`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`); 
      } 
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="test-case-page">
      <div className="test-case-header">
        <h2 className="add-test-case-title">Edit Test Case</h2>
      </div>
      <div className="test-case-container">
        <h2 className="add-test-case-title">Edit Test Case</h2>
        <form className="test-case-form" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="test-case-form-group">
            <label htmlFor="title" className="test-case-label">
              Title<span className="test-case-required">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="test-case-input"
              placeholder="Enter test case title"
              required
            />
          </div>

          {/* Select and Input Fields */}
          <div className="test-case-form-group">
            <div className="test-case-form-row">
              <div className="form-column">
                <label htmlFor="section" className="test-case-label">
                  Section<span className="test-case-required">*</span>
                </label>
                <select
                  id="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="General Cases">General Cases</option>
                  <option value="Specific Cases">Specific Cases</option>
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="template" className="test-case-label">
                  Template<span className="test-case-required">*</span>
                </label>
                <select
                  id="template"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="Test Case (Text)">Test Case (Text)</option>
                  <option value="Test Case (Checklist)">Test Case (Checklist)</option>
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="type" className="test-case-label">
                  Type<span className="test-case-required">*</span>
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="Functional">Functional</option>
                  <option value="Non-Functional">Non-Functional</option>
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="priority" className="test-case-label">
                  Priority<span className="test-case-required">*</span>
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="test-case-form-row">
              <div className="form-column">
                <label htmlFor="estimate" className="test-case-label">
                  Estimate
                </label>
                <input
                  type="text"
                  id="estimate"
                  value={estimate}
                  onChange={(e) => setEstimate(e.target.value)}
                  className="test-case-input"
                  placeholder="Estimate time"
                />
              </div>

              <div className="form-column">
                <label htmlFor="references" className="test-case-label">
                  References
                </label>
                <input
                  type="text"
                  id="references"
                  value={references}
                  onChange={(e) => setReferences(e.target.value)}
                  className="test-case-input"
                  placeholder="References"
                />
              </div>

              <div className="form-column">
                <label htmlFor="automationType" className="test-case-label">
                  Automation Type
                </label>
                <select
                  id="automationType"
                  value={automationType}
                  onChange={(e) => setAutomationType(e.target.value)}
                  className="test-case-select"
                >
                  <option value="Need to Triage">Need to Triage</option>
                  <option value="Automated">Automated</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="obsolete" className="test-case-label">
                  Obsolete
                </label>
                <input
                  type="checkbox"
                  id="obsolete"
                  checked={obsolete}
                  onChange={(e) => setObsolete(e.target.checked)}
                  className="test-case-checkbox"
                />
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="test-case-form-group">
            <label htmlFor="preconditions" className="test-case-label">
              Preconditions
            </label>
            <textarea
              id="preconditions"
              value={preconditions}
              onChange={(e) => setPreconditions(e.target.value)}
              className="test-case-textarea"
              placeholder="The preconditions of this test case. Reference other test cases with [C#] (e.g., C7)."
            />
          </div>

          <div className="test-case-form-group">
            <label htmlFor="steps" className="test-case-label">
              Steps
            </label>
            <textarea
              id="steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="test-case-textarea"
              placeholder="The required steps to execute the test case."
            />
          </div>

          <div className="test-case-form-group">
            <label htmlFor="expectedResult" className="test-case-label">
              Expected Result
            </label>
            <textarea
              id="expectedResult"
              value={expectedResult}
              onChange={(e) => setExpectedResult(e.target.value)}
              className="test-case-textarea"
              placeholder="The expected result after executing the test case."
            />
          </div>

          <div className="test-case-form-group">
            <label htmlFor="automatedCases" className="test-case-label">
              Automated Cases
            </label>
            <textarea
              id="automatedCases"
              value={automatedCases}
              onChange={(e) => setAutomatedCases(e.target.value)}
              className="test-case-textarea"
              placeholder="Automated Cases"
            />
          </div>

          {/* Buttons */}
          <div className="edit-suite-buttons">
            <button
              type="submit"
              className="edit-suite-button edit-suite-save"
            >
              ✓ Save Test Case
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

        <div className="file-upload">
          <div className="file-upload-icon" />
          <input
            type="file"
            onChange={handleFileChange}
            className="file-upload-input"
          />
          <p className="file-upload-text">
            Drop files here to attach, or click on "+" to browse
          </p>
        </div>

        <div className="actions-section">
          <p className="actions-title">Actions</p>
          <p className="actions-description">
            Delete a test case to remove it from its test suite. This also deletes all related running tests.
          </p>
          <button className="delete-suite-button">✗ Delete this test case</button>
        </div>
      </div>
    </div>
  );
}

export default EditTestCase;
