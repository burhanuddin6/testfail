// import React, { useState } from 'react';
// import '../styles/Dashboard.css';
// import logo from '../images/logo_02.png';
// import linechart from '../images/linechart.png';
// import { Link } from 'react-router-dom';
// import { SOFTWARE_TITLE } from '../utilities/globals';
// import Graphcontrol from '../components/Graphcontrol.js'

// const Dashboard = ({userName}) => {
 
//   const [showButtons, setShowButtons] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);

  

//   const handleFormat = () => {
//     setShowButtons(!showButtons);
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <img src={logo} alt="Securiti.ai" />
//         <h2>{SOFTWARE_TITLE}</h2>
//         <div className='options'>
//           <input type="text" className="search-bar" placeholder="Search..." />
//           <div className="dropdown" onClick={() => setShowWorkingOnMenu(!showWorkingOnMenu)}>
//             Working On
//             {showWorkingOnMenu && (
//               <div className="dropdown-menu">
//                 <div>Option 1</div>
//                 <div>Option 2</div>
//               </div>
//             )}
//           </div>
//           <div className="dropdown" onClick={() => setShowProfileMenu(!showProfileMenu)}>
//             {userName}
//             {showProfileMenu && (
//               <div className="dropdown-menu">
//                 <div>My Settings</div>
//                 <div>Logout</div>
//               </div>
//             )}
//           </div>
//           <a href="/help" className="nav-link purple">Help & Feedback</a>
//           <a href="mailto:support@example.com" className="nav-link purple"> Mail</a>
//         </div>
        
        
//       </header>
          
//       <Graphcontrol/>

//       <div className="chart-container">
//         <img src={linechart} alt="Chart" className="chart" />
//         <div className="dashboard-legend">
//           <div className="dashboard-legend-item">
//             <div className="dashboard-legend-color" style={{ backgroundColor: 'green' }}></div>
//             <span className="dashboard-legend-text">Privaci</span>
//           </div>
//           <div className="dashboard-legend-text">1237 recent test changes.</div>
//         </div>
//       </div>

//         <div className='content'>
//       <div className='projects'>
//         <h2>Projects</h2>
//         <div className='dashboard-details'>
//           <Link to="/overview/project01" className='projectName'>Project 01</Link>
//           <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
//         </div> 
//         <div className='dashboard-details'>
//           <Link to="/overview/project02" className='projectName'>Project 02</Link>
//           <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
//         </div>
//         <div className='dashboard-details'>
//           <Link to="/overview/project03" className='projectName'>Project 03</Link>
//           <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
//         </div> 
//         {/* <div className='dashboard-details'>
//           <Link to="/overview/project03" className='projectName'>Project 044</Link>
//           <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
//         </div> */}
       
//       </div>

//       <div className='dashboard-todo'>
//         <h2>To-dos</h2>
//         <div className='dashboard-details'>
//           <Link to="/todo/project01" className='projectName'>Project 01</Link>
//         </div> 
//         <div className='dashboard-details'>
//          <Link to="/todo/project02" className='projectName'>Project 02</Link>
//         </div>
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import logo from '../images/logo_02.png';
import linechart from '../images/linechart.png';
import { Link } from 'react-router-dom';
import { SOFTWARE_TITLE , setProjectInfo} from '../utilities/globals.js';
import Graphcontrol from '../components/Graphcontrol.js';
import { getUserDetails } from '../api/Auth';
import { fetchProjects } from '../api/Project.js'; // Adjust the import path

const Dashboard = ({ userName }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showButtons, setShowButtons] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkingOnMenu, setShowWorkingOnMenu] = useState(false);


  useEffect(() => {
    
    const getDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const details = await getUserDetails(token);
  
        sessionStorage.setItem("user_name", `${details.first_name} ${details.last_name}`);
        sessionStorage.setItem("user_id", `${details.id}`);
        sessionStorage.setItem("user_email", `${details.email}`);

        
        console.log("User details successfully stored in sessionStorage."); //debug statement, remove before production!!
      } catch (error) {
        console.error("Failed to fetch user details", error); //debug statement, remove before production!!
      }
    };
  
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };
  
    
    Promise.all([getDetails(), getProjects()])
      .then(() => {
        console.log("Both getDetails and getProjects have completed.");  //debug statement, remove before production!!
      })
      .catch((error) => {
        console.error("An error occurred while fetching data", error); //debug statement, remove before production!!
      });
  
  }, [setProjects, setError, setLoading]);  

  const handleFormat = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={logo} alt="Securiti.ai" />
        <h2>{SOFTWARE_TITLE}</h2>
        <div className="options">
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

      <Graphcontrol />

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
          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            projects.map(project => (
              <div key={project.project_id} className='dashboard-details'>
                 <Link 
                        to={`/projects/overview`} 
                        className='projectName'
                        onClick={() => setProjectInfo(project.project_id, project.name)} // Set the project ID globally
                    >
                        {project.name}
                    </Link> 
                <p>Contains 33 test suites, 143 active test runs and 10 active milestones</p>
              </div>
            ))
          )}
        </div>

        <div className='dashboard-todo'>
          <h2>To-dos</h2>
          <div className='dashboard-details'>
            <Link to="/todo/project01" className='projectName'>Project 01</Link>
          </div>
          <div className='dashboard-details'>
            <Link to="/todo/project02" className='projectName'>Project 02</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

         
