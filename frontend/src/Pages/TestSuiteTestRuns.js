// import React, { useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import "../styles/TestSuiteTestRuns.css";
// import { getProjectID } from '../utilities/globals';
// import { fetchTestRuns } from "../api/TestRun";



// const TestSuiteTestRuns = () => {
//   const [activeRuns] = useState([
//     { id: "1", title: "O_ General UI Testcases", percentage: "21%", date: "03/25/23" },
//     { id: "2", title: "Renewal of Test cases", percentage: "83%", date: "04/17/23" },
//     { id: "3", title: "UI Plan", percentage: "100%", date: "04/10/23" },
//     { id: "4", title: "Automation test case", percentage: "13%", date: "03/10/23" },
//     { id: "5", title: "Renewal of Test cases", percentage: "21%", date: "05/11/23" },
//     { id: "6", title: "Renewal of Test cases", percentage: "98%", date: "03/25/23" },
//     { id: "7", title: "Manual Test", percentage: "100%", date: "03/10/23" },
//     { id: "8", title: "Renewal of Test cases", percentage: "23%", date: "04/17/23" },
//     { id: "9", title: "Renewal of Test cases", percentage: "93%", date: "03/10/23" },
//     { id: "10", title: "O_ General UI Testcases", percentage: "100%", date: "05/25/23" },
//     { id: "11", title: "Renewal of Test cases", percentage: "23%", date: "05/11/23" },
//     { id: "12", title: "UI Plan", percentage: "100%", date: "03/25/23" },
//     { id: "13", title: "Renewal of Test cases", percentage: "100%", date: "04/25/23" },
//     { id: "14", title: "Renewal of Test cases", percentage: "100%", date: "03/25/23" },
//     { id: "15", title: "O_ General UI Testcases", percentage: "21%", date: "05/11/23" },
//   ]);

//   const [completedRuns] = useState([
//     { id: "1", title: "O_ General UI Testcases", percentage: "100%", date: "02/10/23" },
//     { id: "2", title: "O_ General UI Testcases", percentage: "100%", date: "04/11/23" },
//     { id: "3", title: "O_ General UI Testcases", percentage: "100%", date: "01/10/23" },
//     { id: "4", title: "O_ General UI Testcases", percentage: "100%", date: "03/10/23" },
//     { id: "5", title: "O_ General UI Testcases", percentage: "100%", date: "03/11/23" },
//     { id: "6", title: "O_ General UI Testcases", percentage: "100%", date: "05/10/23" },
//   ]);

//   // Extracting test suite name and ID from URL parameters
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
//   const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided
//   const projectID = getProjectID();

//   return (
//     <div className="test-runs-page">
//       <div className="test-runs-header">
//         <h2>{`S${suiteId} - ${suiteName}`}</h2> {/* Display Suite ID and Name */}
//         <div className="test-runs-actions">
//           <Link to={`/add-test-run?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestSuiteTestRuns`} className="run-test-link">+ Add Test Run</Link>
//           <span></span>
//           <Link to={`/EditTestSuite?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestSuiteTestRuns`} className="edit-suite-link">Edit</Link>
//         </div>
//       </div>

//       <div className="test-runs-content">
//         <div className="test-run-type">
//           <div className="test-run-title">
//             <h3>Active</h3>
//             <span>({activeRuns.length})</span>
//           </div>
//           <div className="test-run-list">
//             {activeRuns.map((run, index) => (
//               <div key={index} className="test-run-item">
//                 <div className="test-run-details">
//                   <div className="test-run-info">
//                   <Link to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&testRunId=${run.id}&testRunName=${run.title}`} className="test-run-name">{run.title}</Link>
//                     <span className="test-run-date">{run.date}</span>
//                   </div>
//                   <div className="test-run-progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: run.percentage }}
//                     >
//                       {run.percentage}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="test-run-type">
//           <div className="test-run-title">
//             <h3>Completed</h3>
//             <span>({completedRuns.length})</span>
//           </div>
//           <div className="test-run-list">
//             {completedRuns.map((run, index) => (
//               <div key={index} className="test-run-item">
//                 <div className="test-run-details">
//                   <div className="test-run-info">
//                   <Link to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&testRunId=${run.id}&testRunName=${run.title}&source=TestRunTestsResults`} className="test-run-name">{run.title}</Link>
//                     <span className="test-run-date">{run.date}</span>
//                   </div>
//                   <div className="test-run-progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: run.percentage }}
//                     >
//                       {run.percentage}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestSuiteTestRuns;

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/TestSuiteTestRuns.css";
import { getProjectID } from '../utilities/globals';
import { fetchTestRuns } from "../api/TestRun";

const TestSuiteTestRuns = () => {
  const [activeRuns, setActiveRuns] = useState([]);
  const [completedRuns, setCompletedRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extracting test suite name and ID from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided
  const projectID = getProjectID();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTestRuns(projectID, suiteId);
        // Check if response is an array and handle data
        if (Array.isArray(response)) {
          const sortedRuns = response
            .filter(run => run.name) // Ensure name exists
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

          const active = sortedRuns.filter(run => !run.is_complete);
          const completed = sortedRuns.filter(run => run.is_complete);

          setActiveRuns(active);
          setCompletedRuns(completed);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectID, suiteId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
            {activeRuns.map((run) => (
              <div key={run.test_run_id} className="test-run-item">
                <div className="test-run-details">
                  <div className="test-run-info">
                    <Link to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&testRunId=${run.test_run_id}&testRunName=${run.name}`} className="test-run-name">{run.name}</Link>
                    <span className="test-run-date">By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}</span>
                  </div>
                  <div className="test-run-progress">
                    <div
                      className="progress-bar"
                      style={{ width: '0%' }} // Assuming you don't have progress data
                    >
                      0%
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
            {completedRuns.map((run) => (
              <div key={run.test_run_id} className="test-run-item">
                <div className="test-run-details">
                  <div className="test-run-info">
                    <Link to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&testRunId=${run.test_run_id}&testRunName=${run.name}&source=TestRunTestsResults`} className="test-run-name">{run.name}</Link>
                    <span className="test-run-date">{new Date(run.completed_on).toLocaleDateString()}</span>
                  </div>
                  <div className="test-run-progress">
                    <div
                      className="progress-bar"
                      style={{ width: '0%' }} // Assuming you don't have progress data
                    >
                      0%
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
