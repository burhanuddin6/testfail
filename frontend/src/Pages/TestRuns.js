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

// import React, { useState, useEffect} from "react";
// import {useNavigate, useLocation, Link } from "react-router-dom";
// import "../styles/TestRuns.css";
// import Popup from "./selectSuite";
// import { fetchTestRuns } from "../api/TestRun";
// import { fetchTestPlans } from "../api/TestPlan";
// import { getProjectID } from '../utilities/globals';


// const TestRuns = () => {

//   const navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [testRuns, setTestRuns] = useState([]);
//   const [testPlans, setTestPlans] = useState([]);
//   const projectID = getProjectID();

//   useEffect(() => {
//     console.log("inside useeffect HHAHAHA")
//     const getTestRuns = async () => {
//       try {
//         console.log("inside try")
//         const data = await fetchTestRuns(projectID);
//         setTestRuns(data);
//         console.log("Test Runs HAHAH", JSON.stringify(data, null, 2)); //debug statement, remove before deployment 
//       } catch (error) {
//         console.error("Failed to fetch test runs", error); // debug statement, remove before production
//       }
//     };

//     const getTestPlans = async () => {
//       try {
//         const data = await fetchTestPlans(projectID);
//         setTestPlans(data);
//         console.log("Test Plans HAAHAHA", JSON.stringify(data, null, 2)); //debug statement, remove before deployment 
//       } catch (error) {
//         console.error("Failed to fetch test plans", error); // debug statement, remove before production
//       }
//     };
    
//     Promise.all([getTestRuns(), getTestPlans()])
//       .then(() => {
//         console.log("Both getTestPlans and getTestRuns have completed."); // debug statement, remove before production
//       })
//       .catch((error) => {
//         console.error("An error occurred while fetching data", error); // debug statement, remove before production
//       });
//   }, []);

//   const handleAddTestRuns = (selectedOption, actionType) => {
//     if (selectedOption) {
//       if (actionType == 'run'){
//         navigate('/add-test-run', { state: { from: '/testruns', selectedOption } });
//         setIsPopupVisible(false);  
//       }
//     }
//   };

//   const handleAddTestPlan = (e) => {
//     e.preventDefault();
//     navigate('/add-test-plan', { state: { from: '/testruns'}});
//   }

//   return (
//     <div className="test-runs-page">
//       <div className="test-runs-results-header">
//         <div className='test-runs-results-main-heading'>
//               <h2>Test Runs & Results</h2>
//               <div className='test-runs-result-button-class'>
//                   <button className="test-runs-results-add-button" onClick={() => setIsPopupVisible(true)}> + Add Test Run</button>
//                   {isPopupVisible && (
//                   <Popup
//                     onConfirm={handleAddTestRuns}
//                     onCancel={() => setIsPopupVisible(false)}
//                     actionType="run"
//                   />
//                 )}
//                   <button className="test-runs-results-add-button" onClick={handleAddTestPlan}> + Add Test Plan </button>
//                   <button className="test-runs-results-delete-button"> - Delete Selected</button>
//               </div>
//         </div>
//         <p><strong>187</strong> open and <strong>458</strong> completed test runs in this project</p>
//       </div>

//       <div className='test-run-results-listing'>
//           <div className='test-run-results'>
//             <h3 className='test-run-results-heading'> Open</h3>
//             <div className='test-run-results-scrollable'>

//               <div className="milestone-wise-test-run-details">
//                 <div className="test-run-result-milestone-name">Milestone Name</div>
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

//     </div>
//   );
// };

// export default TestRuns;


// new mariam integrated code
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/TestRuns.css";
// import Popup from "./selectSuite";
// import { fetchTestRuns } from "../api/TestRun";
// import { fetchTestPlans } from "../api/TestPlan";
// import { getProjectID } from '../utilities/globals';

// const TestRuns = () => {
//   const navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [testRuns, setTestRuns] = useState([]);
//   const [testPlans, setTestPlans] = useState([]);
//   const projectID = getProjectID();

//   // Function to filter and sort items
//   const filterAndSort = (items) => {
//     return items.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
//   };

