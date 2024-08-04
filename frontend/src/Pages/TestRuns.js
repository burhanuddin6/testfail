import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/TestRuns.css";
import Popup from "./selectSuite";

const TestRuns = () => {

  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddTestRuns = (selectedOption, actionType) => {
    if (selectedOption) {
      if (actionType === 'run'){
        navigate('/add-test-run?source=TestRuns', { state: { from: '/testruns', selectedOption } });
        setIsPopupVisible(false);  // Ensure popup is closed
      }
    }
  };

  const handleAddTestPlan = (e) => {
    e.preventDefault();
    navigate('/add-test-plan', { state: { from: '/testruns'}});
  }

  return (
    <div className="test-runs-results-page">
      <div className="test-runs-results-header">
        <div className='test-runs-results-main-heading'>
              <h2>Test Runs & Results</h2>
              <div className='test-runs-result-button-class'>
                  <button className="test-runs-results-add-button" onClick={() => setIsPopupVisible(true)}> + Add Test Run</button>
                  {isPopupVisible && (
                  <Popup
                    onConfirm={handleAddTestRuns}
                    onCancel={() => setIsPopupVisible(false)}
                    actionType="run"
                  />
                )}
                  <button className="test-runs-results-add-button" onClick={handleAddTestPlan}> + Add Test Plan </button>
                  <button className="test-runs-results-delete-button"> - Delete Selected</button>
              </div>
        </div>
        <p><strong>187</strong> open and <strong>458</strong> completed test runs in this project</p>
      </div>

      <div className='test-run-results-listing'>
          <div className='test-run-results'>
            <h3 className='test-run-results-heading'> Open</h3>
            <div className='test-run-results-scrollable'>

              <div className="milestone-wise-test-run-details">
                <div className="test-run-result-milestone-name">Milestone Name</div>
                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong><a
                                href={`/TestRunTestsResults`}
                                
                            >
                                Name
                            </a></strong>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '16%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>

                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-suite-indicator">Test Suite</p>
                    <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>
              </div>
            </div>
          </div>

          <div className='test-run-results'>
            <h3 className='test-run-results-heading'> Completion Pending </h3>
            <div className='test-run-results-scrollable'>

                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-run-indicator">Test Run</p>
                    <p><strong><a
                                href={`/TestRunTestsResults`}
                            >
                                Name
                            </a></strong>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '16%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>

                <div className="test-run-results-details">
                    <input type="checkbox"/>
                    <p className="test-suite-indicator">Test Suite</p>
                    <p><strong>Name</strong><br></br>by ... on ...<br></br>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial</p>
                    <div className="test-run-results-statusbar">
                        <div className="test-run-results-progress-bar-passes" style={{ width: '42%' }}> </div>
                        <div className="test-run-results-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="test-run-results-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="test-run-results-progress-value">42%</div>
                </div>
              </div>
            </div>
          

            <div className='test-run-results'>
            <h3 className='test-run-results-heading'> Completed </h3>
            <div className='test-run-results-scrollable'>

              <div className="date-wise-test-run-details">
                <div className="test-run-result-date">Date</div>
                <div className="test-run-results-details">
                  <div className="test-run-results-name">Name</div>
                  <div className="test-run-results-completion-value">92%</div>
                </div>

                <div className="test-run-results-details">
                  <div className="test-run-results-name">Name</div>
                  <div className="test-run-results-completion-value">100%</div>
                </div>

              </div>
            
              <div className="date-wise-test-run-details">
                <div className="test-run-result-date">Date</div>
                <div className="test-run-results-details">
                  <div className="test-run-results-name">Name</div>
                  <div className="test-run-results-completion-value">84%</div>
                </div>

                <div className="test-run-results-details">
                  <div className="test-run-results-name">Name</div>
                  <div className="test-run-results-completion-value">96%</div>
                </div>

              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default TestRuns;
