import "../styles/MilestonesActivity.css"
import React, { useState } from 'react';

const Milestonesactivity = () => {
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
                    <h3> Milestone Name </h3>
                    <div className="activity-control-button">
                        <button >Edit</button>
                    </div>
                </div>
            </div>

            <div className="activity-details">
                <div className="activity-details-chart">
                    chart
                </div>
                <div className="activity-details-label">
                    label
                </div>
            </div>

            
            <div className="activity-details-header">
                <h3> Activity </h3>
            </div>

            <div className="activity-details-class">
                <div className="activity-date">
                    <p>20 July 2024</p>
                    <div className="activity-details-individual">
                        <p className="activity-status-bar-passed">passed</p>
                        <p>activity name</p>
                        <div className="activity-doneby">
                            <p>passed by ..</p>
                        </div>
                    </div>
                </div>
                <div className="activity-date">
                    <p>19 July 2024</p>
                    <div className="activity-details-individual">
                        <p className="activity-status-bar-failed">failed</p>
                        <p>activity name</p>
                        <div className="activity-doneby">
                            <p>failed by ..</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Milestonesactivity;