//   useEffect(() => {
//     const getTestRuns = async () => {
//       try {
//         const data = await fetchTestRuns(projectID);
//         console.log(`ur run payload is:  ${JSON.stringify(data, null, 2)}`); // debug statement, remove before production
//         setTestRuns(data);
//       } catch (error) {
//         console.error("Failed to fetch test runs", error);
//       }
//     };

//     const getTestPlans = async () => {
//       try {
//         const data = await fetchTestPlans(projectID);
//         console.log(`ur plan payload is:  ${JSON.stringify(data, null, 2)}`); // debug statement, remove before production

//         setTestPlans(data);
//       } catch (error) {
//         console.error("Failed to fetch test plans", error);
//       }
//     };

//     Promise.all([getTestRuns(), getTestPlans()])
//       .then(() => {
//         console.log("Both getTestPlans and getTestRuns have completed.");
//       })
//       .catch((error) => {
//         console.error("An error occurred while fetching data", error);
//       });
//   }, [projectID]);

//   const handleAddTestRuns = (selectedOption, actionType) => {
//     if (selectedOption) {
//       if (actionType === 'run') {
//         navigate('/add-test-run', { state: { from: '/testruns', selectedOption } });
//         setIsPopupVisible(false);
//       }
//     }
//   };

//   const handleAddTestPlan = (e) => {
//     e.preventDefault();
//     navigate('/add-test-plan', { state: { from: '/testruns' } });
//   };

//   // Mock milestone names (You would normally fetch these from an API)
//   const milestoneNames = {
//     1: "Milestone 1",
//     2: "Milestone 2",
//     3: "Milestone 3"
//   };

//   // Group by milestone
//   const groupByMilestone = (items) => {
//     return items.reduce((acc, item) => {
//       const milestoneName = milestoneNames[item.milestone_id] || "Unknown Milestone";
//       if (!acc[milestoneName]) {
//         acc[milestoneName] = [];
//       }
//       acc[milestoneName].push(item);
//       return acc;
//     }, {});
//   };

//   // Filter and sort data
//   const openTestRuns = filterAndSort(testRuns.filter(run => !run.is_complete));
//   const completedTestRuns = filterAndSort(testRuns.filter(run => run.is_complete));
//   const openTestPlans = filterAndSort(testPlans.filter(plan => !plan.is_complete));
//   const completedTestPlans = filterAndSort(testPlans.filter(plan => plan.is_complete));

//   const groupedOpenTestRuns = groupByMilestone(openTestRuns);
//   console.log(`groupedOpenTestRuns is:  ${JSON.stringify(groupedOpenTestRuns, null, 2)}`); // debug statement, remove before production

//   const groupedCompletedTestRuns = groupByMilestone(completedTestRuns);
//   console.log(`groupedCompletedTestRuns is:  ${JSON.stringify(groupedCompletedTestRuns, null, 2)}`); // debug statement, remove before production

//   const groupedOpenTestPlans = groupByMilestone(openTestPlans);
//   console.log(`groupedOpenTestPlans is:  ${JSON.stringify(groupedOpenTestPlans, null, 2)}`); // debug statement, remove before production

//   const groupedCompletedTestPlans = groupByMilestone(completedTestPlans);
//   console.log(`groupedCompletedTestPlans is:  ${JSON.stringify(groupedCompletedTestPlans, null, 2)}`); // debug statement, remove before production


//   // Helper function to calculate percentages
//   const calculatePercentage = (part, total) => total ? ((part / total) * 100).toFixed(0) : '0';

//   return (
//     <div className="test-runs-page">
//       <div className="test-runs-results-header">
//         <div className='test-runs-results-main-heading'>
//           <h2>Test Runs & Results</h2>
//           <div className='test-runs-result-button-class'>
//             <button className="test-runs-results-add-button" onClick={() => setIsPopupVisible(true)}> + Add Test Run</button>
//             {isPopupVisible && (
//               <Popup
//                 onConfirm={handleAddTestRuns}
//                 onCancel={() => setIsPopupVisible(false)}
//                 actionType="run"
//               />
//             )}
//             <button className="test-runs-results-add-button" onClick={handleAddTestPlan}> + Add Test Plan </button>
//             <button className="test-runs-results-delete-button"> - Delete Selected</button>
//           </div>
//         </div>
//         <p><strong>{openTestRuns.length + openTestPlans.length}</strong> open and <strong>{completedTestRuns.length + completedTestPlans.length}</strong> completed test runs/plans in this project</p>
//       </div>

