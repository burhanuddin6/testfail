import React, { useState } from 'react';
import '../styles/components/Header.css';
import logo from '../images/logo_02.png';
import { useNavigate } from 'react-router-dom';


const Header = ({userName}) => {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const navigate = useNavigate();
  // console.log(activeView);
  // console.log("username in header" + userName)

  return (
    <div className="header-container">
      <header className="header-header">
        <div className='top'>
            <img src={logo} alt="Securiti.ai" />
            <h2>Project Name</h2>
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
            <a href='/overview/:projectId' onClick={() => setActiveView('overview')} className={activeView === 'overview' ? 'active-button' : ''}>Overview</a>
            <a href='/todo/:projectId' onClick={(e) => {e.preventDefault(); setActiveView('todo');navigate('/todo/:projectId');}} className={activeView === 'todo' ? 'active-button' : ''}>To-do</a>
            <a href='/milestones' onClick={(e) => {e.preventDefault(); setActiveView('milestone');navigate('/milestones');}} className={activeView === 'milestone' ? 'active-button' : ''}>Milestones</a>
            <a href='/testruns' onClick={(e) => {e.preventDefault(); setActiveView('runs');navigate('/testruns');}} className={activeView === 'runs' ? 'active-button' : ''}>Test Runs & Results</a>
            <a href='/testsuitscases' onClick={(e) => {e.preventDefault(); setActiveView('cases');navigate('/testsuitscases');}} className={activeView === 'cases' ? 'active-button' : ''}>Test Suites & Cases</a>
            <a href='' onClick={(e) => {e.preventDefault(); setActiveView('reports');}} className={activeView === 'reports' ? 'active-button' : ''}>Reports</a>

            <div className='nav-admin'>
              <a href=''>Admin</a>
            </div>
        </div>
        
      </header>
    </div>
  );
};

export default Header;