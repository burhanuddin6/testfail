import React, { useState } from 'react';
import Graph from '../components/OverviewGraph';
import '../styles/Overview.css';
import Graphcontrol from '../components/Graphcontrol';
import Milestones from '../components/Milestones';
import TestRuns from '../components/TestRuns';
import Todos from '../components/ToDos';


const Overview = () => {
  const [activeView, setActiveView] = useState('history');

    const renderContent = () => {
        switch (activeView) {
            case 'history':
                return (
                    <div>
                       <div className='activity-datewise-details'>
                          <p className='activity-date'>20 July 2024</p>
                          <div className='activity-details'>
                            <p className='activity-status-milestone'>Milestone</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>change by</p>
                            </div>
                          </div> 
                          <div className='activity-details'>
                            <p className='activity-status-testplan'>Test Plan</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>change by</p>
                            </div>
                          </div> 
                          <div className='activity-details'>
                            <p className='activity-status-testrun'>Test Run</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>change by</p>
                            </div>
                          </div> 
                        </div>
                        
                        <div className='activity-datewise-details'>
                          <p className='activity-date'>19 July 2024</p>
                          <div className='activity-details'>
                            <p className='activity-status-testsuite'>Test Suite</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>change by</p>
                            </div>
                          </div> 
                        </div>
                    </div>
                );
            case 'tests':
                return (
                    <div>
                        <div className='activity-datewise-details'>
                          <p className='activity-date'>20 July 2024</p>
                          <div className='activity-details'>
                            <p className='activity-status-passed'>Passed</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>tested by</p>
                            </div>
                          </div> 
                          <div className='activity-details'>
                            <p className='activity-status-failed'>Failed</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>tested by</p>
                            </div>
                          </div> 
                        </div>
                        
                        <div className='activity-datewise-details'>
                          <p className='activity-date'>19 July 2024</p>
                          <div className='activity-details'>
                            <p className='activity-status-passed'>Passed</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>tested by</p>
                            </div>
                          </div> 
                          <div className='activity-details'>
                            <p className='activity-status-failed'>Failed</p>
                            <p className='activity-details-details'>details</p>
                            <div className='activity-change-by'>
                              <p>tested by</p>
                            </div>
                          </div> 
                        </div>
                    </div>
                );
            // Add more cases if you have additional views
            default:
                return <div>Select a view</div>;
        }
    };

  return (
    <main className="overview">
      <div className='overview-graph'>
        <Graphcontrol/>
        
        <div className="overview-chart-container">
          <Graph/>
          <div className="overview-legend">
            <div className="overview-legend-item">
              <div className="overview-legend-color" style={{ backgroundColor: 'green' }}></div>
              <span className="overview-legend-text">1146 Passed</span>
            </div>
            <div className="overview-legend-item">
              <div className="overview-legend-color" style={{ backgroundColor: 'red' }}></div>
              <span className="overview-legend-text">7 Blocked</span>
            </div>
            <div className="overview-legend-item">
              <div className="overview-legend-color" style={{ backgroundColor: 'blue' }}></div>
              <span className="overview-legend-text">2 Retest</span>
            </div>
            <div className="overview-legend-item">
              <div className="overview-legend-color" style={{ backgroundColor: 'orange' }}></div>
              <span className="overview-legend-text">22 Failed</span>
            </div>
            <div className="overview-legend-item">
              <div className="overview-legend-color" style={{ backgroundColor: 'grey' }}></div>
              <span className="overview-legend-text">3 Comments</span>
            </div>
            <div className="overview-legend-item">
              <div className="overview-legend-color" style={{ backgroundColor: 'yellow' }}></div>
              <span className="overview-legend-text">34 Partial</span>
            </div>
          </div>
        </div>
      </div>

      <div className='overview-content'>
        <Todos/>
        <Milestones/>
        <TestRuns/>
      </div>
  
      <div className='overview-activitylog'>
        <div className='overview-activitylog-header'>
          <h2>Activity</h2>
          <div className='overview-activitylog-change'>
            <button onClick={() => setActiveView('history')} className={activeView === 'history' ? 'active-button' : ''}>History</button>
            <button onClick={() => setActiveView('tests')} className={activeView === 'tests' ? 'active-button' : ''}>Test Changes</button>
          </div>
        </div>
        <div className='overview-activity-scrollable'>
          {renderContent()}
        </div>
      </div>
    </main>
  );
}

export default Overview;
