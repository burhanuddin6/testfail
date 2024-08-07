import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import "../styles/TestPlanStatus.css";

const TestPlanStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const testPlanId = searchParams.get("testPlanId") || "0"; // Default to '0' if no testRunId is provided
  const testPlanName = searchParams.get("testPlanName") || "Test Plan"; // Default to 'Test Plan' if no testPlanName is provided

  // State to hold test case data
  const [testCaseData, setTestCaseData] = useState({
    passed: 0,
    blocked: 0,
    retest: 0,
    failed: 0,
    untested: 0,
  });

  // State to hold test runs data
  const [testRuns, setTestRuns] = useState([]);

  // Example data for pie chart
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`test_plans/${testPlanId}/`);
        const data = response.data;
        console.log(data)
        // Update test case data
        setTestCaseData({
          passed: data.number_of_passed_test_cases,
          blocked: data.number_of_blocked_test_cases,
          retest: 0, // Assuming retest is not available in the API response
          failed: data.number_of_failed_test_cases,
          untested: data.number_of_untested_test_cases,
        });

        // Update test runs data
        const updatedTestRuns = data.test_plan_test_runs.map((testRun) => ({
          id: testRun.test_run_info.test_run_id,
          name: testRun.test_run_info.test_run_name,
          progress: {
            passed: testRun.test_run_info.number_of_passed_test_cases,
            blocked: testRun.test_run_info.number_of_blocked_test_cases,
            untested: testRun.test_run_info.number_of_untested_test_cases,
            retest: 0, // Assuming retest is not available in the API response
            failed: testRun.test_run_info.number_of_failed_test_cases,
          },
        }));

        setTestRuns(updatedTestRuns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [testPlanId]);

  useEffect(() => {
    // Calculate percentages for pie chart
    const totalCases = Object.values(testCaseData).reduce(
      (sum, val) => sum + val,
      0
    );
    const updatedPieChartData = Object.entries(testCaseData).map(
      ([key, value]) => ({
        name: key,
        value,
        percentage: ((value / totalCases) * 100).toFixed(0),
      })
    );

    setPieChartData(updatedPieChartData);
  }, [testCaseData]);

  const handleTestRunClick = (testRunId, testRunName) => {
    navigate(
      `/TestRunTestsResults?testPlanId=${testPlanId}&testPlanName=${encodeURIComponent(
        testPlanName
      )}&testRunId=${testRunId}&testRunName=${encodeURIComponent(testRunName)}`
    );
  };

  const renderTestRunProgressBar = (progress) => {
    const total =
      progress.passed +
      progress.blocked +
      progress.untested +
      progress.retest +
      progress.failed;
    console.log()
    const passedPercentage = 0;
    const untestedPercentage = 0;
    const failedPercentage = 0;
    if (total != 0) {
      passedPercentage = (progress.passed / total) * 100;
      untestedPercentage = (progress.untested / total) * 100;
      failedPercentage = (progress.failed / total) * 100;
    }
    return (
      <div className="status-testrun-statusbar">
        <div
          className="status-testrun-progress-bar-passed"
          style={{ width: `${passedPercentage}%` }}
        ></div>
        <div
          className="status-testrun-progress-bar-untested"
          style={{ width: `${untestedPercentage}%` }}
        ></div>
        <div
          className="status-testrun-progress-bar-failed"
          style={{ width: `${failedPercentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="test-plan-status-page">
      <div className="test-plan-status-header">
        <h2>{`R${testPlanId} - ${testPlanName}`}</h2>
        <div className="test-plan-status-actions">
          <button className="edit-test-run-link">Export</button>
          <button className="edit-test-run-link">Edit</button>
        </div>
      </div>

      <div className="test-plan-status-content">
        <div className="test-plan-status-stats">
          <div className="test-plan-status-pie-chart">
            <div className="pie-chart-container">
              <svg viewBox="0 0 100 100">
                {pieChartData.map((data, index) => (
                  <path
                    key={index}
                    d={`M50 50 L${
                      50 +
                      45 *
                        Math.cos(
                          ((index / pieChartData.length) * 360 * Math.PI) / 180
                        )
                    } ${
                      50 +
                      45 *
                        Math.sin(
                          ((index / pieChartData.length) * 360 * Math.PI) / 180
                        )
                    } A45 45 0 ${
                      index === pieChartData.length - 1 ? "1" : "0"
                    } 1 ${
                      50 +
                      45 *
                        Math.cos(
                          (((index + 1) / pieChartData.length) * 360 * Math.PI) /
                            180
                        )
                    } ${
                      50 +
                      45 *
                        Math.sin(
                          (((index + 1) / pieChartData.length) * 360 * Math.PI) /
                            180
                        )
                    }`}
                    fill={`hsl(${
                      (index * 360) / pieChartData.length
                    }, 90%, 50%)`}
                  />
                ))}
              </svg>
              <div className="pie-chart-legend">
                {pieChartData.map((data) => (
                  <div key={data.name}>
                    <span
                      style={{
                        backgroundColor: `hsl(${
                          (pieChartData.findIndex(
                            (item) => item.name === data.name
                          ) *
                            360) /
                          pieChartData.length
                        }, 70%, 50%)`,
                      }}
                    ></span>
                    {data.name}: {20}%
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="status-testruns-header">
            <h2> Test Runs </h2>
          </div>

          <div className="status-testrun-details-class">
            {testRuns.map((run) => (
              <div key={run.id} className="status-testrun-details">
                <input type="checkbox" />
                <p>
                  <strong>
                    <a
                      href={`/TestRunTestsResults?testPlanId=${testPlanId}&testPlanName=${encodeURIComponent(
                        testPlanName
                      )}&testRunId=${run.id}&testRunName=${encodeURIComponent(
                        run.name
                      )}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTestRunClick(run.id, run.name);
                      }}
                    >
                      {run.name}
                    </a>
                  </strong>
                  {run.progress.passed} Passed, {run.progress.blocked} Blocked,{" "}
                  {run.progress.untested} Untested, {run.progress.retest} Retest,{" "}
                  {run.progress.failed} Failed
                  <br />
                </p>
                {renderTestRunProgressBar(run.progress)}
                <div className="status-testrun-progress-value">
                  {((( (run.progress.passed + run.progress.failed) === 0) ? 0 : (run.progress.passed / (run.progress.passed + run.progress.failed))) * 100).toFixed(1)} %
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="test-case-sidebar">
          <section className="sidebar-section">
            <h3 className="sidebar-title">
              <Link
                to={`/TestPlanStatus?testPlanId=${testPlanId}&testPlanName=${encodeURIComponent(
                  testPlanName
                )}`}
                className="sidebar-link"
              >
                Status
              </Link>
            </h3>
            <ul className="sidebar-links">
              <li>
                <Link
                  to={`/milestone-activity?testPlanId=${testPlanId}&testPlanName=${encodeURIComponent(
                    testPlanName
                  )}&source=TestPlanStatus`}
                  className="sidebar-link"
                >
                  Activity
                </Link>
              </li>
              <li>
                <Link
                  to={`/milestone-progress?testPlanId=${testPlanId}&testPlanName=${encodeURIComponent(
                    testPlanName
                  )}&source=TestPlanStatus`}
                  className="sidebar-link"
                >
                  Progress
                </Link>
              </li>
              <li>
                <Link
                  to={`/milestone-defect?testPlanId=${testPlanId}&testPlanName=${encodeURIComponent(
                    testPlanName
                  )}&source=TestPlanStatus`}
                  className="sidebar-link"
                >
                  Defects
                </Link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TestPlanStatus;
