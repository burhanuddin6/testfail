// import Graph from "../components/OverviewGraph";
// import "../styles/MilestonesStatus.css"
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const MilestonesStatus = () => {
//     const navigate = useNavigate();
//     const handleEditMilestone = () => {
//         navigate(`/add-milestone`, { state: { from: '/milestone-status' , action: 'edit'} });
//       };

//     return (
//         <div className="status-mainclass">
//             <div className="status-header">
//                 <div className="status-options">
//                     <a href="/milestone-status">Status</a>
//                     <a href="/milestone-activity">Activity</a>
//                     <a href="/milestone-progress">Progress</a>
//                     <a href="/milestone-defect">Defects</a>
//                 </div>
               
//                 <div className="status-controls">
//                     <h2> Milestone Name </h2>
//                     <div className="status-control-button">
//                         <button >Export</button>
//                         <button >Print</button>
//                         <button onClick={handleEditMilestone}>Edit</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="status-details">
//                 <div className="status-details-chart">
//                     <div className="status-chart-download">
//                         <button className="download-csv">Download CSV</button>
//                         <button className="download-img">Download Image</button>
//                     </div>
//                     <Graph/>
//                 </div>
//                 <div className="status-details-percentage">
//                     <p className="status-passed-percent">52%</p>
//                     <p className="status-passed">passed</p>
//                     <p className="status-untested-value">1675 / 3518 untested (48%)</p>
//                 </div>
//             </div>

//             <div className="status-milestones-header">
//                 <h2> Milestones </h2>
//                 <div className="status-delete-milestones">
//                     <button > Delete Selected </button>
//                 </div>
//             </div>

//             <div className="status-milestones-details-class">
//                 <div className="status-milestones-details"> 
//                     <input type="checkbox"/>
//                     <p><strong>Milestone Name</strong><br></br>Due Date / Starts On</p>
//                     <div className="status-milestones-statusbar">
//                         <div className="status-milestones-progress-bar-passed" style={{ width: '42%' }}> </div>
//                         <div className="status-milestones-progress-bar-untested" style={{ width: '16%' }}> </div>
//                         <div className="status-milestones-progress-bar-failed" style={{ width: '42%' }}> </div>
//                     </div>
//                     <div className="status-milestones-progress-value">42%</div>
//                 </div>
//             </div>
            
//             <div className="status-testruns-header">
//                 <h2> Test Runs </h2>
//                 <div className="status-delete-testrun">
//                     <button > Delete Selected </button>
//                 </div>
//             </div>

//             <div className="status-testrun-details-class">
//                 <div className="status-testrun-details">
//                     <input type="checkbox"/>
//                     <p><strong><a
//                                 href={`/TestRunTestsResults`}
//                             >
//                                 Test Run Name
//                             </a></strong>by ... on ...<br></br></p>
//                     <div className="status-testrun-statusbar">
//                         <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}> </div>
//                         <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}> </div>
//                         <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}> </div>
//                     </div>
//                     <div className="status-testrun-progress-value">42%</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MilestonesStatus;

//updated integrated halfway mariam code
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Graph from "../components/OverviewGraph";
// import "../styles/MilestonesStatus.css";
// import { fetchTestRuns } from '../api/TestRun'; // Import the function
// import Alert from '../components/Alert'; // Import the Alert component

// const MilestonesStatus = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { children } = location.state || {}; // Get the passed data
//     const [testRuns, setTestRuns] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (children && children.length > 0) {
//             const parentId = children[0].parent_id; // Use the parent_id from the first child
//             const projectID = children[0].project_id; // Get project_id from the first child

//             const fetchAndSetTestRuns = async () => {
//                 try {
//                     const response = await fetchTestRuns(projectID, '', parentId);
//                     console.log("Fetched test runs:", response); // Log fetched data
                    
//                     // Ensure response is an array
//                     const activeTestRuns = Array.isArray(response) 
//                         ? response.filter(run => !run.is_complete) // Filter active test runs
//                         : [];

//                     setTestRuns(activeTestRuns);
//                     setError(null);
//                 } catch (error) {
//                     console.error('Error fetching test runs:', error); // Log error
//                     setError('Failed to fetch test runs. Please try again.');
//                 }
//             };

//             fetchAndSetTestRuns();
//         }
//     }, [children]);

//     const handleEditMilestone = () => {
//         navigate(`/add-milestone`, { state: { from: '/milestone-status', action: 'edit' } });
//     };

//     // Sort milestones by creation date (latest first)
//     const sortedMilestones = children
//         ? [...children].sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
//         : [];

//     return (
//         <div className="status-mainclass">
//             {error && <Alert message={error} type="error" />} {/* Show error if any */}
            
//             <div className="status-header">
//                 <div className="status-options">
//                     <a href="/milestone-status">Status</a>
//                     <a href="/milestone-activity">Activity</a>
//                     <a href="/milestone-progress">Progress</a>
//                     <a href="/milestone-defect">Defects</a>
//                 </div>
               
//                 <div className="status-controls">
//                     <h2> Milestone Name </h2>
//                     <div className="status-control-button">
//                         <button>Export</button>
//                         <button>Print</button>
//                         <button onClick={handleEditMilestone}>Edit</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="status-details">
//                 <div className="status-details-chart">
//                     <div className="status-chart-download">
//                         <button className="download-csv">Download CSV</button>
//                         <button className="download-img">Download Image</button>
//                     </div>
//                     <Graph/>
//                 </div>
//                 <div className="status-details-percentage">
//                     <p className="status-passed-percent">52%</p>
//                     <p className="status-passed">passed</p>
//                     <p className="status-untested-value">1675 / 3518 untested (48%)</p>
//                 </div>
//             </div>

//             {sortedMilestones.length > 0 && (
//                 <>
//                     <div className="status-milestones-header">
//                         <h2> Milestones </h2>
//                         <div className="status-delete-milestones">
//                             <button> Delete Selected </button>
//                         </div>
//                     </div>

//                     <div className="status-milestones-details-class">
//                         {sortedMilestones.map((milestone) => (
//                             <div className="status-milestones-details" key={milestone.id}>
//                                 <input type="checkbox"/>
//                                 <p><strong>{milestone.name}</strong><br/>Due Date / Starts On</p>
//                                 <div className="status-milestones-statusbar">
//                                     <div className="status-milestones-progress-bar-passed" style={{ width: '42%' }}></div>
//                                     <div className="status-milestones-progress-bar-untested" style={{ width: '16%' }}></div>
//                                     <div className="status-milestones-progress-bar-failed" style={{ width: '42%' }}></div>
//                                 </div>
//                                 <div className="status-milestones-progress-value">42%</div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             <div className="status-testruns-header">
//                 <h2> Test Runs </h2>
//                 <div className="status-delete-testrun">
//                     <button> Delete Selected </button>
//                 </div>
//             </div>

//             <div className="status-testrun-details-class">
//                 {testRuns.length > 0 ? (
//                     testRuns.map((testRun) => (
//                         <div className="status-testrun-details" key={testRun.test_run_id}>
//                             <input type="checkbox"/>
//                             <p><strong><a href={`/TestRunTestsResults`}>{testRun.name}</a></strong> By {testRun.created_by_info.first_name} {testRun.created_by_info.last_name} on {new Date(testRun.created_on).toLocaleDateString()}<br/></p>
//                             <div className="status-testrun-statusbar">
//                                 <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}></div>
//                                 <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}></div>
//                                 <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}></div>
//                             </div>
//                             <div className="status-testrun-progress-value">42%</div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No active test runs in this milestone.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default MilestonesStatus;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Graph from "../components/OverviewGraph";
import "../styles/MilestonesStatus.css";
import { fetchTestRuns } from '../api/TestRun'; // Import the function
import Alert from '../components/Alert'; // Import the Alert component

const MilestonesStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { children } = location.state || {}; // Get the passed data
    const [testRuns, setTestRuns] = useState([]);
    const [completedMilestones, setCompletedMilestones] = useState([]);
    const [completedTestRuns, setCompletedTestRuns] = useState([]);
    const [openMilestones, setOpenMilestones] = useState([]);
    const [openTestRuns, setOpenTestRuns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (children && children.length > 0) {
                    const parentId = children[0].parent_id; // Use the parent_id from the first child
                    const projectID = children[0].project_id; // Get project_id from the first child

                    // Fetch test runs
                    const response = await fetchTestRuns(projectID, '', parentId);
                    console.log("Fetched test runs:", response); // Log fetched data

                    // Ensure response is an array
                    const activeTestRuns = Array.isArray(response)
                        ? response.filter(run => !run.is_complete) // Filter active test runs
                        : [];
                    
                    const completedRuns = Array.isArray(response)
                        ? response.filter(run => run.is_complete) // Filter completed test runs
                        : [];

                    setOpenTestRuns(activeTestRuns); // Update state for open test runs
                    setCompletedTestRuns(completedRuns); // Update state for completed test runs
                    setError(null);
                }

                if (children && children.length > 0) {
                    // Separate completed and open milestones
                    const open = children.filter(milestone => !milestone.is_complete)
                        .sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
                    const completed = children.filter(milestone => milestone.is_complete)
                        .sort((a, b) => new Date(b.completed_on) - new Date(a.completed_on));
                    
                    setOpenMilestones(open);
                    setCompletedMilestones(completed);
                }
            } catch (error) {
                console.error('Error fetching test runs:', error); // Log error
                setError('Failed to fetch test runs. Please try again.');
            }
        };

        fetchData();
    }, [children]); // Dependency on children to re-fetch data if it changes

    const handleEditMilestone = () => {
        navigate(`/add-milestone`, { state: { from: '/milestone-status', action: 'edit' } });
    };

    return (
        <div className="status-mainclass">
            {error && <Alert message={error} type="error" />} {/* Show error if any */}
            
            <div className="status-header">
                <div className="status-options">
                    <a href="/milestone-status">Status</a>
                    <a href="/milestone-activity">Activity</a>
                    <a href="/milestone-progress">Progress</a>
                    <a href="/milestone-defect">Defects</a>
                </div>
               
                <div className="status-controls">
                    <h2> Milestone Name </h2>
                    <div className="status-control-button">
                        <button>Export</button>
                        <button>Print</button>
                        <button onClick={handleEditMilestone}>Edit</button>
                    </div>
                </div>
            </div>

            <div className="status-details">
                <div className="status-details-chart">
                    <div className="status-chart-download">
                        <button className="download-csv">Download CSV</button>
                        <button className="download-img">Download Image</button>
                    </div>
                    <Graph/>
                </div>
                <div className="status-details-percentage">
                    <p className="status-passed-percent">52%</p>
                    <p className="status-passed">passed</p>
                    <p className="status-untested-value">1675 / 3518 untested (48%)</p>
                </div>
            </div>

            {openMilestones.length > 0 && (
                <>
                    <div className="status-milestones-header">
                        <h2> Milestones </h2>
                        <div className="status-delete-milestones">
                            <button> Delete Selected </button>
                        </div>
                    </div>

                    <div className="status-milestones-details-class">
                        {openMilestones.map((milestone) => (
                            <div className="status-milestones-details" key={milestone.id}>
                                <input type="checkbox"/>
                                <p>
                                    <strong>{milestone.name}</strong><br/>
                                    {milestone.start_date
                                        ? `Starts on ${new Date(milestone.start_date).toLocaleDateString()}`
                                        : milestone.end_date
                                        ? `Due Date ${new Date(milestone.end_date).toLocaleDateString()}`
                                        : "No due date"}
                                </p>
                                <div className="status-milestones-statusbar">
                                    <div className="status-milestones-progress-bar-passed" style={{ width: '42%' }}></div>
                                    <div className="status-milestones-progress-bar-untested" style={{ width: '16%' }}></div>
                                    <div className="status-milestones-progress-bar-failed" style={{ width: '42%' }}></div>
                                </div>
                                <div className="status-milestones-progress-value">42%</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {completedMilestones.length > 0 && (
                <div className="status-milestones-details-class" style={{ backgroundColor: 'transparent' }}>
                    <div className="status-milestones-header">
                        <h2> Completed </h2>
                    </div>
                    {completedMilestones.map((milestone) => (
                        <div className="status-milestones-details" key={milestone.id}>
                            <input type="checkbox"/>
                            <p>
                                <strong>{milestone.name}</strong><br/>
                                {milestone.completed_on 
                                    ? `Completed on ${new Date(milestone.completed_on).toLocaleDateString()}`
                                    : 'No completion date'}
                            </p>
                            <div className="status-milestones-statusbar">
                                <div className="status-milestones-progress-bar-passed" style={{ width: '42%' }}></div>
                                <div className="status-milestones-progress-bar-untested" style={{ width: '16%' }}></div>
                                <div className="status-milestones-progress-bar-failed" style={{ width: '42%' }}></div>
                            </div>
                            <div className="status-milestones-progress-value">42%</div>
                        </div>
                    ))}
                </div>
            )}

            <div className="status-testruns-header">
                <h2> Test Runs </h2>
                <div className="status-delete-testrun">
                    <button> Delete Selected </button>
                </div>
            </div>

            <div className="status-testrun-details-class">
                {openTestRuns.length > 0 ? (
                    openTestRuns.map((testRun) => (
                        <div className="status-testrun-details" key={testRun.test_run_id}>
                            <input type="checkbox"/>
                            <p>
                                <strong><a href={`/TestRunTestsResults`}>{testRun.name}</a></strong><br/>
                                By {testRun.created_by_info.first_name} {testRun.created_by_info.last_name} on {new Date(testRun.created_on).toLocaleDateString()}<br/>
                            </p>
                            <div className="status-testrun-statusbar">
                                <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}></div>
                                <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}></div>
                                <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}></div>
                            </div>
                            <div className="status-testrun-progress-value">42%</div>
                        </div>
                    ))
                ) : (
                    <p>No active test runs in this milestone</p>
                )}
            </div>

            {completedTestRuns.length > 0 && (
                <div className="status-testrun-details-class" style={{ backgroundColor: 'transparent' }}>
                    <div className="status-testruns-header">
                        <h2> Completed </h2>
                    </div>
                    {completedTestRuns.map((testRun) => (
                        <div className="status-testrun-details" key={testRun.test_run_id}>
                            <input type="checkbox"/>
                            <p>
                                <strong><a href={`/TestRunTestsResults`}>{testRun.name}</a></strong>
                                {testRun.completed_on 
                                    ? `Completed on ${new Date(testRun.completed_on).toLocaleDateString()}`
                                    : "No completion date"}
                            </p>
                            <div className="status-testrun-statusbar">
                                <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}></div>
                                <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}></div>
                                <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}></div>
                            </div>
                            <div className="status-testrun-progress-value">42%</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MilestonesStatus;

