import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { fetchProjectByID } from './api/Project';
import { setProjectInfo, setToken } from './utilities/globals';


// components 
import Header from './components/Header';
import HeaderWrapper from './components/HeaderWrapper';
import TestRuns from './components/TestRuns';

// pages
import Overview from './Pages/Overview';
import TodoPage from './Pages/TodoPage';
import MilestonesPage from './Pages/Milestones';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Forgot from './Pages/Forgot';
import EmailVerification from './Pages/EmailVerification';
import Dashboard from './Pages/Dashboard';
import AddMilestone from './Pages/AddMilestones';
import MilestonesStatus from './Pages/MilestonesStatus';
import MilestonesActivity from './Pages/MilestonesActivity';
import MilestonesProgress from './Pages/MilestonesProgress';
import MilestonesDefect from './Pages/MilestonesDefect';
import TestSuitesCases from './Pages/TestSuitsCases';
import AddTestRun from './Pages/AddTestRun';
import TestRunsPage from './Pages/TestRuns';
import AddTestSuite from './Pages/AddTestSuite';
import EditTestSuite from './Pages/EditTestSuite';
import SectionsCases from './Pages/SectionsCases';
import AddTestCase from './Pages/AddTestCase';
import AddSection from './Pages/AddSection';
import NotFound from './Pages/NotFound';


const App = () => {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      const token = sessionStorage.getItem("token");
      const projectID = sessionStorage.getItem("projectID");

      if (token) {

        setIsLoggedIn(true);
        setToken(token); // Update the global token //REVIEW USAGE
      
        const storedUserName = sessionStorage.getItem("user_name");
        const storedUserID = sessionStorage.getItem("user_id");
      
        if (storedUserName && storedUserID) {
          
          setUserName(storedUserName);
          setUserID(storedUserID);
          console.log("USER DETAILS LOADED FROM SESSION STORAGE");
        } 
      }

      if(projectID && projectID != "undefined"){
        const payload = await fetchProjectByID(projectID);
        setProjectInfo(projectID, payload.name); 
      }
    }
    getDetails();
  }, []); // Runs once when the component mounts


  return (
    <BrowserRouter>
      <Routes>

        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard userName={userName} />} />
            <Route
              path="projects/overview" //URL CHANGES
              element={
                <>
                  <Header userName={userName}/>
                  <Overview/>
                </>
              }
            />
            <Route
              path="/todos/overview" //URL CHANGES
              element={
                <>
                  <Header userName={userName} />
                  <TodoPage />
                </>
              }
            />
            <Route
              path="/milestones/overview" //URL CHANGES
              element={
                <>
                  <Header userName={userName}/>
                  {/* <HeaderWrapper userName={userName} /> */}
                  <MilestonesPage />
                </>
              }
            />
            <Route 
              path="/add-milestone" 
              element={
                <>
                  <Header userName={userName} />
                  <AddMilestone userID={userID} />
                </>
              }
            />
            <Route
              path="/milestone-status" 
              element={
                <>
                  <Header userName={userName} />
                  <MilestonesStatus  />
                </>
              }
            />
            <Route
              path="/milestone-activity" 
              element={
                <>
                  <Header userName={userName} />
                  <MilestonesActivity  />
                </>
              }
            />
            <Route
              path="/milestone-progress" 
              element={
                <>
                  <Header userName={userName} />
                  <MilestonesProgress />
                </>
              }
            />
            <Route
              path="/milestone-defect" 
              element={
                <>
                  <Header userName={userName} />
                  <MilestonesDefect />
                </>
              }
            />
            <Route
              path="/suites/overview"
              element={
                <>
                  <Header userName={userName} /> 
                  {/* <HeaderWrapper userName={userName} /> */}
                  <TestSuitesCases />
                </>
              }
            />
            <Route 
              path="/AddTestRun" 
              element={
                <>
                  <Header userName={userName} />
                  <AddTestRun userID={userID} />
                </>
              }
            />
            <Route
              path="/runs/overview" //URL CHANGES
              element={
                <>
                  <Header userName={userName} />
                  {/* <HeaderWrapper userName={userName} /> */}
                  <TestRunsPage />
                </>
              }
            />
            <Route 
              path="/AddTestSuite" 
              element={
                <>
                  <Header userName={userName} />
                  <AddTestSuite />
                </>
              }
            />
            <Route 
              path="/EditTestSuite" 
              element={
                <>
                  <Header userName={userName} />
                  <EditTestSuite />
                </>
              }
            />
            {/* <Route //REVIEW USAGE
              path="/testruns"
              element={
                <>
                  <Header userName={userName} />
                  <div className="main-content">
                    <TestRuns />
                  </div>
                </>
              }
            /> */}
            <Route 
              path="/SectionsCases" 
              element={
                <>
                  <Header userName={userName} />
                  <SectionsCases />
                </>
              }
            />
            <Route 
              path="/AddTestCase" 
              element={
                <>
                  <Header userName={userName} />
                  <AddTestCase />
                </>
              }
            />
            <Route 
              path="/AddSection" 
              element={
                <>
                  <Header userName={userName} />
                  <AddSection />
                </>
              }
            />
            <Route
              path="/testruns/:id"
              element={
                <>
                  <Header userName={userName} />
                  <div className="main-content">
                    <TestRuns />
                  </div>
                </>
              }
            />
            <Route
              path="/TestRuns"
              element={
                <>
                  <Header userName={userName} />
                  <div className="main-content">
                    <TestRunsPage />
                  </div>
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
