import "../styles/MilestonesDefect.css"
import React, { useState } from 'react';

const Milestonesdefects = () => {
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
                        <button >Edit</button>
                    </div>
                </div>
            </div>

            <div className="defects-details">
                <div className="defects-details-number">
                    number of defects
                </div>
                <div className="defects-details-chart">
                    chart
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
            </div>

            <div className="defects-details-header">
                <h3> Defects </h3>
            </div>

            <div className="defects-details-class">
                <div className="defects-date">
                    <p>20 July 2024</p>
                    <div className="defects-details-individual">
                        <p className="defects-status-bar-failed">failed</p>
                        <p>defects name</p>
                        <div className="defects-doneby">
                            <p>Added by</p>
                        </div>
                    </div>
                    <div className="defects-details-individual">
                        <p className="defects-status-bar-failed">failed</p>
                        <p>defects name</p>
                        <div className="defects-doneby">
                            <p>Added by</p>
                        </div>
                    </div>
                </div>
                <div className="defects-date">
                    <p>19 July 2024</p>
                    <div className="defects-details-individual">
                        <p className="defects-status-bar-failed">failed</p>
                        <p>defects name</p>
                        <div className="defects-doneby">
                            <p>Added by</p>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default Milestonesdefects;

