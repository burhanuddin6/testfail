import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TestRuns.css";
import Popup from "./selectSuite";

// Mock data for test runs and test plans
const testRuns = [
  {
    id: 101,
    name: "Sprint 1 Regression",
    createdBy: "John Doe",
    date: "2024-08-05",
    progress: { passed: 92, blocked: 0, untested: 0, retest: 0, failed: 4, comments: 0, partial: 0 },
    type: "Test Run",
  },
  {
    id: 102,
    name: "Feature X Testing",
    createdBy: "Jane Smith",
    date: "2024-07-29",
    progress: { passed: 76, blocked: 1, untested: 0, retest: 0, failed: 23, comments: 0, partial: 0 },
    type: "Test Run",
  },
];

const testPlans = [
  {
    id: 201,
    name: "End-to-End Plan",
    createdBy: "Alice Johnson",
    date: "2024-08-02",
    progress: { passed: 85, blocked: 0, untested: 0, retest: 1, failed: 9, comments: 0, partial: 0 },
    type: "Test Plan",
  },
  {
    id: 202,
    name: "UI Component Plan",
    createdBy: "Bob Brown",
    date: "2024-07-25",
    progress: { passed: 68, blocked: 2, untested: 0, retest: 0, failed: 30, comments: 0, partial: 0 },
    type: "Test Plan",
  },
];

