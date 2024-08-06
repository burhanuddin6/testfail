import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/TestCaseDetails.css';

const TestCaseDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testCaseId = searchParams.get('testCaseId') || 'C18969';
  const testCaseName = searchParams.get('testCaseName') || 'Opening and navigating on Chrome';
  const suiteName = searchParams.get('suite') || 'General UI Testcases';
  const suiteId = searchParams.get('suiteId') || '0';
  const sectionName = searchParams.get('section') || 'General Cases';

  // Assuming you have a function to fetch the details based on testCaseId
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // Fetch test case details based on testCaseId
    // Replace this with your actual data fetching logic
    fetchTestCaseDetails(testCaseId).then(data => setDetails(data));
  }, [testCaseId]);

  // Mock function to simulate fetching data
  const fetchTestCaseDetails = async (id) => {
    // Replace this with your actual data fetching code
    return {
      type: 'Functional',
      priority: 'Medium',
      estimate: 'None',
      references: 'None',
      automationType: 'UI',
      obsolete: false,
      preconditions: 'Some preconditions',
      stepsText: 'Step 1: Do something\nStep 2: Do another thing',
      expectedResult: 'ec',
      mission: 'sc',
      goals: 'sxa',
      stepsCases: '',
      bddScenario: '',
      automatedCases: ''
    };
  };

  if (!details) {
    return <div>No Additional Details</div>; // Or some other loading state
  }

  return (
    <div className="test-case-details-container">
      <div className="test-case-detail-body">
        <div className='test-case-left-side'>
          <div className='test-case-header-class'>
            <div className="test-case-header">
              <div className="test-case-id">{testCaseId}</div>
              <h1 className="test-case-name">{testCaseName}</h1>
              <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestCaseDetails`} className="edit-case-link">Edit</Link>
            </div>
            <Link to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`} className="breadcrumb-link">
                {suiteName} &gt; {sectionName}
            </Link>
            
          </div>

          <div className="test-case-summary">
            <table className="summary-table">
              <tbody>
                <tr>
                  <td className="summary-label">Type</td>
                  <td className="summary-value">{details.type}</td>
                  <td className="summary-label">Priority</td>
                  <td className="summary-value">{details.priority}</td>
                </tr>
                <tr>
                  <td className="summary-label">Estimate</td>
                  <td className="summary-value">{details.estimate}</td>
                  <td className="summary-label">References</td>
                  <td className="summary-value">{details.references}</td>
                </tr>
                <tr>
                  <td className="summary-label">Automation Type</td>
                  <td className="summary-value">{details.automationType}</td>
                  <td className="summary-label">Obsolete</td>
                  <td className="summary-value">{details.obsolete ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>

            <div className="additional-details">
              {details.preconditions && (
                <div className="detail-section">
                  <h4>Preconditions</h4>
                  <p>{details.preconditions}</p>
                </div>
              )}
              {details.steps && (
                <div className="detail-section">
                  <h4>Steps</h4>
                  <p>{details.steps}</p>
                </div>
              )}
              {details.expectedResult && (
                <div className="detail-section">
                  <h4>Expected Result</h4>
                  <p>{details.expectedResult}</p>
                </div>
              )}
              {details.mission && (
                <div className="detail-section">
                  <h4>Mission</h4>
                  <p>{details.mission}</p>
                </div>
              )}
              {details.goals && (
                <div className="detail-section">
                  <h4>Goals</h4>
                  <p>{details.goals}</p>
                </div>
              )}
              {details.bddScenario && (
                <div className="detail-section">
                  <h4>BDD Scenario</h4>
                  <p>{details.bddScenario}</p>
                </div>
              )}
            </div>
          </div>
          </div>

        <div className="test-case-sidebar">
          <nav className="breadcrumb-nav">
            <div className="test-case-details-options">
                <h3 className="sidebar-title">
                  <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                    Details
                  </Link>
                </h3>
                <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Tests & Results
                </Link>
                <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Defects
                </Link>
                <Link to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId={testCaseId}&testCaseName={testCaseName}`} className="sidebar-link">
                  History
                </Link>
            </div>
          </nav>
          <div className="sidebar-section-people">
            <h3 className="sidebar-title">People & Dates</h3>
            <div className="people-dates">
              <div className="date-item">
                <div className="date-label">Created</div>
                <div className="date-value">Muhammad Faizan</div>
                <div className="date-timestamp">10/29/2020 12:22 PM</div>
              </div>
              <div className="date-item">
                <div className="date-label">Updated</div>
                <div className="date-value">Mohammed Maqsood</div>
                <div className="date-timestamp">11/2/2020 12:39 PM</div>
              </div>
            </div>
          </div>
        </div>
        
        </div>
    </div>
  );
};

export default TestCaseDetails;
