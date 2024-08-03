// import React, { useEffect, useState } from "react";
// import {useNavigate, useLocation, Link } from "react-router-dom";
// import {fetchTestRuns} from '../api/TestRun'; // Update the import path based on your file structure
// import AlertBox from '../components/Alert'; // Update the import path based on your file structure
// import "../styles/TestRuns.css";
// import { getProjectID } from '../utilities/globals';
// import Popup from "./selectSuite";


// const TestRuns = () => {
//   const [activeRuns, setActiveRuns] = useState([]);
//   const [completedRuns, setCompletedRuns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

//   // Extracting test suite name and ID from URL parameters
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const suiteId = searchParams.get('suiteId') || ' '; // Default to '0' if no suiteId is provided
//   const suiteName = searchParams.get('suite') || 'Test Suites & Cases'; // Default to 'Test Suite' if no suiteName is provided

//   // Fetch test runs data on component mount
//   useEffect(() => {

//     const projectID = getProjectID();

//     const loadTestRuns = async () => {
//       setLoading(true); // Set loading state
//       try {
//         const data = await fetchTestRuns(projectID, suiteId);
//         // Separate active and completed runs based on your criteria
//         const active = data.filter(run => !run.is_complete);
//         const completed = data.filter(run => run.is_complete);

//         setActiveRuns(active);
//         setCompletedRuns(completed);
//       } catch (err) {
//         setError('Failed to fetch test runs');
//         setAlertMessage('Failed to fetch test runs. Please try again later.'); // Set alert message
//         console.error(err);
//       } finally {
//         setLoading(false); // Reset loading state
//       }
//     };

//     loadTestRuns();
//   }, []); // Empty dependency array to run only once on mount

//   // Function to close the alert
//   const closeAlert = () => {
//     setAlertMessage(null);
//     setError(null); // Clear the error state as well
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Loading state
//   }

//   // return (
//   //   <div className="test-runs-page">
//   //     {alertMessage && ( // Render AlertBox if there's an alert message
//   //       <AlertBox message={alertMessage} type="error" onClose={closeAlert} />
//   //     )}
//   //     <div className="test-runs-header">
//   //       <h2>{suiteName}</h2>
//   //       <div className="test-runs-actions">
//   //         <Link to={`/AddTestRun?suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="run-test-link">Run Test</Link>
//   //         <span></span>
//   //         <Link to={`/edit-suite?suite=${encodeURIComponent(suiteName)}`} className="edit-suite-link">Edit</Link>
//   //       </div>
//   //     </div>

//   //     <div className="test-runs-content">
//   //       <div className="test-run-type">
//   //         <div className="test-run-title">
//   //           <h3>Active</h3>
//   //           <span>({activeRuns.length})</span>
//   //         </div>
//   //         <div className="test-run-list">
//   //           {activeRuns.map((run, index) => (
//   //             <div key={index} className="test-run-item">
//   //               <div className="test-run-details">
//   //                 <div className="test-run-info">
//   //                   <a href="#" className="test-run-name">
//   //                     {run.name}
//   //                   </a>
//   //                   <span className="test-run-date">{run.date}</span>
//   //                 </div>
//   //                 <div className="test-run-progress">
//   //                   <div
//   //                     className="progress-bar"
//   //                     style={{ width: run.percentage }}
//   //                   >
//   //                     {run.percentage}
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       </div>

//   //       <div className="test-run-type">
//   //         <div className="test-run-title">
//   //           <h3>Completed</h3>
//   //           <span>({completedRuns.length})</span>
//   //         </div>
//   //         <div className="test-run-list">
//   //           {completedRuns.map((run, index) => (
//   //             <div key={index} className="test-run-item">
//   //               <div className="test-run-details">
//   //                 <div className="test-run-info">
//   //                   <a href="#" className="test-run-name">
//   //                     {run.title}
//   //                   </a>
//   //                   <span className="test-run-date">{run.date}</span>
//   //                 </div>
//   //                 <div className="test-run-progress">
//   //                   <div
//   //                     className="progress-bar"
//   //                     style={{ width: run.percentage }}
//   //                   >
//   //                     {run.percentage}
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="test-runs-page">
//       {alertMessage && ( // Render AlertBox if there's an alert message
//         <AlertBox message={alertMessage} type="error" onClose={closeAlert} />
//       )}

