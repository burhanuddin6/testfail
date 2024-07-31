import "../styles/MilestonesProgress.css"
import React, { useState } from 'react';
import Graph from "../components/OverviewGraph";
import { useNavigate } from 'react-router-dom';

const Milestonesprogress = () => {
    const navigate = useNavigate();
    const handleEditMilestone = () => {
        navigate(`/add-milestone`, { state: { from: '/milestone-progress' , action: 'edit'} });
      };

    return (
        <div className="progress-mainclass">
            <div className="progress-header">
                <div className="progress-options">
                    <a href="/milestone-status">Status</a>
                    <a href="/milestone-activity">Activity</a>
                    <a href="/milestone-progress">Progress</a>
                    <a href="/milestone-defect">Defects</a>
                </div>
               
                <div className="progress-controls">
                    <h3> Milestone Name </h3>
                    <div className="progress-control-button">
                        <button onClick={handleEditMilestone}>Edit</button>
                    </div>
                </div>
            </div>

            <div className="progress-details">
                <div className="progress-details-chart">
                    <div className="progress-chart-download">
                        <button className="download-csv">Download CSV</button>
                        <button className="download-img">Download Image</button>
                    </div>
                    <Graph/>
                </div>
                <div className="progress-details-legend">
                    <div className="progress-legend-item">
                        <div className="progress-legend-color" style={{ backgroundColor: 'green' }}></div>
                        <span className="progress-legend-text"><strong>Remaining Tests</strong><br></br>52% of tests completed</span>
                    </div>
                    <div className="progress-legend-item">
                        <div className="progress-legend-color" style={{ backgroundColor: 'red' }}></div>
                        <span className="progress-legend-text"><strong>Remaining Effort</strong><br></br>Forecast not available</span>
                    </div>
                    <div className="progress-legend-item">
                        <div className="progress-legend-color" style={{ backgroundColor: 'blue' }}></div>
                        <span className="progress-legend-text"><strong>Ideal Progress</strong><br></br>Forecast not available</span>
                    </div>
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

                <hr></hr>
                
                <div className="progress-details-section">
                    <div className="progress-expected-date-info">
                        <p>This milestone was started <strong>9 weeks ago</strong> (5/29/2024)</p>
                    </div>
                    <div className="progress-expected-date">
                        <p> Completed: 5% (205/3491) <br></br> Elapsed: 0h 0m <br></br> Tests / day: 3 <br></br> Hours / day: n/a </p>
                    </div>
                </div>
                
                <hr></hr>

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

            <h3> Test Runs </h3>
            <div className="progress-testrun-class">
                
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
                <div className="progress-testrun-details">
                    <p>Test run name</p>
                    <div className="progress-testrun-forecast">
                        <p>Forecast</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Milestonesprogress;

