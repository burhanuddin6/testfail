// import React, { useState } from 'react';
// import '../styles/Header.css';

// const Header = ({ userName }) => {
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);

//   return (
//     <header className="header">
//       <button className="dashboard-button">Return to Dashboard</button>
//       <div className="header-title">Privaci</div>
//       <nav className="nav">
//         <a href="/overview" className="nav-link">OVERVIEW</a>
//         <a href="/todo" className="nav-link">TODO</a>
//         <a href="/milestones" className="nav-link">MILESTONES</a>
//         <a href="/test-runs-results" className="nav-link">TEST RUNS & RESULTS</a>
//         <a href="/test-suites-cases" className="nav-link">TEST SUITES & CASES</a>
//         <a href="/reports" className="nav-link">REPORTS</a>
//         <input type="text" className="search-bar" placeholder="Search..." />
//         <div className="dropdown" onClick={() => setShowWorkingOnMenu(!showWorkingOnMenu)}>
//           Working On
//           {showWorkingOnMenu && (
//             <div className="dropdown-menu">
//               <div>Option 1</div>
//               <div>Option 2</div>
//             </div>
//           )}
//         </div>
//         <div className="dropdown" onClick={() => setShowProfileMenu(!showProfileMenu)}>
//           {userName}
//           {showProfileMenu && (
//             <div className="dropdown-menu">
//               <div>My Settings</div>
//               <div>Logout</div>
//             </div>
//           )}
//         </div>
//         <a href="/help" className="nav-link purple">Help & Feedback</a>
//         <a href="mailto:support@example.com" className="nav-link purple">
//           <img src="mail-icon.png" alt="Mail" className="mail-icon" />
//         </a>
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ userName }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);

  console.log('Rendering Header with userName:', userName);

  return (
    <header className="header">
      <button className="dashboard-button">Return to Dashboard</button>
      <div className="header-title">Privaci</div>
      <nav className="nav">
        <Link to="/overview" className="nav-link">OVERVIEW</Link>
        <Link to="/todo" className="nav-link">TODO</Link>
        <Link to="/milestones" className="nav-link">MILESTONES</Link>
        <Link to="/test-runs-results" className="nav-link">TEST RUNS & RESULTS</Link>
        <Link to="/test-suites-cases" className="nav-link">TEST SUITES & CASES</Link>
        <Link to="/reports" className="nav-link">REPORTS</Link>
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
        <Link to="/help" className="nav-link purple">Help & Feedback</Link>
        <Link to="mailto:support@example.com" className="nav-link purple">
          <img src="mail-icon.png" alt="Mail" className="mail-icon" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;