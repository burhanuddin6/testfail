import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import logo from '../images/logo_02.png';
import linechart from '../images/linechart.png';
import download from '../images/download.png';
import copy from '../images/copy.png';
import reset from '../images/reset.png';
import refine from '../images/refine.png';
import line from '../images/line.png';
import grouped from '../images/groupedbar.png';
import horizontal from '../images/horizontal.png';
import stacked from '../images/stacked.png';
import { SOFTWARE_TITLE } from '../utilities/globals';


const Dashboard = ({userName}) => {

  const [showButtons, setShowButtons] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);


  const handleFormat = () => {
    setShowButtons(!showButtons);
  };

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

      <div className="chartControls">
        
        <button className="controlButtons">
           {/* <a href='chart.png' download={chart}> */}
              <span class="tooltip">Download</span>
              <img src={download} alt="Download" className="controlsIcon"></img>
            {/* </a> */}
        </button>
        
        <button className="controlButtons">
            <span class="tooltip">Copy</span>
            <img src={copy} alt="Copy" className="controlsIcon"></img>
        </button>
        <button className="controlButtons">
            <span class="tooltip">Reset</span>
            <img src={reset} alt="Reset" className="controlsIcon"></img>
        </button>
        <button className="controlButtons">
            <span class="tooltip">Line (Click to Change)</span>
            <img src={line} alt="Line Format" className="controlsIcon" onClick={handleFormat}></img>
        </button>
        <button className="controlButtons">
            <img src={refine} alt="Refine" className="refineIcon"></img>
        </button>

        {showButtons && (
          <div className="formatChange">
            <button className="controlButtons">
              <span class="tooltip">Line</span>
              <img src={line} alt="Line" className="controlsIcon"></img>
            </button>
            <button className="controlButtons">
                <span class="tooltip">Horizontal</span>
                <img src={horizontal} alt="Horizontal" className="controlsIcon" ></img>
            </button>
            <button className="controlButtons">
              <span class="tooltip">Stacked</span>
              <img src={stacked} alt="Stacked" className="controlsIcon"></img>
            </button>
            <button className="controlButtons">
                <span class="tooltip">Grouped</span>
                <img src={grouped} alt="Grouped" className="controlsIcon" ></img>
            </button>
          </div>
        )}

      </div>

      <div className="chart-container">
        <img src={linechart} alt="Chart" className="chart" />
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'green' }}></div>
            <span className="legend-text">Privaci</span>
          </div>
          <div className="legend-text">1237 recent test changes.</div>
        </div>
      </div>

      <div className='projects'>
        <h2>Projects</h2>
        <div className='details'>
          <button className='projectName'>Project 01</button>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div> 
        <div className='details'>
          <button className='projectName'>Project 02</button>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div>
        {/* <div className='details'>
          <h3>Project 03</h3>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div>  */}
        {/* <div className='details'>
          <h3>Project 04</h3>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div> */}
        {/* <div className='details'>
          <h3>Project 05</h3>
          <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
        </div> */}
      </div>

      <div className='todo'>
        <h2>To-dos</h2>
        <div className='details'>
          <button className='projectName'>Project 01</button>
        </div> 
        <div className='details'>
         <button className='projectName'>Project 02</button>
        </div>
        {/* <div className='details'>
          <h3>Project 03</h3>
        </div>  */}
        {/* <div className='details'>
          <h3>Project 04</h3>
        </div> */}
        {/* <div className='details'>
          <h3>Project 05</h3>
        </div> */}
      </div>

      
    </div>
  );
};

export default Dashboard;
