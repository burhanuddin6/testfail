import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link from react-router-dom
import {fetchTestSuites} from '../api/TestSuites'; // Import the API function (update the import path based on your file structure)
import AlertBox from '../components/Alert'; // Import the AlertBox component
import '../styles/TestSuitsCases.css';

const TestSuitesCases = () => {
  const navigate = useNavigate();

  // Handle Add Test Suite button click
  const handleAddTestSuite = () => {
    navigate('/AddTestSuite'); // Redirect to Add Test Suite page
  };

  const [testSuites, setTestSuites] = useState([]); // State to hold test suites data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectID = searchParams.get('projectID') || '0';

  // Fetch test suites data on component mount
  useEffect(() => {
    const loadTestSuites = async () => {
      setLoading(true); // Set loading state
      try {
        const data = await fetchTestSuites(projectID); // Fetch test suites from API
        setTestSuites(data); // Set the fetched data to state
      } catch (err) {
        setError('Failed to fetch test suites');
        setAlertMessage('Failed to fetch test suites. Please try again later.'); // Set alert message
        console.error(err);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    loadTestSuites();
  }, []); // Empty dependency array to run only once on mount

  // Function to close the alert
  const closeAlert = () => {
    setAlertMessage(null);
    setError(null); // Clear the error state as well
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="test-suites-cases">
      {alertMessage && ( // Render AlertBox if there's an alert message
        <AlertBox message={alertMessage} type="error" onClose={closeAlert} />
      )}

      <div className="test-suites-header">
        <h1>Test Suites & Cases</h1>
        <button className="add-test-suite" onClick={handleAddTestSuite}>+ Add New Test Suite</button>
      </div>

      {/* Suite Summary */}
      <div className="suite-summary">
        <span>{`${testSuites.length} test suites and ${testSuites.reduce((total, suite) => total + suite.cases, 0)} cases in this project.`}</span>
      </div>

      {/* List of Test Suites */}
      <div className="suite-list">
        {testSuites.map((suite) => (
          <div key={suite.test_suite_id} className="suite">
            <div className="suite-header">
              <Link to={`/TestCases?suiteId=${suite.id}`} className="suite-title">
                {suite.name}
              </Link>
              <div className="suite-options">
                <Link to={`/AddTestRun?suiteId=${suite.id}&suite=${encodeURIComponent(suite.name)}&source=TestSuitsCases`}>
                  Run Test
                </Link>
                <span>|</span>
                <Link to={`/TestRuns?suiteId=${suite.id}&suite=${encodeURIComponent(suite.name)}`}>
                  Test Runs
                </Link>
                <span>|</span>
                <Link to={`/EditTestSuite?suiteId=${suite.id}&suite=${encodeURIComponent(suite.name)}&source=TestSuitsCases`}>
                  Edit
                </Link>
              </div>
            </div>
            <div className="suite-details">
              <span>{`Has X sections with ${suite.cases} test cases. Y active test runs.`}</span>
              {/* Replace X and Y with actual data if available */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSuitesCases;

// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import '../styles/TestSuitsCases.css';

// const testSuites = [
//   { title: "O_ General UI Testcases", sections: 6, cases: 72, runs: 23 },
//   { title: "Appliance (Pod)", sections: 1332, cases: 8769, runs: 544 },
//   { title: "Breach Management", sections: 111, cases: 1003, runs: 67 },
//   { title: "Co pilot", sections: 3, cases: 31, runs: 4 },
//   { title: "Compliance", sections: 68, cases: 811, runs: 33 },
//   { title: "Connectors", sections: 3567, cases: 22779, runs: 762 },
//   { title: "Consent Management", sections: 298, cases: 4976, runs: 944 },
//   { title: "Content Classification", sections: 78, cases: 728, runs: 65 }
// ];

// const TestSuitesCases = () => {
//   return (
//     <div className="test-suites-cases">
//       <div className="test-suites-header">
//         <h1>Test Suites & Cases</h1>
//         <button className="add-test-suite">+ Add New Test Suite</button>
//       </div>
//       <div className="suite-summary">
//         <span>33 test suites and 115466 cases in this project.</span>
//       </div>
//       <div className="suite-list">
//         {testSuites.map((suite, index) => (
//           <div key={index} className="suite">
//             <div className="suite-header">
//               <a href="#" className="suite-title">{suite.title}</a>
//               <div className="suite-options">
//                 <Link to={`/AddTestRun?suite=${encodeURIComponent(suite.title)}&source=TestSuitsCases`}>Run Test</Link>
//                 <span>|</span>
//                 <Link to={`/TestRuns?suite=${encodeURIComponent(suite.title)}`}>Test Runs</Link>
//                 <span>|</span>
//                 <Link to={`/edit-suite?suite=${encodeURIComponent(suite.title)}`}>Edit</Link>
//               </div>
//             </div>
//             <div className="suite-details">
//               <span>{`Has ${suite.sections} sections with ${suite.cases} test cases. ${suite.runs} active test runs.`}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TestSuitesCases;
