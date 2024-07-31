import React from 'react';
import { useNavigate } from 'react-router-dom';
import Graph from "../components/OverviewGraph";
import "../styles/MilestonesActivity.css";

const MilestonesActivity = () => {
    const navigate = useNavigate();
    

    const handleEditMilestone = (name) => {
        navigate(`/add-milestone`, { state: { from: '/milestone-activity', action: 'edit'} });
    };

    return (
        <div className="activity-mainclass">
            <div className="activity-header">
                <div className="activity-options">
                    <a href="/milestone-status">Status</a>
                    <a href="/milestone-activity">Activity</a>
                    <a href="/milestone-progress">Progress</a>
                    <a href="/milestone-defect">Defects</a>
                </div>
               
                <div className="activity-controls">
                    <h2>Milestone Name</h2>
                    <div className="activity-control-button">
                        <button onClick={handleEditMilestone}>Edit</button>
                    </div>
                </div> 
            </div>

            <div className="activity-details">
                <div className="activity-details-chart">
                    <div className="activity-chart-download">
                        <button className="download-csv">Download CSV</button>
                        <button className="download-img">Download Image</button>
                    </div>
                    <Graph/>
                </div>
                <div className="activity-details-legend">
                    <div className="activity-legend-item">
                        <div className="activity-legend-color" style={{ backgroundColor: 'green' }}></div>
                        <span className="activity-legend-text">1146 Passed</span>
                    </div>
                    <div className="activity-legend-item">
                        <div className="activity-legend-color" style={{ backgroundColor: 'red' }}></div>
                        <span className="activity-legend-text">7 Blocked</span>
                    </div>
                    <div className="activity-legend-item">
                        <div className="activity-legend-color" style={{ backgroundColor: 'blue' }}></div>
                        <span className="activity-legend-text">2 Retest</span>
                    </div>
                    <div className="activity-legend-item">
                        <div className="activity-legend-color" style={{ backgroundColor: 'orange' }}></div>
                        <span className="activity-legend-text">22 Failed</span>
                    </div>
                    <div className="activity-legend-item">
                        <div className="activity-legend-color" style={{ backgroundColor: 'grey' }}></div>
                        <span className="activity-legend-text">3 Comments</span>
                    </div>
                    <div className="activity-legend-item">
                        <div className="activity-legend-color" style={{ backgroundColor: 'yellow' }}></div>
                        <span className="activity-legend-text">34 Partial</span>
                    </div>
                </div>
            </div>

            <div className="activity-listing-header">
                <h2>Activity</h2>
            </div>

            <div className="activity-milestones-details-class">
                <div className="activity-milestones-date">21 July 2024</div>
                <div className="activity-milestones-details">
                    <p className="activity-pass-status">Passed</p>
                    <p className="activity-details-listing">Activity Details</p>
                    <div className="activity-milestone-doneby">
                        Tested By
                    </div>
                </div>
                <div className="activity-milestones-details">
                    <p className="activity-fail-status">Failed</p>
                    <p className="activity-details-listing">Activity Details</p>
                    <div className="activity-milestone-doneby">
                        Tested By
                    </div>
                </div>

                <div className="activity-milestones-date">20 July 2024</div>
                <div className="activity-milestones-details">
                    <p className="activity-fail-status">Failed</p>
                    <p className="activity-details-listing">Activity Details</p>
                    <div className="activity-milestone-doneby">
                        Tested By
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilestonesActivity;
