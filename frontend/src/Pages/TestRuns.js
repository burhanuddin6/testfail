import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {fetchTestRuns} from '../api/TestRun'; // Update the import path based on your file structure
import AlertBox from '../components/Alert'; // Update the import path based on your file structure
import "../styles/TestRuns.css";
import { getProjectID } from '../utilities/globals';


const TestRuns = () => {
  const [activeRuns, setActiveRuns] = useState([]);
  const [completedRuns, setCompletedRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

  // Extracting test suite name and ID from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || ' '; // Default to '0' if no suiteId is provided
  const suiteName = searchParams.get('suite') || 'Test Suites & Cases'; // Default to 'Test Suite' if no suiteName is provided

  // Fetch test runs data on component mount
  useEffect(() => {

    const projectID = getProjectID();

    const loadTestRuns = async () => {
      setLoading(true); // Set loading state
      try {
        const data = await fetchTestRuns(projectID, suiteId);
        // Separate active and completed runs based on your criteria
        const active = data.filter(run => !run.is_complete);
        const completed = data.filter(run => run.is_complete);

        setActiveRuns(active);
        setCompletedRuns(completed);
      } catch (err) {
        setError('Failed to fetch test runs');
        setAlertMessage('Failed to fetch test runs. Please try again later.'); // Set alert message
        console.error(err);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    loadTestRuns();
  }, []); // Empty dependency array to run only once on mount

  // Function to close the alert
  const closeAlert = () => {
    setAlertMessage(null);
    setError(null); // Clear the error state as well
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  // return (
  //   <div className="test-runs-page">
  //     {alertMessage && ( // Render AlertBox if there's an alert message
  //       <AlertBox message={alertMessage} type="error" onClose={closeAlert} />
  //     )}
  //     <div className="test-runs-header">
  //       <h2>{suiteName}</h2>
  //       <div className="test-runs-actions">
  //         <Link to={`/AddTestRun?suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="run-test-link">Run Test</Link>
  //         <span></span>
  //         <Link to={`/edit-suite?suite=${encodeURIComponent(suiteName)}`} className="edit-suite-link">Edit</Link>
  //       </div>
  //     </div>

  //     <div className="test-runs-content">
  //       <div className="test-run-type">
  //         <div className="test-run-title">
  //           <h3>Active</h3>
  //           <span>({activeRuns.length})</span>
  //         </div>
  //         <div className="test-run-list">
  //           {activeRuns.map((run, index) => (
  //             <div key={index} className="test-run-item">
  //               <div className="test-run-details">
  //                 <div className="test-run-info">
  //                   <a href="#" className="test-run-name">
  //                     {run.name}
  //                   </a>
  //                   <span className="test-run-date">{run.date}</span>
  //                 </div>
  //                 <div className="test-run-progress">
  //                   <div
  //                     className="progress-bar"
  //                     style={{ width: run.percentage }}
  //                   >
  //                     {run.percentage}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       <div className="test-run-type">
  //         <div className="test-run-title">
  //           <h3>Completed</h3>
  //           <span>({completedRuns.length})</span>
  //         </div>
  //         <div className="test-run-list">
  //           {completedRuns.map((run, index) => (
  //             <div key={index} className="test-run-item">
  //               <div className="test-run-details">
  //                 <div className="test-run-info">
  //                   <a href="#" className="test-run-name">
  //                     {run.title}
  //                   </a>
  //                   <span className="test-run-date">{run.date}</span>
  //                 </div>
  //                 <div className="test-run-progress">
  //                   <div
  //                     className="progress-bar"
  //                     style={{ width: run.percentage }}
  //                   >
  //                     {run.percentage}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="test-runs-page">
      {alertMessage && ( // Render AlertBox if there's an alert message
        <AlertBox message={alertMessage} type="error" onClose={closeAlert} />
      )}

      <div className="test-runs-header">
        <h2>{`S${suiteId} - ${suiteName}`}</h2> {/* Display Suite ID and Name */}
        <div className="test-runs-actions">
          <Link to={`/AddTestRun?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="run-test-link">Run Test</Link>
          <span></span>
          <Link to={`/EditTestSuite?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="edit-suite-link">Edit</Link>
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
                    <a href="#" className="test-run-name">
                      {run.name}
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
            {completedRuns.map((run) => (
              <div key={run.test_run_id} className="test-run-item">
                <div className="test-run-details">
                  <div className="test-run-info">
                    <a href="#" className="test-run-name">
                      {run.name}
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
