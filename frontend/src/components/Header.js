import React, { useState } from 'react';
import '../styles/components/Header.css';
import logo from '../images/logo_02.png';
import { getProjectID, getProjectName } from '../utilities/globals';

const Header = ({userName }) => {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);
  const projectName = getProjectName();
  const projectID = getProjectID();
  console.log("username in header " + projectName); //debug statement, remove before production!!
  console.log("projectid in header " + projectID); //debug statement, remove before production!!
  console.log("projectname in header " + projectID); //debug statement, remove before production!!

  return (
    <div className="header-container">
      <header className="header-header">
        <div className='top'>
            <img src={logo} alt="Securiti.ai" />
            <h2>{projectName}</h2>
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
        </div>
       
        <div className='nav'>
            <a href='/dashboard'>Dashboard</a>
            <a href={`/projects/overview`}>Overview</a>
            <a href={`/todos/overview`}>To-do</a>
            <a href={`/milestones/overview`}>Milestones</a>
            <a href={`/runs/overview?projectID=${projectID}`}>Test Runs & Results</a>
            <a href={`/suites/overview?projectID=${projectID}`}>Test Suits & Cases</a>
            <a href='/*'>Reports</a>
        </div>
        
      </header>

    </div>
  );
};

export default Header;