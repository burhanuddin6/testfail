import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Forgot from './components/Forgot';
import EmailVerification from './components/EmailVerification'; 
// import Dashboard from './components/Dashboard';

// -------------
// Batool App.js
// --------------

// import React, { useState }  from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import Forgot from './components/Forgot';
// import Dashboard from './components/Dashboard';


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/Forgot" element={<Forgot />} />
//         <Route path="/Dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// -------------
// Farhan App.js
// --------------

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
// import TodoPage from './components/TodoPage';
import Milestones from './components/Milestones';
import TestRuns from './components/TestRuns';
import './App.css';

const App = () => {
  const userName = 'Zainab Turabi';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
      </Routes>
      <div className="app">
        <Header userName={userName} />
        <Routes>
          <Route path="/overview" element={
            <>
              <div className="main-content">
                <Sidebar />
                <Overview />
              </div>
              <div className="bottom-content">
                <Milestones />
                <TestRuns />
              </div>
            </>
          } />
          {/* <Route path="/todo" element={<TodoPage />} /> */}
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/testruns" element={<TestRuns />} />
          <Route path="/testruns/:id" element={<TestRuns />} />
          <Route path="/" element={
            <>
              <div className="main-content">
                <Sidebar />
                <Overview />
              </div>
              <div className="bottom-content">
                <Milestones />
                <TestRuns />
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;