// import "../styles/MilestonesProgress.css"
// import React from 'react';
// import Graph from "../components/OverviewGraph";
// import { useLocation, useNavigate } from "react-router-dom";

// const MilestonesProgress = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const testRunId = searchParams.get("testRunId") || "0"; 
//     const testRunName = searchParams.get("testRunName") || "Test Run";
//     const sourcePage = searchParams.get('source');

//     const suiteId = searchParams.get('suiteId') || '0';
//     const suiteName = searchParams.get('suite') || 'Suite Name';

//     const milestoneId = searchParams.get('milestoneId') || '0'; 
//   const milestoneName = searchParams.get('milestoneName') || 'Milestone'; 

//   const testPlanId = searchParams.get("testPlanId") || "0"; 
//   const testPlanName = searchParams.get("testPlanName") || "Test Plan";

//     const handleEditMilestone = () => {
//         navigate(`/add-milestone?milestoneId=${milestoneId}&milestoneName=${milestoneName}`, { state: { from: `/milestone-progress?milestoneId=${milestoneId}&milestoneName=${milestoneName}&source=milestone-status` , action: 'edit'} });
//     };

//     return (
//         <div className="progress-mainclass">
//             <div className="progress-header">
//             <div className="activity-options">
//                     {sourcePage === 'TestRunTestsResults' || sourcePage === 'milestone-activity' || sourcePage === 'milestone-progress' || sourcePage === 'milestone-defect' ? (
//                         <>
//                             <a
//                                 href={`/TestRunTestsResults?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}`}
                                
//                             >
//                                 Tests & Results
//                             </a>
//                             <a
//                                 href={`/milestone-activity?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&source=milestone-progress`}
                                
//                             >
//                                 Activity
//                             </a>
//                             <a className="upperbar"
//                                 href={`/milestone-progress?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&source=milestone-progress`}
    
//                             >
//                                 Progress
//                             </a>
//                             <a
//                                 href={`/milestone-defect?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&source=milestone-progress`}
                                
//                             >
//                                 Defects
//                             </a>
//                         </>
//                     ) :   sourcePage === 'milestone-status' ? (
//                         <>
//                             <a href={`/milestone-status?milestoneId=${milestoneId}&milestoneName=${milestoneName}`}>Status</a>
//                             <a href={`/milestone-activity?milestoneId=${milestoneId}&milestoneName=${milestoneName}&source=milestone-status`}>Activity</a>
//                             <a className="upperbar" href={`/milestone-progress?milestoneId=${milestoneId}&milestoneName=${milestoneName}&source=milestone-status`}>Progress</a>
//                             <a href={`/milestone-defect?milestoneId=${milestoneId}&milestoneName=${milestoneName}&source=milestone-status`}>Defects</a>
//                         </>
//                     ) : sourcePage === 'TestPlanStatus' ? (
//                         <>
//                         <a
//                                 href={`/TestPlanStatus?testPlanId=${testPlanId}&testPlanName=${testPlanName}`}
                                
//                             >
//                                 Status
//                             </a>
//                             <a
//                                 href={`/milestone-activity?testPlanId=${testPlanId}&testPlanName=${testPlanName}&source=TestPlanStatus`}
                                
//                             >
//                                 Activity
//                             </a>
//                             <a className="upperbar"
//                                 href={`/milestone-progress?testPlanId=${testPlanId}&testPlanName=${testPlanName}&source=TestPlanStatus`}
//                             >
//                                 Progress
//                             </a>
//                             <a
//                                href={`/milestone-defect?testPlanId=${testPlanId}&testPlanName=${testPlanName}&source=TestPlanStatus`}
                                
//                             >
//                                 Defects
//                             </a>
//                         </>
                        
//                     ) : null }
//                 </div>
               