//       <div className='test-run-results-listing'>
//         <div className='test-run-results'>
//           <h3 className='test-run-results-heading'> Open</h3>
//           <div className='test-run-results-scrollable'>
//             {Object.keys(groupedOpenTestRuns).concat(Object.keys(groupedOpenTestPlans)).filter((value, index, self) => self.indexOf(value) === index).map(milestone => (
//               <div key={milestone}>
//                 <h4 className="test-run-result-milestone-name">{milestone}</h4>
                
//                 {groupedOpenTestRuns[milestone] && groupedOpenTestRuns[milestone].length > 0 && groupedOpenTestRuns[milestone].map(run => (
//                   <div key={run.test_run_id} className="test-run-results-details">
//                     <input type="checkbox" />
//                     <p className="test-run-indicator">Test Run</p>
//                     <p><strong>{run.name}</strong><br />by {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
//                   </div>
//                 ))}

//                 {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].length > 0 && groupedOpenTestPlans[milestone].map(plan => (
//                   <div key={plan.test_plan_id} className="test-run-results-details">
//                     <input type="checkbox" />
//                     <p className="test-suite-indicator">Test Plan</p>
//                     <p><strong>{plan.name}</strong><br />by {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className='test-run-results'>
//         <h3 className='test-run-results-heading'>Completion Pending</h3>
//         <div className='test-run-results-scrollable'>
//           {Object.keys(groupedOpenTestRuns).concat(Object.keys(groupedOpenTestPlans))
//             .filter((value, index, self) => self.indexOf(value) === index) // Ensures unique milestones
//             .map(milestone => (
//               <div key={milestone}>
//                 <h4 className="test-run-result-milestone-name">{milestone}</h4>

//                 {groupedOpenTestRuns[milestone] && groupedOpenTestRuns[milestone].length > 0 && groupedOpenTestRuns[milestone].map(run => (
//                   <div key={run.test_run_id} className="test-run-results-details">
//                     <input type="checkbox" />
//                     <p className="test-run-indicator">Test Run</p>
//                     <p><strong>{run.name}</strong><br />by {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
//                   </div>
//                 ))}

//                 {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].length > 0 && groupedOpenTestPlans[milestone].map(plan => (
//                   <div key={plan.test_plan_id} className="test-run-results-details">
//                     <input type="checkbox" />
//                     <p className="test-suite-indicator">Test Plan</p>
//                     <p><strong>{plan.name}</strong><br />by {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//         </div>
//       </div>


//         <div className='test-run-results'>
//           <h3 className='test-run-results-heading'> Completed</h3>
//           <div className='test-run-results-scrollable'>
//             {Object.keys(groupedCompletedTestRuns).map(milestone => (
//               <div key={milestone}>
//                 <h4 className="test-run-result-milestone-name">{milestone}</h4>
//                 {groupedCompletedTestRuns[milestone].map(run => (
//                   <div key={run.test_run_id} className="test-run-results-details">
//                     <input type="checkbox" />
//                     <p className="test-run-indicator">Test Run</p>
//                     <p><strong>{run.name}</strong><br />by {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
//                   </div>
//                 ))}
//                 {groupedCompletedTestPlans[milestone] && groupedCompletedTestPlans[milestone].map(plan => (
//                   <div key={plan.test_plan_id} className="test-run-results-details">
//                     <input type="checkbox" />
//                     <p className="test-suite-indicator">Test Plan</p>
//                     <p><strong>{plan.name}</strong><br />by {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestRuns;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TestRuns.css";
import Popup from "./selectSuite";
import { fetchTestRuns } from "../api/TestRun";
import { fetchTestPlans } from "../api/TestPlan";
import { deleteTestPlan } from "../api/TestPlan"; // Make sure to import your delete functions
import { deleteTestRun } from "../api/TestRun";
import { getProjectID } from '../utilities/globals';

