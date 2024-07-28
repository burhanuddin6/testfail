import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUserDetails } from './api/Auth';
import { setToken } from './utilities/globals';


// components 
import Header from './components/Header';
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
import NotFound from './Pages/NotFound';

const App = () => {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
        setToken(token); // Update the global token
        const details = await getUserDetails(token);
        setUserName(details.first_name + " " + details.last_name);
        setUserID(details.id);
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
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Forgot" element={<Forgot />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/Dashboard" element={<Dashboard userName={userName} />} />
            <Route
              path="/overview/:projectId"
              element={
                <>
                  <Header userName={userName} />
                  <Overview/>
                </>
              }
            />
            <Route
              path="/todo/:projectId"
              element={
                <>
                  <Header userName={userName} />
                  <TodoPage />
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
              path="/testsuitscases"
              element={
                <>
                  <Header userName={userName} />
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
              path="/TestRuns"
              element={
                <>
                  <Header userName={userName} />
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
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
