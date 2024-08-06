// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/TestRuns.css";
// import Popup from "./selectSuite";
// import { fetchTestRuns } from "../api/TestRun";
// import { fetchTestPlans } from "../api/TestPlan";
// import { deleteTestPlan } from "../api/TestPlan"; // Make sure to import your delete functions
// import { deleteTestRun } from "../api/TestRun";
// import { getProjectID } from '../utilities/globals';

// const TestRuns = () => {
//   const navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [testRuns, setTestRuns] = useState([]);
//   const [testPlans, setTestPlans] = useState([]);
//   const [selectedItems, setSelectedItems] = useState(new Set()); // State to track selected items
//   const projectID = getProjectID();

//   // Function to filter and sort items
//   const filterAndSort = (items) => {
//     return items.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
//   };

//   useEffect(() => {
//     const getTestRuns = async () => {
//       try {
//         const data = await fetchTestRuns(projectID);
//         setTestRuns(data);
//       } catch (error) {
//         console.error("Failed to fetch test runs", error);
//       }
//     };

//     const getTestPlans = async () => {
//       try {
//         const data = await fetchTestPlans(projectID);
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
//         // navigate('/add-test-run', { state: { from: '/testruns', selectedOption } });
//         navigate('/add-test-run?source=TestRuns', { state: { from: '/testruns', selectedOption } });
//         setIsPopupVisible(false);
//       }
//     }
//   };

//   const handleAddTestPlan = (e) => {
//     e.preventDefault();
//     navigate('/add-test-plan', { state: { from: '/testruns' } });
//   };

//   const handleSelectItem = (id, type) => {
//     setSelectedItems(prev => {
//       const updated = new Set(prev);
//       const key = `${type}_${id}`;
//       if (updated.has(key)) {
//         updated.delete(key);
//       } else {
//         updated.add(key);
//       }
//       return updated;
//     });
//   };

//   const handleDeleteSelected = async () => {
//     const testRunsToDelete = [];
//     const testPlansToDelete = [];

//     selectedItems.forEach(item => {
//       const [type, id] = item.split('_');
//       if (type === 'run') {
//         testRunsToDelete.push(id);
//       } else if (type === 'plan') {
//         testPlansToDelete.push(id);
//       }
//     });

//     // Delete test runs
//     for (const id of testRunsToDelete) {
//       try {
//         await deleteTestRun(id);
//         console.log(`Deleted test run with id: ${id}`);
//       } catch (error) {
//         console.error(`Failed to delete test run with id: ${id}`, error);
//       }
//     }

//     // Delete test plans
//     for (const id of testPlansToDelete) {
//       try {
//         await deleteTestPlan(id);
//         console.log(`Deleted test plan with id: ${id}`);
//       } catch (error) {
//         console.error(`Failed to delete test plan with id: ${id}`, error);
//       }
//     }

    
//     const [dataRuns, dataPlans] = await Promise.all([
//       fetchTestRuns(projectID),
//       fetchTestPlans(projectID),
//     ]);
//     setTestRuns(dataRuns);
//     setTestPlans(dataPlans);

//     // Clear selected items
//     setSelectedItems({ runs: [], plans: [] });
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
//   const groupedCompletedTestRuns = groupByMilestone(completedTestRuns);
//   const groupedOpenTestPlans = groupByMilestone(openTestPlans);
//   const groupedCompletedTestPlans = groupByMilestone(completedTestPlans);

//   // Helper function to calculate percentages
//   const calculatePercentage = (part, total) => total ? ((part / total) * 100).toFixed(0) : '0';

//   return (
//     <div className="test-runs-results-page">
      
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
//             <button className="test-runs-results-delete-button" onClick={handleDeleteSelected}> - Delete Selected</button>
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
//                     <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} />
//                     <p className="test-run-indicator">Test Run</p>
//                     <p><strong><a href={`/TestRunTestsResults`}>{run.name}</a></strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
//                     <div className="test-run-results-statusbar">
//                       <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
//                       <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
//                     </div>
//                     <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
//                   </div>
//                 ))}

//                 {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].length > 0 && groupedOpenTestPlans[milestone].map(plan => (
                  // <div key={plan.test_plan_id} className="test-run-results-details">
                  //   <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
                  //   <p className="test-suite-indicator">Test Plan</p>
                  //   <p><strong>{plan.name}</strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
                  //   <div className="test-run-results-statusbar">
                  //     <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
                  //     <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
                  //     <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
                  //   </div>
                  //   <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
                  // </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className='test-run-results'>
//           <h3 className='test-run-results-heading'>Completion Pending</h3>
//           <div className='test-run-results-scrollable'>
//             {Object.keys(groupedOpenTestRuns).concat(Object.keys(groupedOpenTestPlans))
//               .filter((value, index, self) => self.indexOf(value) === index) // Ensures unique milestones
//               .map(milestone => (
//                 <div key={milestone}>
//                   <h4 className="test-run-result-milestone-name">{milestone}</h4>

//                   {groupedOpenTestRuns[milestone] && groupedOpenTestRuns[milestone].length > 0 && groupedOpenTestRuns[milestone].map(run => (
//                     <div key={run.test_run_id} className="test-run-results-details">
//                       <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} />
//                       <p className="test-run-indicator">Test Run</p>
//                       <p><strong><a href={`/TestRunTestsResults`}>{run.name}</a></strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
//                       <div className="test-run-results-statusbar">
//                         <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
//                         <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
//                         <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div>
//                       </div>
//                       <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
//                     </div>
//                   ))}

//                   {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].length > 0 && groupedOpenTestPlans[milestone].map(plan => (
//                     <div key={plan.test_plan_id} className="test-run-results-details">
//                       <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
//                       <p className="test-suite-indicator">Test Plan</p>
//                       <p><strong>{plan.name}</strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
//                       <div className="test-run-results-statusbar">
//                         <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                         <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
//                         <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
//                       </div>
//                       <div className="test-run-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//           </div>
//         </div>

