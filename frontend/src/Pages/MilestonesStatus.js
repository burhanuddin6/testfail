import Graph from "../components/OverviewGraph";
import "../styles/MilestonesStatus.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MilestonesStatus = () => {
    const navigate = useNavigate();
    const handleEditMilestone = () => {
        navigate(`/add-milestone`, { state: { from: '/milestone-status' , action: 'edit'} });
      };

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
                    <h2> Milestone Name </h2>
                    <div className="status-control-button">
                        <button >Export</button>
                        <button >Print</button>
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

            <div className="status-milestones-header">
                <h2> Milestones </h2>
                <div className="status-delete-milestones">
                    <button > Delete Selected </button>
                </div>
            </div>

            <div className="status-milestones-details-class">
                <div className="status-milestones-details"> 
                    <input type="checkbox"/>
                    <p><strong>Milestone Name</strong><br></br>Due Date / Starts On</p>
                    <div className="status-milestones-statusbar">
                        <div className="status-milestones-progress-bar-passed" style={{ width: '42%' }}> </div>
                        <div className="status-milestones-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="status-milestones-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="status-milestones-progress-value">42%</div>
                </div>
            </div>
            
            <div className="status-testruns-header">
                <h2> Test Runs </h2>
                <div className="status-delete-testrun">
                    <button > Delete Selected </button>
                </div>
            </div>

            <div className="status-testrun-details-class">
                <div className="status-testrun-details">
                    <input type="checkbox"/>
                    <p><strong>Test Run Name</strong><br></br> by ... on ... </p>
                    <div className="status-testrun-statusbar">
                        <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}> </div>
                        <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="status-testrun-progress-value">42%</div>
                </div>
            </div>
        </div>
    );
}

export default MilestonesStatus;