//                 <div className="progress-controls">
//                     {sourcePage === 'TestRunTestsResults' || sourcePage === 'milestone-activity' || sourcePage === 'milestone-progress' || sourcePage === 'milestone-defect' ? (
//                         <h2>{`R${testRunId} - ${testRunName}`}</h2>
//                     ) : sourcePage === 'milestone-status' ? (
//                         <h2>{`M${milestoneId} - ${milestoneName}`}</h2>
//                     ) : sourcePage === 'TestPlanStatus' ? (
//                         <h2>{`R${testPlanId} - ${testPlanName}`}</h2>
//                     ) : null }
//                     <div className="progress-control-button">
//                         <button className="milestone-button" onClick={handleEditMilestone}>Edit</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="progress-details">
//                 <div className="progress-details-chart">
//                     <div className="progress-chart-download">
//                         <button className="download">Download CSV</button>
//                         <button className="download">Download Image</button>
//                     </div>
//                     <Graph/>
//                 </div>
//                 <div className="progress-details-legend">
//                     <div className="progress-legend-item">
//                         <div className="progress-legend-color" style={{ backgroundColor: 'green' }}></div>
//                         <span className="progress-legend-text"><strong>Remaining Tests</strong><br />52% of tests completed</span>
//                     </div>
//                     <div className="progress-legend-item">
//                         <div className="progress-legend-color" style={{ backgroundColor: 'red' }}></div>
//                         <span className="progress-legend-text"><strong>Remaining Effort</strong><br />Forecast not available</span>
//                     </div>
//                     <div className="progress-legend-item">
//                         <div className="progress-legend-color" style={{ backgroundColor: 'blue' }}></div>
//                         <span className="progress-legend-text"><strong>Ideal Progress</strong><br />Forecast not available</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="progress-details-header">
//                 <h3> Progress </h3>
//             </div>

//             <div className="progress-details-class">
//                 <div className="progress-details-section">
//                     <div className="progress-expected-date-info">
//                         <p>Based on the current activity and forecasts, the projected completion date for this milestone is:</p>
//                     </div>
//                     <div className="progress-expected-date">
//                         <p className="progress-date"><strong>Unknown</strong></p>
//                         <p className="progress-date-details">Forecast not possible, more data needed</p>
//                     </div>
//                 </div>

//                 <hr />
                
//                 <div className="progress-details-section">
//                     <div className="progress-expected-date-info">
//                         <p>This milestone was started <strong>9 weeks ago</strong> (5/29/2024)</p>
//                     </div>
//                     <div className="progress-expected-date">
//                         <p> Completed: 5% (205/3491) <br /> Elapsed: 0h 0m <br /> Tests / day: 3 <br /> Hours / day: n/a </p>
//                     </div>
//                 </div>
                
//                 <hr />

//                 <div className="progress-details-section">
//                     <table className="progress-table">
//                         <tbody>
//                             <tr>
//                                 <th>Metric</th>
//                                 <th>By Estimate</th>
//                                 <th>By Forecast</th>
//                             </tr>
//                             <tr>
//                                 <td>Completed</td>
//                                 <td>0h 0m</td>
//                                 <td>n/a</td>
//                             </tr>
//                             <tr>
//                                 <td>To-do</td>
//                                 <td>0h 0m</td>
//                                 <td>n/a</td>
//                             </tr>
//                             <tr>
//                                 <td>Total</td>
//                                 <td>0h 0m</td>
//                                 <td>n/a</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {sourcePage !== 'TestRunTestsResults' && sourcePage !== 'milestone-activity' && sourcePage !== 'milestone-progress' && sourcePage !== 'milestone-defect' && (
//                 <>
//                     <h3> Test Runs </h3>
//                     <div className="progress-testrun-class">
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                         <div className="progress-testrun-details">
//                             <p>Test run name</p>
//                             <div className="progress-testrun-forecast">
//                                 <p>Forecast</p>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default MilestonesProgress;


import "../styles/MilestonesProgress.css";
import React, { useEffect, useState } from 'react';
import Graph from "../components/OverviewGraph";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTestRuns } from "../api/TestRun";

