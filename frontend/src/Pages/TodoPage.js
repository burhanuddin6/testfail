// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Link } from 'react-router-dom';
// import '../styles/TodoPage.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TodoPage = () => {
//   const chartData = {
//     labels: ['Zainab T.', ''],
//     datasets: [{
//       label: 'Progress',
//       data: [534, 0],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 99, 132, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(255, 99, 132, 1)',
//       ],
//       borderWidth: 1,
//     }],
//   };

//   return (
//     <div className="todo-mainclass">
//       <div className="todo-header">
//           <h2> To-dos </h2>
//       </div>

//       <div className="todo-page-details">
//           <div className="todo-chart-download">
//               <button className="download">Download CSV</button>
//               <button className="download">Download Image</button>
//           </div>
//           <div className='todo-chart'>
//             <Bar data={chartData} />
//           </div>
//       </div>

//       <div className='todo-testruns'>
//         <h2>Test Runs</h2>

//         <div className="test-runs-filter">
//            <div className="test-runs-filter-label">Group by:</div>
//            <div className="dropdown">
//              <button className="dropbtn">None</button>
//              <div className="dropdown-content">
//                <a href="#">Milestone</a>
//                <a href="#">Test Plan</a>
//                <a href="#">Day</a>
//                <a href="#">Month</a>
//              </div>
//            </div>
//            <div className="test-runs-filter-label">Filter:</div>
//            <div className="dropdown">
//              <button className="dropbtn">None</button>
//              <div className="dropdown-content">
//                <a href="#">Select All</a>
//                <a href="#">None</a>
//                <a href="#">Passed</a>
//                <a href="#">Blocked</a>
//                <a href="#">Untested</a>
//                <a href="#">Retest</a>
//                <a href="#">Failed</a>
//                <a href="#">Comments</a>
//                <a href="#">Partial</a>
//              </div>
//            </div>
//          </div>

//          <div className='todo-testrun-listing'>
//               <div className='todo-testrun-item'>
//                 <Link to="/TestRunTestsResults">
//                   {/* <div className="test-runs-item-icon">
//                     <i className="fas fa-folder-open"></i>
//                   </div> */}
//                   <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
//                 </Link>
//                 <div className="todo-test-runs-status-bar">
//                   <div className="test-runs-item-progress-bar" style={{ width: '42%' }}></div>
//                 </div>
//                 <div className="status-testrun-progress-value">42%</div>
//                 <div className="test-runs-item-unassigned">10 unassigned</div>
//               </div>

//               <div className='todo-testrun-item'>
//                 <Link to="/TestRunTestsResults">
//                   {/* <div className="test-runs-item-icon">
//                     <i className="fas fa-folder-open"></i>
//                   </div> */}
//                   <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
//                 </Link>
//                 <div className="todo-test-runs-status-bar">
//                   <div className="test-runs-item-progress-bar" style={{ width: '80%' }}></div>
//                 </div>
//                 <div className="status-testrun-progress-value">80%</div>
//                 <div className="test-runs-item-unassigned">10 unassigned</div>
//               </div>

//          </div>
//       </div>
//      </div>
//   );
// };

// export default TodoPage;

import React from 'react';
import HorizontalBarChart from '../components/horizontalBarChart';
import { Link } from 'react-router-dom';
import '../styles/TodoPage.css';



const TodoPage = () => { 

  const userData = [
    { name: 'Zainab T.', active: 150, pending: 424 },
  ];

  return (
    <div className="todo-mainclass">
      <div className="todo-header">
          <h2> To-dos </h2>
      </div>

      <div className="todo-page-details">
          <div className="todo-chart-download">
              <button className="download">Download CSV</button>
              <button className="download">Download Image</button>
          </div>
          <div className='todo-chart'>
            <HorizontalBarChart userData={userData}/>
          </div>
      </div>

      <div className='todo-testruns'>
        <h2>Test Runs</h2>

        <div className="test-runs-filter">
           <div className="test-runs-filter-label">Group by:</div>
           <div className="dropdown">
             <button className="dropbtn">None</button>
             <div className="dropdown-content">
               <a href="#">Milestone</a>
               <a href="#">Test Plan</a>
               <a href="#">Day</a>
               <a href="#">Month</a>
             </div>
           </div>
           <div className="test-runs-filter-label">Filter:</div>
           <div className="dropdown">
             <button className="dropbtn">None</button>
             <div className="dropdown-content">
               <a href="#">Select All</a>
               <a href="#">None</a>
               <a href="#">Passed</a>
               <a href="#">Blocked</a>
               <a href="#">Untested</a>
               <a href="#">Retest</a>
               <a href="#">Failed</a>
               <a href="#">Comments</a>
               <a href="#">Partial</a>
             </div>
           </div>
         </div>

         <div className='todo-testrun-listing'>
              <div className='todo-testrun-item'>
                <Link to="/TestRunTestsResults">
                  <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
                </Link>
                <div className="todo-test-runs-status-bar">
                  <div className="test-runs-item-progress-bar" style={{ width: '42%' }}></div>
                </div>
                <div className="status-testrun-progress-value">42%</div>
                <div className="test-runs-item-unassigned">10 unassigned</div>
              </div>

              <div className='todo-testrun-item'>
                <Link to="/TestRunTestsResults">
                  <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
                </Link>
                <div className="todo-test-runs-status-bar">
                  <div className="test-runs-item-progress-bar" style={{ width: '80%' }}></div>
                </div>
                <div className="status-testrun-progress-value">80%</div>
                <div className="test-runs-item-unassigned">10 unassigned</div>
              </div>

              <div className='todo-testrun-item'>
                <Link to="/TestRunTestsResults">
                  <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
                </Link>
                <div className="todo-test-runs-status-bar">
                  <div className="test-runs-item-progress-bar" style={{ width: '80%' }}></div>
                </div>
                <div className="status-testrun-progress-value">80%</div>
                <div className="test-runs-item-unassigned">10 unassigned</div>
              </div>

              <div className='todo-testrun-item'>
                <Link to="/TestRunTestsResults">
                  <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
                </Link>
                <div className="todo-test-runs-status-bar">
                  <div className="test-runs-item-progress-bar" style={{ width: '80%' }}></div>
                </div>
                <div className="status-testrun-progress-value">80%</div>
                <div className="test-runs-item-unassigned">10 unassigned</div>
              </div>

              <div className='todo-testrun-item'>
                <Link to="/TestRunTestsResults">
                  <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
                </Link>
                <div className="todo-test-runs-status-bar">
                  <div className="test-runs-item-progress-bar" style={{ width: '80%' }}></div>
                </div>
                <div className="status-testrun-progress-value">80%</div>
                <div className="test-runs-item-unassigned">10 unassigned</div>
              </div>

              <div className='todo-testrun-item'>
                <Link to="/TestRunTestsResults">
                  <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
                </Link>
                <div className="todo-test-runs-status-bar">
                  <div className="test-runs-item-progress-bar" style={{ width: '80%' }}></div>
                </div>
                <div className="status-testrun-progress-value">80%</div>
                <div className="test-runs-item-unassigned">10 unassigned</div>
              </div>
              
         </div>
         
      </div>
     </div>
  );
};

export default TodoPage;