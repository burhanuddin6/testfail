import "../styles/MilestonesDefect.css"
import React, { useState } from 'react';
import Graph from "../components/OverviewGraph";
import { useNavigate } from 'react-router-dom';

const Milestonesdefects = () => {

    const navigate = useNavigate();
    const handleEditMilestone = () => {
        navigate(`/add-milestone`, { state: { from: '/milestone-defect' , action: 'edit'} });
      };

    return (
        <div className="defects-mainclass">
            <div className="defects-header">
                <div className="defects-options">
                    <a href="/milestone-status">Status</a>
                    <a href="/milestone-activity">Activity</a>
                    <a href="/milestone-progress">Progress</a>
                    <a href="/milestone-defect">Defects</a>
                </div>
               
                <div className="defects-controls">
                    <h3> Milestone Name </h3>
                    <div className="defects-control-button">
                        <button onClick={handleEditMilestone}>Edit</button>
                    </div>
                </div>
            </div>

            <div className="defects-details">
                <div className="defects-details-number">
                    <h1 className="defects-count"><strong>4</strong></h1>
                    <p className="defects-title">Defects</p>
                </div>
                <div className="defects-details-chart">
                    <div className="defects-chart-download">
                        <button className="download-csv">Download CSV</button>
                        <button className="download-img">Download Image</button>
                    </div>
                    <Graph/>
                </div>
                <div className="defects-details-legend">
                    <div className="defects-legend-item">
                        <div className="defects-legend-color" style={{ backgroundColor: 'green' }}></div>
                        <span className="defects-legend-text"><strong>Tests</strong><br></br>3518 tests started</span>
                    </div>
                    <div className="defects-legend-item">
                        <div className="defects-legend-color" style={{ backgroundColor: 'red' }}></div>
                        <span className="defects-legend-text"><strong>Results</strong><br></br>800 test results added</span>
                    </div>
                    <div className="defects-legend-item">
                        <div className="defects-legend-color" style={{ backgroundColor: 'blue' }}></div>
                        <span className="defects-legend-text"><strong>Defects</strong><br></br>132 defects logged</span>
                    </div>
                </div>
            </div>

            <div className="defects-testrun-class">
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
                <div className="defects-testrun-details">
                    <p>Test run name</p>
                    <div className="defects-testrun-number">
                        <p>number of defects</p>
                    </div>
                </div>
            </div>

            <div className="defects-details-header">
                <h3> Defects </h3>
            </div>

            <div className="defects-details-class">
                <p className="defects-date"> 20 July 2024</p>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>

                <p className="defects-date">19 July 2024</p>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>

                <p className="defects-date"> 18 July 2024</p>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>

                <p className="defects-date">17 July 2024</p>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>

                <p className="defects-date"> 16 July 2024</p>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>

                <p className="defects-date">15 July 2024</p>
                <div className="defects-details-individual">
                    <p className="defects-status-bar-failed">failed</p>
                    <p className="defects-name">defects name</p>
                    <div className="defects-doneby">
                        <p>Added by</p>
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default Milestonesdefects;