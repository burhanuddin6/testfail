// import React, { useState } from 'react';
// import Graph from '../components/OverviewGraph';
// import '../styles/Overview.css';
// import Graphcontrol from '../components/Graphcontrol';
// import Milestones from '../components/Milestones';
// import TestRuns from '../components/TestRuns';
// import Todos from '../components/ToDos';


// const Overview = () => {
//   const [activeView, setActiveView] = useState('history');

//     const renderContent = () => {
//         switch (activeView) {
//             case 'history':
//                 return (
//                     <div>
//                        <div className='activity-datewise-details'>
//                           <p className='activity-date'>20 July 2024</p>
//                           <div className='activity-details'>
//                             <p className='activity-status-milestone'>Milestone</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>change by</p>
//                             </div>
//                           </div> 
//                           <div className='activity-details'>
//                             <p className='activity-status-testplan'>Test Plan</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>change by</p>
//                             </div>
//                           </div> 
//                           <div className='activity-details'>
//                             <p className='activity-status-testrun'>Test Run</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>change by</p>
//                             </div>
//                           </div> 
//                         </div>
                        
//                         <div className='activity-datewise-details'>
//                           <p className='activity-date'>19 July 2024</p>
//                           <div className='activity-details'>
//                             <p className='activity-status-testsuite'>Test Suite</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>change by</p>
//                             </div>
//                           </div> 
//                         </div>
//                     </div>
//                 );
//             case 'tests':
//                 return (
//                     <div>
//                         <div className='activity-datewise-details'>
//                           <p className='activity-date'>20 July 2024</p>
//                           <div className='activity-details'>
//                             <p className='activity-status-passed'>Passed</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>tested by</p>
//                             </div>
//                           </div> 
//                           <div className='activity-details'>
//                             <p className='activity-status-failed'>Failed</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>tested by</p>
//                             </div>
//                           </div> 
//                         </div>
                        
//                         <div className='activity-datewise-details'>
//                           <p className='activity-date'>19 July 2024</p>
//                           <div className='activity-details'>
//                             <p className='activity-status-passed'>Passed</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>tested by</p>
//                             </div>
//                           </div> 
//                           <div className='activity-details'>
//                             <p className='activity-status-failed'>Failed</p>
//                             <p className='activity-details-details'>details</p>
//                             <div className='activity-change-by'>
//                               <p>tested by</p>
//                             </div>
//                           </div> 
//                         </div>
//                     </div>
//                 );
//             // Add more cases if you have additional views
//             default:
//                 return <div>Select a view</div>;
//         }
//     };

//   return (
//     <main className="overview">
//       <div className='overview-graph'>
//         <Graphcontrol/>
        
//         <div className="overview-chart-container">
//           <Graph/>
//           <div className="overview-legend">
//             <div className="overview-legend-item">
//               <div className="overview-legend-color" style={{ backgroundColor: 'green' }}></div>
//               <span className="overview-legend-text">1146 Passed</span>
//             </div>
//             <div className="overview-legend-item">
//               <div className="overview-legend-color" style={{ backgroundColor: 'red' }}></div>
//               <span className="overview-legend-text">7 Blocked</span>
//             </div>
//             <div className="overview-legend-item">
//               <div className="overview-legend-color" style={{ backgroundColor: 'blue' }}></div>
//               <span className="overview-legend-text">2 Retest</span>
//             </div>
//             <div className="overview-legend-item">
//               <div className="overview-legend-color" style={{ backgroundColor: 'orange' }}></div>
//               <span className="overview-legend-text">22 Failed</span>
//             </div>
//             <div className="overview-legend-item">
//               <div className="overview-legend-color" style={{ backgroundColor: 'grey' }}></div>
//               <span className="overview-legend-text">3 Comments</span>
//             </div>
//             <div className="overview-legend-item">
//               <div className="overview-legend-color" style={{ backgroundColor: 'yellow' }}></div>
//               <span className="overview-legend-text">34 Partial</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='overview-content'>
//         <Todos/>
//         <Milestones/>
//         <TestRuns/>
//       </div>
  
//       <div className='overview-activitylog'>
//         <div className='overview-activitylog-header'>
//           <h2>Activity</h2>
//           <div className='overview-activitylog-change'>
//             <button onClick={() => setActiveView('history')} className={activeView === 'history' ? 'active-button' : ''}>History</button>
//             <button onClick={() => setActiveView('tests')} className={activeView === 'tests' ? 'active-button' : ''}>Test Changes</button>
//           </div>
//         </div>
//         <div className='overview-activity-scrollable'>
//           {renderContent()}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Overview;

import React, { useState, useEffect } from 'react';
import Graph from '../components/OverviewGraph';
import '../styles/Overview.css';
import Graphcontrol from '../components/Graphcontrol';
import Milestones from '../components/Milestones';
import TestRuns from '../components/TestRuns';
import Todos from '../components/ToDos';

import { fetchActivity } from '../api/Activity'; 

const Overview = () => {
  const [activeView, setActiveView] = useState('history');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchActivity();
        // Exclude 'TestCase' and 'TestCaseResult' activities
        setActivities(result.filter(activity => 
          activity.action_object !== 'TestCase' && activity.action_object !== 'TestCaseResult'
        ));
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatDate(dateStr) {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
        
      // Format date to "d MMMM yyyy"
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options); // 'en-GB' formats as "6 August 2024"
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  }

  const renderActivities = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    // Group activities by date
    const groupedActivities = activities.reduce((acc, activity) => {
      const date = formatDate(activity.performed_on);
      if (!acc[date]) acc[date] = [];
      acc[date].push(activity);
      return acc;
    }, {});

    return Object.keys(groupedActivities).map(date => (
      <div key={date} className='activity-datewise-details'>
        <p className='activity-date'>{date}</p>
        {groupedActivities[date]
          .map(activity => (
            <div key={activity.id} className='activity-details'>
              <p className={`activity-status-${activity.action_object.toLowerCase()}`}>
                {activity.action_object}
              </p>
              <p className='activity-details-details'>{activity.action_message.split('"')[1]}</p>
              <div className='activity-change-by'>
                <p>{activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} by {activity.user_info.first_name} {activity.user_info.last_name}</p>
              </div>
            </div>
          ))
        }
      </div>
    ));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'history':
        return renderActivities();
      case 'tests':
        // Implement the logic for displaying test-related activities if needed
        return <div>No test changes to display.</div>;
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
