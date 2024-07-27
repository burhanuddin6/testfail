import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/TestSuitsCases.css';

// Updated testSuites array with IDs
const testSuites = [
  { id: 587, title: "O_ General UI Testcases", sections: 6, cases: 72, runs: 23 },
  { id: 1, title: "Appliance (Pod)", sections: 1332, cases: 8769, runs: 544 },
  { id: 2, title: "Breach Management", sections: 111, cases: 1003, runs: 67 },
  { id: 3, title: "Co pilot", sections: 3, cases: 31, runs: 4 },
  { id: 4, title: "Compliance", sections: 68, cases: 811, runs: 33 },
  { id: 5, title: "Connectors", sections: 3567, cases: 22779, runs: 762 },
  { id: 6, title: "Consent Management", sections: 298, cases: 4976, runs: 944 },
  { id: 7, title: "Content Classification", sections: 78, cases: 728, runs: 65 }
];

const TestSuitesCases = () => {
  const navigate = useNavigate();

  const handleAddTestSuite = () => {
    navigate('/AddTestSuite'); // Redirect to Add Test Suite page
  };

  return (
    <div className="test-suites-cases">
      <div className="test-suites-header">
        <h1>Test Suites & Cases</h1>
        <button className="add-test-suite" onClick={handleAddTestSuite}>+ Add New Test Suite</button>
      </div>
      <div className="suite-summary">
        <span>33 test suites and 115466 cases in this project.</span>
      </div>
      <div className="suite-list">
        {testSuites.map((suite, index) => (
          <div key={index} className="suite">
            <div className="suite-header">
              <a href="#" className="suite-title">{suite.title}</a>
              <div className="suite-options">
                <Link to={`/AddTestRun?suiteId=${suite.id}&suite=${encodeURIComponent(suite.title)}&source=TestSuitsCases`}>Run Test</Link>
                <span>|</span>
                <Link to={`/TestRuns?suiteId=${suite.id}&suite=${encodeURIComponent(suite.title)}`}>Test Runs</Link>
                <span>|</span>
                <Link to={`/edit-suite?suiteId=${suite.id}&suite=${encodeURIComponent(suite.title)}`}>Edit</Link>
              </div>
            </div>
            <div className="suite-details">
              <span>{`Has ${suite.sections} sections with ${suite.cases} test cases. ${suite.runs} active test runs.`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSuitesCases;
