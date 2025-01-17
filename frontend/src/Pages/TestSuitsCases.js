// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom'; 
// import {fetchTestSuites} from '../api/TestSuites'; 
// import AlertBox from '../components/Alert'; 
// import '../styles/TestSuitsCases.css';
// import { getProjectID } from '../utilities/globals';


// const TestSuitesCases = () => {
//   const navigate = useNavigate();

//   // Handle Add Test Suite button click
//   const handleAddTestSuite = () => {
//     navigate('/AddTestSuite'); // Redirect to Add Test Suite page
//   };

//    // Handle click on a suite to navigate to Sections & Cases page
//    const handleSuiteClick = (suiteId, suiteName) => {
//     navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//   };

//   const [testSuites, setTestSuites] = useState([]); // State to hold test suites data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

//   const projectID = getProjectID();


//   // Fetch test suites data on component mount
//   useEffect(() => {
//     const loadTestSuites = async () => {
//       setLoading(true); // Set loading state
//       try {
//         const data = await fetchTestSuites(projectID); // Fetch test suites from API
//         setTestSuites(data); // Set the fetched data to state
//       } catch (err) {
//         setError('Failed to fetch test suites');
//         setAlertMessage('Failed to fetch test suites. Please try again later.'); // Set alert message
//         console.error(err);
//       } finally {
//         setLoading(false); // Reset loading state
//       }
//     };

//     loadTestSuites();
//   }, []); // Empty dependency array to run only once on mount

//   // Function to close the alert
//   const closeAlert = () => {
//     setAlertMessage(null);
//     setError(null); // Clear the error state as well
//   };


//   if (loading) {
//     return <div>Loading...</div>; // Loading state
//   }

//   return (
//     <div className="test-suites-cases">
//       {alertMessage && ( // Render AlertBox if there's an alert message
//         <AlertBox message={alertMessage} type="error" onClose={closeAlert} />
//       )}

//       <div className="test-suites-header">
//         <h1>Test Suites & Cases</h1>
//         <button className="add-test-suite" onClick={handleAddTestSuite}>+ Add New Test Suite</button>
//       </div>

//       {/* Suite Summary */}
//       <div className="suite-summary">
//         <span>{`${testSuites.length} test suites and ${testSuites.reduce((total, suite) => total + suite.cases, 0)} cases in this project.`}</span>
//       </div>
 
//       {/* List of Test Suites */}
//       <div className="suite-list">
//         {testSuites.map((suite) => (
//           <div key={suite.test_suite_id} className="suite">
//             <div className="suite-header">
//               <Link
//                 to={`/SectionsCases?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}`}
//                 className="suite-title"
//                 onClick={() => handleSuiteClick(suite.test_suite_id, suite.name)}
//               >
//                 {suite.name}
//               </Link>
//               <div className="suite-options">
//                 <Link to={`/AddTestRun?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}&source=TestSuitsCases`}>
//                   Run Test
//                 </Link>
//                 <Link to={`/TestRuns?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}`}>
//                   Test Runs
//                 </Link>
//                 <Link to={`/EditTestSuite?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}&source=TestSuitsCases`}>
//                   Edit
//                 </Link>
//               </div>
//             </div>
//             <div className="suite-details">
//               <span>{`Has X sections with ${suite.cases} test cases. Y active test runs.`}</span>
//               {/* Replace X and Y with actual data if available */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TestSuitesCases;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTestSuites } from '../api/TestSuites';
import AlertBox from '../components/Alert';
import '../styles/TestSuitsCases.css';
import { getProjectID } from '../utilities/globals';

const TestSuitesCases = () => {
  const navigate = useNavigate();

  // Handle Add Test Suite button click
  const handleAddTestSuite = () => {
    navigate('/AddTestSuite'); // Redirect to Add Test Suite page
  };

  // Handle click on a suite to navigate to Sections & Cases page
  const handleSuiteClick = (suiteId, suiteName) => {
    navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
  };

  const [testSuites, setTestSuites] = useState([]); // State to hold test suites data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

  const projectID = getProjectID();

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
  }, [projectID]); // Add projectID to dependency array

  // Function to close the alert
  const closeAlert = () => {
    setAlertMessage(null);
    setError(null); // Clear the error state as well
  };

  // Function to format pluralization
  const formatPlural = (count, singular, plural) => {
    return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  const totalTestCases = testSuites.reduce((total, suite) => total + suite.number_of_test_cases, 0);
  const totalSections = testSuites.reduce((total, suite) => total + suite.number_of_sections, 0);
  const totalActiveTestRuns = testSuites.reduce((total, suite) => total + suite.number_of_active_testruns, 0);

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
        <span>
          {formatPlural(testSuites.length, 'test suite', 'test suites')} and{' '}
          {formatPlural(totalTestCases, 'test case', 'test cases')} in this project.
        </span>
      </div>

      {/* List of Test Suites */}
      <div className="suite-list">
        {testSuites.map((suite) => (
          <div key={suite.test_suite_id} className="suite">
            <div className="suite-header">
              <Link
                to={`/SectionsCases?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}`}
                className="suite-title"
                onClick={() => handleSuiteClick(suite.test_suite_id, suite.name)}
              >
                {suite.name}
              </Link>
              <div className="suite-options">
                <Link to={`/add-test-run?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}&source=TestSuitsCases`}>
                  Run Test
                </Link>
                <Link to={`/TestSuiteTestRuns?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}`}>
                  Test Runs
                </Link>
                <Link to={`/EditTestSuite?suiteId=${suite.test_suite_id}&suite=${encodeURIComponent(suite.name)}&source=TestSuitsCases`}>
                  Edit
                </Link>
              </div>
            </div>
            <div className="suite-details">
              <span>
                Has {formatPlural(suite.number_of_sections, 'section', 'sections')} with{' '}
                {formatPlural(suite.number_of_test_cases, 'test case', 'test cases')}.{' '}
                {formatPlural(suite.number_of_active_testruns, 'active test run', 'active test runs')}.
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSuitesCases;
