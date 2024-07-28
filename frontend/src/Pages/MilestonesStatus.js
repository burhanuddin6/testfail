import "../styles/MilestonesStatus.css"
import React, { useState } from 'react';

const MilestonesStatus = () => {
    return (
        <div className="status-mainclass">
            <div className="status-header">
                <div className="status-options">
                    <a href="/milestone-status">Status</a>
                    <a href="/milestone-activity">Activity</a>
                    <a href="/milestone-progress">Progress</a>
                    <a href="/milestone-defect">Defects</a>
                </div>
               
                <div className="status-controls">
                    <h3> Milestone Name </h3>
                    <div className="status-control-button">
                        <button >Export</button>
                        <button >Print</button>
                        <button >Edit</button>
                    </div>
                </div>
            </div>

            <div className="status-details">
                <div className="status-details-chart">
                    chart
                </div>
                <div className="status-details-percentage">
                    percent
                </div>
            </div>

            
            <div className="status-testruns-header">
                <h3> Test Runs </h3>
                <div className="status-delete-testrun">
                    <button > Delete Selected </button>
                </div>
            </div>

            <div className="status-testrun-details-class">
                <div className="status-testrun-details">
                    <input type="checkbox"/>
                    <p>Test run name</p>
                    <div className="status-testrun-statusbar">
                        <p>status bar</p>
                        <p>percentage</p>
                    </div>
                </div>
                <div className="status-testrun-details">
                    <input type="checkbox"/>
                    <p>Test run name</p>
                    <div className="status-testrun-statusbar">
                        <p>status bar</p>
                        <p>percentage</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MilestonesStatus;

