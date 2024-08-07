import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchTestCaseDetails, fetchTestCaseResult } from '../api/TestCase';
import '../styles/TestCaseDetails.css'; // Ensure this path is correct

const TestCaseResultDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testCaseResultId = searchParams.get('testCaseResultId'); // Get testCaseResultId from query params

  const [testCaseDetails, setTestCaseDetails] = useState(null);
  const [testCaseResult, setTestCaseResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultData = await fetchTestCaseResult(testCaseResultId);
        setTestCaseResult(resultData);
        const detailsData = await fetchTestCaseDetails(resultData.test_case_id);
        setTestCaseDetails(detailsData);
      } catch (err) {
        setError('Failed to fetch test case result details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testCaseResultId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!testCaseDetails || !testCaseResult) return <p>No test case result details available</p>;

  return (
    <div className="test-case-details-container">
      <div className="test-case-detail-body">
        <div className='test-case-left-side'>
          <div className='test-case-header-class'>
            <div className="test-case-header">
              <div className="test-case-id">{testCaseDetails.test_case_id}</div>
              <h1 className="test-case-name">{testCaseDetails.title}</h1>
              {/* <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestCaseDetails`} className="edit-case-link">Edit</Link> */}
            </div>
            {/* <Link to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`} className="breadcrumb-link">
              {suiteName} &gt; {sectionName}
            </Link> */}
          </div>
          
          <div className="test-case-summary">
            <table className="summary-table">
              <tbody>
                <tr>
                  <td className="summary-label">Type</td>
                  <td className="summary-value">{testCaseDetails.type_id}</td>
                  <td className="summary-label">Priority</td>
                  <td className="summary-value">{testCaseDetails.priority_id}</td>
                </tr>
                <tr>
                  <td className="summary-label">Estimate</td>
                  <td className="summary-value">{testCaseDetails.estimate || 'None'}</td>
                  <td className="summary-label">References</td>
                  <td className="summary-value">None</td>
                </tr>
                <tr>
                  <td className="summary-label">Automation Type</td>
                  <td className="summary-value">{testCaseDetails.automation_type}</td>
                  <td className="summary-label">Obsolete</td>
                  <td className="summary-value">{testCaseDetails.obsolete ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
  
            <div className="additional-details">
              {testCaseDetails.preconditions && (
                <div className="detail-section">
                  <h4>Preconditions</h4>
                  <p>{testCaseDetails.preconditions}</p>
                </div>
              )}
              {testCaseDetails.steps && (
                <div className="detail-section">
                  <h4>Steps</h4>
                  <p>{testCaseDetails.steps}</p>
                </div>
              )}
              {testCaseDetails.expected_result && (
                <div className="detail-section">
                  <h4>Expected Result</h4>
                  <p>{testCaseDetails.expected_result}</p>
                </div>
              )}
              {testCaseDetails.mission && (
                <div className="detail-section">
                  <h4>Mission</h4>
                  <p>{testCaseDetails.mission}</p>
                </div>
              )}
              {testCaseDetails.goals && (
                <div className="detail-section">
                  <h4>Goals</h4>
                  <p>{testCaseDetails.goals}</p>
                </div>
              )}
              {testCaseDetails.bdd_scenario && (
                <div className="detail-section">
                  <h4>BDD Scenario</h4>
                  <p>{testCaseDetails.bdd_scenario}</p>
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="test-case-sidebar">
          <nav className="breadcrumb-nav">
            <div className="test-case-details-options">
              <h3 className="sidebar-title">
                <Link to={`/TestCaseDetails?&testCaseId=${testCaseDetails.test_case_id}`} className="sidebar-link">
                  Details
                </Link>
              </h3>
              <Link to={`/TestCaseDefects?testCaseId=${testCaseDetails.test_case_id}`} className="sidebar-link">
                Defects
              </Link>
            </div>
          </nav>
          <div className="sidebar-section-people">
            <h3 className="sidebar-title">People & Dates</h3>
            <div className="people-dates">
              <div className="date-item">
                <div className="date-label">Created</div>
                <div className="date-value">{testCaseDetails.created_by_info.first_name + testCaseDetails.created_by_info.last_name}</div>
                <div className="date-timestamp">{new Date(testCaseDetails.created_on).toLocaleString()}</div>
              </div>
              <div className="date-item">
                <div className="date-label">Updated</div>
                <div className="date-value">
                  {testCaseDetails.updated_by
                    ? testCaseDetails.updated_by.username
                    : testCaseDetails.created_by_info.first_name + testCaseDetails.created_by_info.last_name}
                </div>
                <div className="date-timestamp">
                  {testCaseDetails.updated_on
                    ? new Date(testCaseDetails.updated_on).toLocaleString()
                    : testCaseDetails.created_on
                      ? new Date(testCaseDetails.created_on).toLocaleString()
                      : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="test-case-result-changes">
        {testCaseResult.changes.map(change => (
          <div key={change.test_case_result_changes_id} className="test-case-result-change">
            <h4>Change #{change.test_case_result_changes_id}</h4>
            <p><strong>Status:</strong> {change.status}</p>
            <p><strong>Version:</strong> {change.version}</p>
            <p><strong>Comment:</strong> {change.comment}</p>
            <p><strong>Result Time:</strong> {change.result_time}</p>
            <p><strong>Defect:</strong> {change.defect || 'None'}</p>
            <p><strong>Elapsed Time:</strong> {change.elapsed_time_in_seconds ? `${change.elapsed_time_in_seconds} seconds` : 'N/A'}</p>
            <p><strong>Created On:</strong> {new Date(change.created_on).toLocaleString()}</p>
            <p><strong>Created By:</strong> {change.created_by}</p>
            <p><strong>Assigned To:</strong> {change.assigned_to || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseResultDetails;