//         <div className='test-run-results'>
//           <h3 className='test-run-results-heading'> Completed</h3>
//           <div className='test-run-results-scrollable'>
//             {Object.keys(groupedCompletedTestRuns).map(milestone => (
//               <div key={milestone}>
//                 <h4 className="test-run-result-milestone-name">{milestone}</h4>
//                 {groupedCompletedTestRuns[milestone].map(run => (
//                   <div key={run.test_run_id} className="test-run-results-details">
//                     {/* <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} /> */}
//                     <p className="test-run-indicator">Test Run</p>
//                     <p><strong>{run.name}</strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.created_on).toLocaleDateString()}<br />{run.number_of_passed_test_cases} Passed, {run.number_of_blocked_test_cases} Blocked, {run.number_of_untested_test_cases} Untested, {run.number_of_partial_test_cases} Partial, {run.number_of_failed_test_cases} Failed</p>
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
//                     {/* <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} /> */}
//                     <p className="test-suite-indicator">Test Plan</p>
//                     <p><strong>{plan.name}</strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
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
    setSelectedItems(new Set());
  };

  // Group by milestone
  const groupByMilestone = (items) => {
    const milestoneGroups = items.reduce((acc, item) => {
      const milestoneName = item.milestone_info ? item.milestone_info.name : "Undecided";
      if (!acc[milestoneName]) {
        acc[milestoneName] = [];
      }
      acc[milestoneName].push(item);
      return acc;
    }, {});

    // Sort milestones alphabetically
    return Object.keys(milestoneGroups).sort().reduce((sortedAcc, key) => {
      sortedAcc[key] = milestoneGroups[key];
      return sortedAcc;
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
    <div className="test-runs-results-page">
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
            {Object.keys(groupedOpenTestRuns).map(milestone => (
              <div key={milestone}>
                <h4 className="test-run-result-milestone-name">{milestone}</h4>

                {groupedOpenTestRuns[milestone] && groupedOpenTestRuns[milestone].map(run => (
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

                {groupedOpenTestPlans[milestone] && groupedOpenTestPlans[milestone].map(plan => (
                  // <div key={plan.test_plan_id} className="test-run-results-details">
                  //   <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
                  //   <p className="test-plan-indicator">Test Plan</p>
                  //   <p><strong><a href={`/TestPlanTestsResults`}>{plan.name}</a></strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_test_cases} Total</p>
                  //   <div className="test-plan-results-statusbar">
                  //     <div className="test-plan-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
                  //     <div className="test-plan-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
                  //     <div className="test-plan-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div>
                  //   </div>
                  //   <div className="test-plan-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
                  // </div>
                  <div key={plan.test_plan_id} className="test-run-results-details">
                    <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
                    <p className="test-suite-indicator">Test Plan</p>
                    <p><strong><a href={``}>{plan.name}</a></strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.created_on).toLocaleDateString()}<br />{plan.number_of_passed_test_cases} Passed, {plan.number_of_blocked_test_cases} Blocked, {plan.number_of_untested_test_cases} Untested, {plan.number_of_partial_test_cases} Partial, {plan.number_of_failed_test_cases} Failed</p>
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

                {groupedCompletedTestRuns[milestone] && groupedCompletedTestRuns[milestone].map(run => (
                  <div key={run.test_run_id} className="test-run-results-details">
                    <input type="checkbox" onChange={() => handleSelectItem(run.test_run_id, 'run')} />
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong><a href={`/TestRunTestsResults`}>{run.name}</a></strong><br />By {run.created_by_info.first_name} {run.created_by_info.last_name} on {new Date(run.completed_on).toLocaleDateString()}</p>
                    <div className="test-run-results-statusbar">
                      {/* <div className="test-run-results-progress-bar-passes" style={{ width: `${calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-untested" style={{ width: `${calculatePercentage(run.number_of_untested_test_cases, run.number_of_test_cases)}%` }}></div>
                      <div className="test-run-results-progress-bar-failed" style={{ width: `${calculatePercentage(run.number_of_failed_test_cases, run.number_of_test_cases)}%` }}></div> */}
                    </div>
                    <div className="test-run-results-progress-value">{calculatePercentage(run.number_of_passed_test_cases, run.number_of_test_cases)}%</div>
                  </div>
                ))}

                {groupedCompletedTestPlans[milestone] && groupedCompletedTestPlans[milestone].map(plan => (
                  <div key={plan.test_plan_id} className="test-run-results-details">
                    <input type="checkbox" onChange={() => handleSelectItem(plan.test_plan_id, 'plan')} />
                    <p className="test-plan-indicator">Test Plan</p>
                    <p><strong><a href={`/TestPlanTestsResults`}>{plan.name}</a></strong><br />By {plan.created_by_info.first_name} {plan.created_by_info.last_name} on {new Date(plan.completed_on).toLocaleDateString()}</p>
                    <div className="test-plan-results-statusbar">
                      {/* <div className="test-plan-results-progress-bar-passes" style={{ width: `${calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%` }}></div>
                      <div className="test-plan-results-progress-bar-untested" style={{ width: `${calculatePercentage(plan.number_of_untested_test_cases, plan.number_of_test_cases)}%` }}></div>
                      <div className="test-plan-results-progress-bar-failed" style={{ width: `${calculatePercentage(plan.number_of_failed_test_cases, plan.number_of_test_cases)}%` }}></div> */}
                    </div>
                    <div className="test-plan-results-progress-value">{calculatePercentage(plan.number_of_passed_test_cases, plan.number_of_test_cases)}%</div>
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