//       <div className="test-runs-header">
//         <h2>{`S${suiteId} - ${suiteName}`}</h2> {/* Display Suite ID and Name */}
//         <div className="test-runs-actions">
//           <Link to={`/AddTestRun?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="run-test-link">Run Test</Link>
//           <span></span>
//           <Link to={`/EditTestSuite?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=TestRuns`} className="edit-suite-link">Edit</Link>
//         </div>
//         <p><strong>187</strong> open and <strong>458</strong> completed test runs in this project</p>
//       </div>

//       <div className="test-runs-content">
//         <div className="test-run-type">
//           <div className="test-run-title">
//             <h3>Active</h3>
//             <span>({activeRuns.length})</span>
//           </div>
//           <div className="test-run-list">
//             {activeRuns.map((run) => (
//               <div key={run.test_run_id} className="test-run-item">
//                 <div className="test-run-details">
//                   <div className="test-run-info">
//                     <a href="#" className="test-run-name">
//                       {run.name}
//                     </a>
//                     <span className="test-run-date">{run.date}</span>
//                   </div>
//                   <div className="test-run-progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: run.percentage }}
//                     >
//                       {run.percentage}
//                     </div>
//                     <div className="test-run-results-progress-value">42%</div>
//                 </div>

//                 <div className="test-run-results-details">
//                     <input type="checkbox"/>
//                     <p className="test-suite-indicator">Test Suite</p>
//                     <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
//                     <div className="test-run-results-statusbar">
//                         <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
//                         <div className="test-run-results-progress-bar-untested" style={{ width: '16%' }}> </div>
//                         <div className="test-run-results-progress-bar-failed" style={{ width: '42%' }}> </div>
//                     </div>
//                     <div className="test-run-results-progress-value">42%</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className='test-run-results'>
//             <h3 className='test-run-results-heading'> Completion Pending </h3>
//             <div className='test-run-results-scrollable'>

//                 <div className="test-run-results-details">
//                     <input type="checkbox"/>
//                     <p className="test-run-indicator">Test Run</p>
//                     <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
//                     <div className="test-run-results-statusbar">
//                         <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
//                         <div className="test-run-results-progress-bar-untested" style={{ width: '42%' }}> </div>
//                         <div className="test-run-results-progress-bar-failed" style={{ width: '16%' }}> </div>
//                     </div>
//                     <div className="test-run-results-progress-value">42%</div>
//                 </div>

//                 <div className="test-run-results-details">
//                     <input type="checkbox"/>
//                     <p className="test-suite-indicator">Test Suite</p>
//                     <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
//                     <div className="test-run-results-statusbar">
//                         <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
//                         <div className="test-run-results-progress-bar-untested" style={{ width: '16%' }}> </div>
//                         <div className="test-run-results-progress-bar-failed" style={{ width: '42%' }}> </div>
//                     </div>
//                     <div className="test-run-results-progress-value">42%</div>
//                 </div>
//               </div>
//             </div>
          

//             <div className='test-run-results'>
//             <h3 className='test-run-results-heading'> Completed </h3>
//             <div className='test-run-results-scrollable'>

//               <div className="date-wise-test-run-details">
//                 <div className="test-run-result-date">Date</div>
//                 <div className="test-run-results-details">
//                   <div className="test-run-name">Name</div>
//                   <div className="test-run-results-completion-value">92%</div>
//                 </div>

//                 <div className="test-run-results-details">
//                   <div className="test-run-name">Name</div>
//                   <div className="test-run-results-completion-value">100%</div>
//                 </div>

//               </div>
            
