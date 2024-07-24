// // import React, { useState }  from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import SignUp from './components/SignUp';
// // import Login from './components/Login';
// // import Forgot from './components/Forgot';
// // import EmailVerification from './components/EmailVerification'; 
// // import Dashboard from './components/Dashboard';

// // -------------
// // Batool App.js
// // --------------

// // import React, { useState }  from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import SignUp from './components/SignUp';
// // import Login from './components/Login';
// // import Forgot from './components/Forgot';
// // import EmailVerification from './components/EmailVerification';
// // import Dashboard from './components/Dashboard';


// // const App = () => {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/SignUp" element={<SignUp />} />
// //         <Route path="/Forgot" element={<Forgot />} />
//           //  <Route path="/verify-email" element={<EmailVerification />} />
// //         <Route path="/Dashboard" element={<Dashboard />} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;

// // -------------
// // Farhan App.js
// // --------------

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Overview from './components/Overview';
// // import TodoPage from './components/TodoPage';
// import Milestones from './components/Milestones';
// import TestRuns from './components/TestRuns';
// import './App.css';

// const App = () => {
//   const userName = 'Zainab Turabi';

//   return (
//     <Router>
//       <div className="app">
//         <Header userName={userName} />
//         <Routes>
//           <Route path="/overview" element={
//             <>
//               <div className="main-content">
//                 <Sidebar />
//                 <Overview />
//               </div>
//               <div className="bottom-content">
//                 <Milestones />
//                 <TestRuns />
//               </div>
//             </>
//           } />
//           {/* <Route path="/todo" element={<TodoPage />} /> */}
//           <Route path="/milestones" element={<Milestones />} />
//           <Route path="/testruns" element={<TestRuns />} />
//           <Route path="/testruns/:id" element={<TestRuns />} />
//           <Route path="/" element={
//             <>
//               <div className="main-content">
//                 <Sidebar />
//                 <Overview />
//               </div>
//               <div className="bottom-content">
//                 <Milestones />
//                 <TestRuns />
//               </div>
//             </>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// Updated Integrated Routes

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Overview from './components/Overview';
// import TodoPage from './components/TodoPage';
// import Milestones from './components/Milestones';
// import TestRuns from './components/TestRuns';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import Forgot from './components/Forgot';
// import EmailVerification from './components/EmailVerification';
// import Dashboard from './components/Dashboard';
// import './App.css';

// const App = () => {
//   const userName = 'Zainab Turabi';

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/Forgot" element={<Forgot />} />
//         <Route path="/verify-email" element={<EmailVerification />} />

//         {/* Private Routes */}
//         <Route path="/Dashboard" element={<Dashboard />} />
//         <Route path="/overview" element={
//           <>
//             <Header userName={userName} />
//             <div className="main-content">
//               <Sidebar />
//               <Overview />
//             </div>
//             <div className="bottom-content">
//               <Milestones />
//               <TestRuns />
//             </div>
//           </>
//         } />
//         <Route path="/todo" element={
//           <>
//             <Header userName={userName} />
//             <div className="main-content">
//               <Sidebar />
//               <TodoPage />
//             </div>
//           </>
//         } />
//         <Route path="/milestones" element={
//           <>
//             <Header userName={userName} />
//             <div className="main-content">
//               <Sidebar />
//               <Milestones />
//             </div>
//           </>
//         } />
//         <Route path="/testruns" element={
//           <>
//             <Header userName={userName} />
//             <div className="main-content">
//               <Sidebar />
//               <TestRuns />
//             </div>
//           </>
//         } />
//         <Route path="/testruns/:id" element={
//           <>
//             <Header userName={userName} />
//             <div className="main-content">
//               <Sidebar />
//               <TestRuns />
//             </div>
//           </>
//         } />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './Pages/Overview';
import TodoPage from './Pages/TodoPage';
import MilestonesPage from './Pages/Milestones';
import Milestones from './components/Milestones';
import TestRuns from './components/TestRuns';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Forgot from './Pages/Forgot';
import EmailVerification from './Pages/EmailVerification';
import Dashboard from './Pages/Dashboard';
import AddMilestone from './Pages/AddMilestones';
import TestSuitesCases from './Pages/TestSuitsCases';

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
        <Route path="/Dashboard" element={<Dashboard userName={userName} />} />
        <Route
          path="/overview/:projectId"
          element={
            <>
              <Header userName={userName} />
              <div className="main-content">
                <Sidebar />
                <Overview />
              </div>
              <div className="bottom-content">
                <Milestones />
                <TestRuns />
              </div>
            </>
          }
        />
        <Route
          path="/todo/:projectId"
          element={
            <>
              <Header userName={userName} />
              <div className="main-content">
                <TodoPage />
              </div>
            </>
          }
        />
        <Route
          path="/milestones"
          element={
            <>
              <Header userName={userName} />
              <MilestonesPage />
            </>
          }
        />
        <Route 
          path="/AddMilestone" 
          element={
            <>
              <Header userName={userName} />
              <AddMilestone  />
            </>
          }
        />
        <Route
          path="/testsuitscases"
          element={
            <>
              <Header userName={userName} />
              <TestSuitesCases />
            </>
          }
        />
        <Route
          path="/testruns"
          element={
            <>
              <Header userName={userName} />
              <div className="main-content">
                <Sidebar />
                <TestRuns />
              </div>
            </>
          }
        />
        <Route
          path="/testruns/:id"
          element={
            <>
              <Header userName={userName} />
              <div className="main-content">
                <Sidebar />
                <TestRuns />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;