import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/TestSuiteTestRuns.css";

const TestSuiteTestRuns = () => {
  const [activeRuns, setActiveRuns] = useState([
    { id: "1", title: "O_ General UI Testcases", percentage: "21%", date: "03/25/23" },
    { id: "2", title: "Renewal of Test cases", percentage: "83%", date: "04/17/23" },
    { id: "3", title: "UI Plan", percentage: "100%", date: "04/10/23" },
    { title: "Automation test case", percentage: "13%", date: "03/10/23" },
    { title: "Renewal of Test cases", percentage: "21%", date: "05/11/23" },
    { title: "Renewal of Test cases", percentage: "98%", date: "03/25/23" },
    { title: "Manual Test", percentage: "100%", date: "03/10/23" },
    { title: "Renewal of Test cases", percentage: "23%", date: "04/17/23" },
    { title: "Renewal of Test cases", percentage: "93%", date: "03/10/23" },
    { title: "O_ General UI Testcases", percentage: "100%", date: "05/25/23" },
    { title: "Renewal of Test cases", percentage: "23%", date: "05/11/23" },
    { title: "UI Plan", percentage: "100%", date: "03/25/23" },
    { title: "Renewal of Test cases", percentage: "100%", date: "04/25/23" },
    { title: "Renewal of Test cases", percentage: "100%", date: "03/25/23" },
    { title: "O_ General UI Testcases", percentage: "21%", date: "05/11/23" },
  ]);

  const [completedRuns, setCompletedRuns] = useState([
    { title: "O_ General UI Testcases", percentage: "100%", date: "02/10/23" },
    { title: "O_ General UI Testcases", percentage: "100%", date: "04/11/23" },
    { title: "O_ General UI Testcases", percentage: "100%", date: "01/10/23" },
    { title: "O_ General UI Testcases", percentage: "100%", date: "03/10/23" },
    { title: "O_ General UI Testcases", percentage: "100%", date: "03/11/23" },
    { title: "O_ General UI Testcases", percentage: "100%", date: "05/10/23" },
  ]);

  // Extracting test suite name and ID from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

  return (
    <div className="test-runs-page">
      <div className="test-runs-header">
        <h2>{`S${suiteId} - ${suiteName}`}</h2> {/* Display Suite ID and Name */}
        <div className="test-runs-actions">
          <Link to={`/add-test-run?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestSuiteTestRuns`} className="run-test-link">+ Add Test Run</Link>
          <span></span>
          <Link to={`/EditTestSuite?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestSuiteTestRuns`} className="edit-suite-link">Edit</Link>
        </div>
      </div>

      <div className="test-runs-content">
        <div className="test-run-type">
          <div className="test-run-title">
            <h3>Active</h3>
            <span>({activeRuns.length})</span>
          </div>
          <div className="test-run-list">
            {activeRuns.map((run, index) => (
              <div key={index} className="test-run-item">
                <div className="test-run-details">
                  <div className="test-run-info">
                  <Link to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&testRunId=${run.id}&testRunName=${run.title}&source=TestRunTestsResults`} className="test-run-name">{run.title}</Link>
                    <span className="test-run-date">{run.date}</span>
                  </div>
                  <div className="test-run-progress">
                    <div
                      className="progress-bar"
                      style={{ width: run.percentage }}
                    >
                      {run.percentage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="test-run-type">
          <div className="test-run-title">
            <h3>Completed</h3>
            <span>({completedRuns.length})</span>
          </div>
          <div className="test-run-list">
            {completedRuns.map((run, index) => (
              <div key={index} className="test-run-item">
                <div className="test-run-details">
                  <div className="test-run-info">
                    <a href="#" className="test-run-name">
                      {run.title}
                    </a>
                    <span className="test-run-date">{run.date}</span>
                  </div>
                  <div className="test-run-progress">
                    <div
                      className="progress-bar"
                      style={{ width: run.percentage }}
                    >
                      {run.percentage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSuiteTestRuns;
