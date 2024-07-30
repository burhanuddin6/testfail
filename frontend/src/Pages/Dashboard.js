import React, { useState } from 'react';
import '../styles/Dashboard.css';
import logo from '../images/logo_02.png';
import linechart from '../images/linechart.png';
import { Link } from 'react-router-dom';
import { SOFTWARE_TITLE } from '../utilities/globals';
import Graphcontrol from '../components/Graphcontrol.js'

const Dashboard = ({userName}) => {
 
  // const [showButtons, setShowButtons] = useState(false);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);

  // const handleFormat = () => {
  //   setShowButtons(!showButtons);
  // };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={logo} alt="Securiti.ai" />
        <h2>{SOFTWARE_TITLE}</h2>
        <div className='options'>
          <input type="text" className="search-bar" placeholder="Search..." />
          <div className="dropdown" onClick={() => setShowWorkingOnMenu(!showWorkingOnMenu)}>
            Working On
            {showWorkingOnMenu && (
              <div className="dropdown-menu">
                <div>Option 1</div>
                <div>Option 2</div>
              </div>
            )}
          </div>
          <div className="dropdown" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            {userName}
            {showProfileMenu && (
              <div className="dropdown-menu">
                <div>My Settings</div>
                <div>Logout</div>
              </div>
            )}
          </div>
          <a href="/help" className="nav-link purple">Help & Feedback</a>
          <a href="mailto:support@example.com" className="nav-link purple"> Mail</a>
        </div>
        
        
      </header>
          
      <Graphcontrol/>

      <div className="chart-container">
        <img src={linechart} alt="Chart" className="chart" />
        <div className="dashboard-legend">
          <div className="dashboard-legend-item">
            <div className="dashboard-legend-color" style={{ backgroundColor: 'green' }}></div>
            <span className="dashboard-legend-text">Privaci</span>
          </div>
          <div className="dashboard-legend-text">1237 recent test changes.</div>
        </div>
      </div>

        <div className='content'>
      <div className='projects'>
        <h2>Projects</h2>
        <div className='dashboard-details'>
          <Link to="/overview/project01" className='projectName'>Project 01</Link>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div> 
        <div className='dashboard-details'>
          <Link to="/overview/project02" className='projectName'>Project 02</Link>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div>
        <div className='dashboard-details'>
          <Link to="/overview/project03" className='projectName'>Project 03</Link>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div> 
        <div className='dashboard-details'>
          <Link to="/overview/project04" className='projectName'>Project 04</Link>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div> 
        <div className='dashboard-details'>
          <Link to="/overview/project05" className='projectName'>Project 05</Link>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div>
      </div>

      <div className='dashboard-todo'>
        <h2>To-dos</h2>
        <div className='dashboard-details'>
          <Link to="/todo/project01" className='projectName'>Project 01</Link>
        </div> 
        <div className='dashboard-details'>
         <Link to="/todo/project02" className='projectName'>Project 02</Link>
        </div>
        <div className='dashboard-details'>
         <Link to="/todo/project03" className='projectName'>Project 03</Link>
        </div>
        <div className='dashboard-details'>
         <Link to="/todo/project04" className='projectName'>Project 04</Link>
        </div>
        <div className='dashboard-details'>
         <Link to="/todo/project05" className='projectName'>Project 05</Link>
        </div>
        <div className='dashboard-details'>
         <Link to="/todo/project06" className='projectName'>Project 06</Link>
        </div>
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;