const MilestonesProgress = () => {
    const [testRuns, setTestRuns] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const testRunId = searchParams.get("testRunId") || "0";
    const testRunName = searchParams.get("testRunName") || "Test Run";
    const sourcePage = searchParams.get('source');
    const suiteId = searchParams.get('suiteId') || '0';
    const suiteName = searchParams.get('suite') || 'Suite Name';
    const milestoneId = searchParams.get('milestoneId') || '0';
    const milestoneName = searchParams.get('milestoneName') || 'Milestone';
    const testPlanId = searchParams.get("testPlanId") || "0";
    const testPlanName = searchParams.get("testPlanName") || "Test Plan";

    const handleEditMilestone = () => {
        navigate(`/add-milestone?milestoneId=${milestoneId}&milestoneName=${milestoneName}`, {
            state: {
                from: `/milestone-progress?milestoneId=${milestoneId}&milestoneName=${milestoneName}&source=milestone-status`,
                action: 'edit'
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch test runs related to the milestone
                const response = await fetchTestRuns('', '', milestoneId);
                setTestRuns(response);
            } catch (error) {
                console.error('Failed to fetch test runs:', error);
                // Handle the error as needed
            }
        };

        fetchData();
    }, [milestoneId]);

    return (
        <div className="progress-mainclass">
            <div className="progress-header">
                <div className="activity-options">
                    {/* Existing options code here */}
                </div>

                <div className="progress-controls">
                    {sourcePage === 'TestRunTestsResults' || sourcePage === 'milestone-activity' || sourcePage === 'milestone-progress' || sourcePage === 'milestone-defect' ? (
                        <h2>{`R${testRunId} - ${testRunName}`}</h2>
                    ) : sourcePage === 'milestone-status' ? (
                        <h2>{`M${milestoneId} - ${milestoneName}`}</h2>
                    ) : sourcePage === 'TestPlanStatus' ? (
                        <h2>{`R${testPlanId} - ${testPlanName}`}</h2>
                    ) : null}
                    <div className="progress-control-button">
                        <button className="milestone-button" onClick={handleEditMilestone}>Edit</button>
                    </div>
                </div>
            </div>

            <div className="progress-details">
                <div className="progress-details-chart">
                    <div className="progress-chart-download">
                        <button className="download">Download CSV</button>
                        <button className="download">Download Image</button>
                    </div>
                    <Graph />
                </div>
                <div className="progress-details-legend">
                    {/* Existing legend code here */}
                </div>
            </div>

            <div className="progress-details-header">
                <h3> Progress </h3>
            </div>

            <div className="progress-details-class">
                <div className="progress-details-section">
                    <div className="progress-expected-date-info">
                        <p>Based on the current activity and forecasts, the projected completion date for this milestone is:</p>
                    </div>
                    <div className="progress-expected-date">
                        <p className="progress-date"><strong>Unknown</strong></p>
                        <p className="progress-date-details">Forecast not possible, more data needed</p>
                    </div>
                </div>

                <hr />

                <div className="progress-details-section">
                    <div className="progress-expected-date-info">
                        <p>This milestone was started <strong>9 weeks ago</strong> (5/29/2024)</p>
                    </div>
                    <div className="progress-expected-date">
                        <p> Completed: 5% (205/3491) <br /> Elapsed: 0h 0m <br /> Tests / day: 3 <br /> Hours / day: n/a </p>
                    </div>
                </div>

                <hr />

                <div className="progress-details-section">
                    <table className="progress-table">
                        <tbody>
                            <tr>
                                <th>Metric</th>
                                <th>By Estimate</th>
                                <th>By Forecast</th>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>0h 0m</td>
                                <td>n/a</td>
                            </tr>
                            <tr>
                                <td>To-do</td>
                                <td>0h 0m</td>
                                <td>n/a</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>0h 0m</td>
                                <td>n/a</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {sourcePage !== 'TestRunTestsResults' && sourcePage !== 'milestone-activity' && sourcePage !== 'milestone-progress' && sourcePage !== 'milestone-defect' && (
                <>
                    <h3> Test Runs </h3>
                    <div className="progress-testrun-class">
                        {testRuns.length > 0 ? testRuns.map((testRun, index) => (
                            <div key={index} className="progress-testrun-details">
                                <p>{testRun.name}</p>
                                <div className="progress-testrun-forecast">
                                    <p>{testRun.is_complete ? `Completed on ${testRun.completed_on}` : 'Forecast n/a'}</p>
                                </div>
                            </div>
                        )) : (
                            <p>No test runs available.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MilestonesProgress;