const TestRuns = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddTestRuns = (selectedOption, actionType) => {
    if (selectedOption) {
      if (actionType === "run") {
        navigate("/add-test-run?source=TestRuns", { state: { from: "/testruns", selectedOption } });
        setIsPopupVisible(false); // Ensure popup is closed
      }
    }
  };

  const handleAddTestPlan = (e) => {
    e.preventDefault();
    navigate("/add-test-plan", { state: { from: "/testruns" } });
  };

  const handleTestRunClick = (id, name) => {
    navigate(`/TestRunTestsResults?testRunId=${id}&testRunName=${encodeURIComponent(name)}`);
  };

  const handleTestPlanClick = (id, name) => {
    navigate(`/TestPlanStatus?testPlanId=${id}&testPlanName=${encodeURIComponent(name)}`);
  };

  const renderTestRunProgressBar = (progress) => {
    const total = progress.passed + progress.blocked + progress.untested + progress.retest + progress.failed + progress.comments + progress.partial;
    const passedPercentage = (progress.passed / total) * 100;
    const untestedPercentage = (progress.untested / total) * 100;
    const failedPercentage = (progress.failed / total) * 100;

    return (
      <div className="test-run-results-statusbar">
        <div className="test-run-results-progress-bar-passes" style={{ width: `${passedPercentage}%` }}></div>
        <div className="test-run-results-progress-bar-untested" style={{ width: `${untestedPercentage}%` }}></div>
        <div className="test-run-results-progress-bar-failed" style={{ width: `${failedPercentage}%` }}></div>
      </div>
    );
  };

  return (
    <div className="test-runs-results-page">
      <div className="test-runs-results-header">
        <div className="test-runs-results-main-heading">
          <h2>Test Runs & Results</h2>
          <div className="test-runs-result-button-class">
            <button className="test-runs-results-add-button" onClick={() => setIsPopupVisible(true)}>
              + Add Test Run
            </button>
            {isPopupVisible && (
              <Popup onConfirm={handleAddTestRuns} onCancel={() => setIsPopupVisible(false)} actionType="run" />
            )}
            <button className="test-runs-results-add-button" onClick={handleAddTestPlan}>
              + Add Test Plan
            </button>
            <button className="test-runs-results-delete-button">- Delete Selected</button>
          </div>
        </div>
        <p>
          <strong>187</strong> open and <strong>458</strong> completed test runs in this project
        </p>
      </div>

      <div className="test-run-results-listing">
        <div className="test-run-results">
          <h3 className="test-run-results-heading">Open</h3>
          <div className="test-run-results-scrollable">
            <div className="milestone-wise-test-run-details">
              <div className="test-run-result-milestone-name">Milestone Name</div>
              {testRuns.map((run) => (
                <div key={run.id} className="test-run-results-details">
                  <input type="checkbox" />
                  <p className="test-run-indicator">{run.type}</p>
                  <p>
                    <strong>
                      <a
                        href={`/TestRunTestsResults?testRunId=${run.id}&testRunName=${encodeURIComponent(run.name)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTestRunClick(run.id, run.name);
                        }}
                      >
                        {run.name}
                      </a>
                    </strong>
                    by {run.createdBy} on {run.date}
                    <br />
                    {run.progress.passed} Passed, {run.progress.blocked} Blocked, {run.progress.untested} Untested,{" "}
                    {run.progress.retest} Retest, {run.progress.failed} Failed, {run.progress.comments} Comments and{" "}
                    {run.progress.partial} Partial
                  </p>
                  {renderTestRunProgressBar(run.progress)}
                  <div className="test-run-results-progress-value">
                    {((run.progress.passed / (run.progress.passed + run.progress.failed)) * 100).toFixed(2)}%
                  </div>
                </div>
              ))}

              {testPlans.map((plan) => (
                <div key={plan.id} className="test-run-results-details">
                  <input type="checkbox" />
                  <p className="test-plan-indicator">{plan.type}</p>
                  <p>
                    <strong>
                      <a
                        href={`/TestPlanStatus?testPlanId=${plan.id}&testPlanName=${encodeURIComponent(plan.name)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTestPlanClick(plan.id, plan.name);
                        }}
                      >
                        {plan.name}
                      </a>
                    </strong>
                    by {plan.createdBy} on {plan.date}
                    <br />
                    {plan.progress.passed} Passed, {plan.progress.blocked} Blocked, {plan.progress.untested} Untested,{" "}
                    {plan.progress.retest} Retest, {plan.progress.failed} Failed, {plan.progress.comments} Comments and{" "}
                    {plan.progress.partial} Partial
                  </p>
                  {renderTestRunProgressBar(plan.progress)}
                  <div className="test-run-results-progress-value">
                    {((plan.progress.passed / (plan.progress.passed + plan.progress.failed)) * 100).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="test-run-results">
          <h3 className="test-run-results-heading">Completion Pending</h3>
          <div className="test-run-results-scrollable">
            {testRuns.map((run) => (
              <div key={run.id} className="test-run-results-details">
                <input type="checkbox" />
                <p className="test-run-indicator">{run.type}</p>
                <p>
                  <strong>
                    <a
                      href={`/TestRunTestsResults?testRunId=${run.id}&testRunName=${encodeURIComponent(run.name)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTestRunClick(run.id, run.name);
                      }}
                    >
                      {run.name}
                    </a>
                  </strong>
                  by {run.createdBy} on {run.date}
                  <br />
                  {run.progress.passed} Passed, {run.progress.blocked} Blocked, {run.progress.untested} Untested,{" "}
                  {run.progress.retest} Retest, {run.progress.failed} Failed, {run.progress.comments} Comments and{" "}
                  {run.progress.partial} Partial
                </p>
                {renderTestRunProgressBar(run.progress)}
                <div className="test-run-results-progress-value">
                  {((run.progress.passed / (run.progress.passed + run.progress.failed)) * 100).toFixed(2)}%
                </div>
              </div>
            ))}

            {testPlans.map((plan) => (
              <div key={plan.id} className="test-run-results-details">
                <input type="checkbox" />
                <p className="test-plan-indicator">{plan.type}</p>
                <p>
                  <strong>
                    <a
                      href={`/TestPlanStatus?testPlanId=${plan.id}&testPlanName=${encodeURIComponent(plan.name)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTestPlanClick(plan.id, plan.name);
                      }}
                    >
                      {plan.name}
                    </a>
                  </strong>
                  by {plan.createdBy} on {plan.date}
                  <br />
                  {plan.progress.passed} Passed, {plan.progress.blocked} Blocked, {plan.progress.untested} Untested,{" "}
                  {plan.progress.retest} Retest, {plan.progress.failed} Failed, {plan.progress.comments} Comments and{" "}
                  {plan.progress.partial} Partial
                </p>
                {renderTestRunProgressBar(plan.progress)}
                <div className="test-run-results-progress-value">
                  {((plan.progress.passed / (plan.progress.passed + plan.progress.failed)) * 100).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="test-run-results">
          <h3 className="test-run-results-heading">Completed</h3>
          <div className="test-run-results-scrollable">
            {testRuns.map((run) => (
              <div key={run.id} className="date-wise-test-run-details">
                <div className="test-run-result-date">{run.date}</div>
                <div className="test-run-results-details">
                  <div className="test-run-results-name">
                    <a
                      href={`/TestRunTestsResults?testRunId=${run.id}&testRunName=${encodeURIComponent(run.name)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTestRunClick(run.id, run.name);
                      }}
                    >
                      {run.name}
                    </a>
                  </div>
                  <div className="test-run-results-completion-value">
                    {((run.progress.passed / (run.progress.passed + run.progress.failed)) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}

            {testPlans.map((plan) => (
              <div key={plan.id} className="date-wise-test-run-details">
                <div className="test-run-result-date">{plan.date}</div>
                <div className="test-run-results-details">
                  <div className="test-run-results-name">
                    <a
                      href={`/TestPlanStatus?testPlanId=${plan.id}&testPlanName=${encodeURIComponent(plan.name)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTestPlanClick(plan.id, plan.name);
                      }}
                    >
                      {plan.name}
                    </a>
                  </div>
                  <div className="test-run-results-completion-value">
                    {((plan.progress.passed / (plan.progress.passed + plan.progress.failed)) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRuns;