//               <div className="date-wise-test-run-details">
//                 <div className="test-run-result-date">Date</div>
//                 <div className="test-run-results-details">
//                   <div className="test-run-name">Name</div>
//                   <div className="test-run-results-completion-value">84%</div>
//                 </div>

//                 <div className="test-run-results-details">
//                   <div className="test-run-name">Name</div>
//                   <div className="test-run-results-completion-value">96%</div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="test-run-type">
//           <div className="test-run-title">
//             <h3>Completed</h3>
//             <span>({completedRuns.length})</span>
//           </div>
//           <div className="test-run-list">
//             {completedRuns.map((run) => (
//               <div key={run.test_run_id} className="test-run-item">
//                 <div className="test-run-details">
//                   <div className="test-run-info">
//                     <a href="#" className="test-run-name">
//                       {run.name}
//                     </a>
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

// export default TestRuns;


// new code 

import React, { useState } from "react";
import {useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/TestRuns.css";
import Popup from "./selectSuite";

const TestRuns = () => {

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddTestRuns = (selectedOption, actionType) => {
    if (selectedOption) {
      if (actionType == 'run'){
        navigate('/add-test-run', { state: { from: '/testruns', selectedOption } });
        setIsPopupVisible(false);  // Ensure popup is closed
      }
    }
  };

  const handleAddTestPlan = (e) => {
    e.preventDefault();
    navigate('/add-test-plan', { state: { from: '/testruns'}});
  }

  return (
    <div className="test-runs-page">
      <div className="test-runs-results-header">
        <div className='test-runs-results-main-heading'>
              <h2>Test Runs & Results</h2>
              <div className='test-runs-result-button-class'>
                  <button className="test-runs-results-add-button" onClick={() => setIsPopupVisible(true)}> + Add Test Run</button>
                  {isPopupVisible && (
                  <Popup
                    onConfirm={handleAddTestRuns}
                    onCancel={() => setIsPopupVisible(false)}
                    actionType="run"
                  />
                )}
                  <button className="test-runs-results-add-button" onClick={handleAddTestPlan}> + Add Test Plan </button>
                  <button className="test-runs-results-delete-button"> - Delete Selected</button>
              </div>
        </div>
        <p><strong>187</strong> open and <strong>458</strong> completed test runs in this project</p>
      </div>

      <div className='test-run-results-listing'>
          <div className='test-run-results'>
            <h3 className='test-run-results-heading'> Open</h3>
            <div className='test-run-results-scrollable'>

              <div className="milestone-wise-test-run-details">
                <div className="test-run-result-milestone-name">Milestone Name</div>
                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '16%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>

                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-suite-indicator">Test Suite</p>
                    <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>
              </div>
            </div>
          </div>

          <div className='test-run-results'>
            <h3 className='test-run-results-heading'> Completion Pending </h3>
            <div className='test-run-results-scrollable'>

                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '16%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>

                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-suite-indicator">Test Suite</p>
                    <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>
              </div>
            </div>
          

            <div className='test-run-results'>
            <h3 className='test-run-results-heading'> Completed </h3>
            <div className='test-run-results-scrollable'>

              <div className="date-wise-test-run-details">
                <div className="test-run-result-date">Date</div>
                <div className="test-run-results-details">
                  <div className="test-run-name">Name</div>
                  <div className="test-run-results-completion-value">92%</div>
                </div>

                <div className="test-run-results-details">
                  <div className="test-run-name">Name</div>
                  <div className="test-run-results-completion-value">100%</div>
                </div>

              </div>
            
              <div className="date-wise-test-run-details">
                <div className="test-run-result-date">Date</div>
                <div className="test-run-results-details">
                  <div className="test-run-name">Name</div>
                  <div className="test-run-results-completion-value">84%</div>
                </div>

                <div className="test-run-results-details">
                  <div className="test-run-name">Name</div>
                  <div className="test-run-results-completion-value">96%</div>
                </div>

              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default TestRuns;