import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import '../styles/TodoPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TodoPage = () => {
  const chartData = {
    labels: ['Zainab T.', ''],
    datasets: [{
      label: 'Progress',
      data: [534, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }],
  }; 

  return (
    <div className="todo-page">

      <div className="todo-chart-container">
        <Bar data={chartData} />
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
        
        <ul className="test-runs-list">
          <li className="test-runs-item">
            <Link to="/TestRunTestsResults">
              <div className="test-runs-item-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <div className="test-runs-item-title">DSR Functional Testplan for 0.5 (215)</div>
              <div className="test-runs-item-progress">
                <div className="test-runs-item-progress-bar" style={{ width: '42%' }}></div>
                <div className="test-runs-item-progress-value">42%</div>
              </div>
              <div className="test-runs-item-unassigned">10 unassigned</div>
            </Link>
          </li>
          <li className="test-runs-item">
            <Link to="/TestRunTestsResults">
              <div className="test-runs-item-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <div className="test-runs-item-title">DSR Messaging Options (11)</div>
              <div className="test-runs-item-progress">
                <div className="test-runs-item-progress-bar" style={{ width: '92%' }}></div>
                <div className="test-runs-item-progress-value">92%</div>
              </div>
              <div className="test-runs-item-unassigned">1 unassigned</div>
            </Link>
          </li>
          <li className="test-runs-item">
            <Link to="/TestRunTestsResults">
              <div className="test-runs-item-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <div className="test-runs-item-title">Infra US Sanity 1.115 (12)</div>
              <div className="test-runs-item-progress">
                <div className="test-runs-item-progress-bar" style={{ width: '67%' }}></div>
                <div className="test-runs-item-progress-value">67%</div>
              </div>
              <div className="test-runs-item-unassigned">0 unassigned</div>
            </Link>
          </li>
          {/* <!-- rest of the test runs --> */}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;