
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom"; // Import useLocation and Link from react-router-dom
import "../styles/TestRuns.css";

const TestRuns = () => {
  const [activeRuns, setActiveRuns] = useState([
    { title: "O_ General UI Testcases", percentage: "21%", date: "03/25/23" },
    { title: "Renewal of Test cases", percentage: "83%", date: "04/17/23" },
    { title: "UI Plan", percentage: "100%", date: "04/10/23" },
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

  // Extracting test suite name from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

  return (
    <div className="test-runs-page">
      <div className="test-runs-header">
        <h2>{suiteName}</h2>
        <div className="test-runs-actions">
          <Link to={`/AddTestRun?suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="run-test-link">Run Test</Link>
          <span></span>
          <Link to={`/edit-suite?suite=${encodeURIComponent(suiteName)}`} className="edit-suite-link">Edit</Link>
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

export default TestRuns;