const TestRuns = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [testRuns, setTestRuns] = useState([]);
  const [testPlans, setTestPlans] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); // State to track selected items
  const projectID = getProjectID();

  // Function to filter and sort items
  const filterAndSort = (items) => {
    return items.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
  };

  useEffect(() => {
    const getTestRuns = async () => {
      try {
        const data = await fetchTestRuns(projectID);
        setTestRuns(data);
      } catch (error) {
        console.error("Failed to fetch test runs", error);
      }
    };

    const getTestPlans = async () => {
      try {
        const data = await fetchTestPlans(projectID);
        setTestPlans(data);
      } catch (error) {
        console.error("Failed to fetch test plans", error);
      }
    };

    Promise.all([getTestRuns(), getTestPlans()])
      .then(() => {
        console.log("Both getTestPlans and getTestRuns have completed.");
      })
      .catch((error) => {
        console.error("An error occurred while fetching data", error);
      });
  }, [projectID]);

  const handleAddTestRuns = (selectedOption, actionType) => {
    if (selectedOption) {
      if (actionType === 'run') {
        // navigate('/add-test-run', { state: { from: '/testruns', selectedOption } });
        navigate('/add-test-run?source=TestRuns', { state: { from: '/testruns', selectedOption } });
        setIsPopupVisible(false);
      }
    }
  };

  const handleAddTestPlan = (e) => {
    e.preventDefault();
    navigate('/add-test-plan', { state: { from: '/testruns' } });
  };

  const handleSelectItem = (id, type) => {
    setSelectedItems(prev => {
      const updated = new Set(prev);
      const key = `${type}_${id}`;
      if (updated.has(key)) {
        updated.delete(key);
      } else {
        updated.add(key);
      }
      return updated;
    });
  };

  const handleDeleteSelected = async () => {
    const testRunsToDelete = [];
    const testPlansToDelete = [];

    selectedItems.forEach(item => {
      const [type, id] = item.split('_');
      if (type === 'run') {
        testRunsToDelete.push(id);
      } else if (type === 'plan') {
        testPlansToDelete.push(id);
      }
    });

    // Delete test runs
    for (const id of testRunsToDelete) {
      try {
        await deleteTestRun(id);
        console.log(`Deleted test run with id: ${id}`);
      } catch (error) {
        console.error(`Failed to delete test run with id: ${id}`, error);
      }
    }

    // Delete test plans
    for (const id of testPlansToDelete) {
      try {
        await deleteTestPlan(id);
        console.log(`Deleted test plan with id: ${id}`);
      } catch (error) {
        console.error(`Failed to delete test plan with id: ${id}`, error);
      }
    }

    
    const [dataRuns, dataPlans] = await Promise.all([
      fetchTestRuns(projectID),
      fetchTestPlans(projectID),
    ]);
    setTestRuns(dataRuns);
    setTestPlans(dataPlans);

    // Clear selected items
    setSelectedItems({ runs: [], plans: [] });
  };

  // Mock milestone names (You would normally fetch these from an API)
  const milestoneNames = {
    1: "Milestone 1",
    2: "Milestone 2",
    3: "Milestone 3"
  };

  // Group by milestone
  const groupByMilestone = (items) => {
    return items.reduce((acc, item) => {
      const milestoneName = milestoneNames[item.milestone_id] || "Unknown Milestone";
      if (!acc[milestoneName]) {
        acc[milestoneName] = [];
      }
      acc[milestoneName].push(item);
      return acc;
    }, {});
  };

  // Filter and sort data
  const openTestRuns = filterAndSort(testRuns.filter(run => !run.is_complete));
  const completedTestRuns = filterAndSort(testRuns.filter(run => run.is_complete));
  const openTestPlans = filterAndSort(testPlans.filter(plan => !plan.is_complete));
  const completedTestPlans = filterAndSort(testPlans.filter(plan => plan.is_complete));

  const groupedOpenTestRuns = groupByMilestone(openTestRuns);
  const groupedCompletedTestRuns = groupByMilestone(completedTestRuns);
  const groupedOpenTestPlans = groupByMilestone(openTestPlans);
  const groupedCompletedTestPlans = groupByMilestone(completedTestPlans);

  // Helper function to calculate percentages
  const calculatePercentage = (part, total) => total ? ((part / total) * 100).toFixed(0) : '0';

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
            <button className="test-runs-results-delete-button" onClick={handleDeleteSelected}> - Delete Selected</button>
          </div>
        </div>
        <p><strong>{openTestRuns.length + openTestPlans.length}</strong> open and <strong>{completedTestRuns.length + completedTestPlans.length}</strong> completed test runs/plans in this project</p>
      </div>

      <div className='test-run-results-listing'>
        <div className='test-run-results'>
          <h3 className='test-run-results-heading'> Open</h3>
          <div className='test-run-results-scrollable'>
            {Object.keys(groupedOpenTestRuns).concat(Object.keys(groupedOpenTestPlans)).filter((value, index, self) => self.indexOf(value) === index).map(milestone => (
              <div key={milestone}>
                <h4 className="test-run-result-milestone-name">{milestone}</h4>

                {groupedOpenTestRuns[milestone] && groupedOpenTestRuns[milestone].length > 0 && groupedOpenTestRuns[milestone].map(run => (
                  <div key={run.test_run_id} className="test-run-results-details">
                    <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} />
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong><a href={`/TestRunTestsResults`}>{run.name}</a></strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
                    <div className="test-run-results-statusbar">
                      <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
                    </div>
                    <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
                  </div>
                ))}

                {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].length > 0 && groupedOpenTestPlans[milestone].map(plan => (
                  <div key={plan.test_plan_id} className="test-run-results-details">
                    <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
                    <p className="test-suite-indicator">Test Plan</p>
                    <p><strong>{plan.name}</strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
                    <div className="test-run-results-statusbar">
                      <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
                    </div>
                    <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className='test-run-results'>
          <h3 className='test-run-results-heading'>Completion Pending</h3>
          <div className='test-run-results-scrollable'>
            {Object.keys(groupedOpenTestRuns).concat(Object.keys(groupedOpenTestPlans))
              .filter((value, index, self) => self.indexOf(value) === index) // Ensures unique milestones
              .map(milestone => (
                <div key={milestone}>
                  <h4 className="test-run-result-milestone-name">{milestone}</h4>

                  {groupedOpenTestRuns[milestone] && groupedOpenTestRuns[milestone].length > 0 && groupedOpenTestRuns[milestone].map(run => (
                    <div key={run.test_run_id} className="test-run-results-details">
                      <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} />
                      <p className="test-run-indicator">Test Run</p>
                      <p><strong><a href={`/TestRunTestsResults`}>{run.name}</a></strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
                      <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
                      </div>
                      <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
                    </div>
                  ))}

                  {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].length > 0 && groupedOpenTestPlans[milestone].map(plan => (
                    <div key={plan.test_plan_id} className="test-run-results-details">
                      <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
                      <p className="test-suite-indicator">Test Plan</p>
                      <p><strong>{plan.name}</strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
                      <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
                      </div>
                      <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className='test-run-results'>
          <h3 className='test-run-results-heading'> Completed</h3>
          <div className='test-run-results-scrollable'>
            {Object.keys(groupedCompletedTestRuns).map(milestone => (
              <div key={milestone}>
                <h4 className="test-run-result-milestone-name">{milestone}</h4>
                {groupedCompletedTestRuns[milestone].map(run => (
                  <div key={run.test_run_id} className="test-run-results-details">
                    {/* <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} /> */}
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong>{run.name}</strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
                    <div className="test-run-results-statusbar">
                      <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
                    </div>
                    <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
                  </div>
                ))}
                {groupedCompletedTestPlans[milestone] && groupedCompletedTestPlans[milestone].map(plan => (
                  <div key={plan.test_plan_id} className="test-run-results-details">
                    {/* <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} /> */}
                    <p className="test-suite-indicator">Test Plan</p>
                    <p><strong>{plan.name}</strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
                    <div className="test-run-results-statusbar">
                      <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
                    </div>
                    <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRuns;
