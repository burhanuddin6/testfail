import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/TestPlanStatus.css";

const TestPlanStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const testPlanId = searchParams.get("testPlanId") || "0"; // Default to '0' if no testRunId is provided
  const testPlanName = searchParams.get("testPlanName") || "Test Plan"; // Default to 'Test Run' if no testRunName is pr

  // State to hold test case data
  const [testCaseData, setTestCaseData] = useState({
    passed: 92,
    blocked: 0,
    retest: 0,
    failed: 4,
    untested: 0,
  });

  // Example data for pie chart
  const [pieChartData, setPieChartData] = useState([]);

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

  return (
    <div className="test-plan-status-page">
      <div className="test-plan-status-header">
        <h2>R14040 - Appliance (Pod) – 1.119 – App3 Sanity</h2>
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
                          ((index / pieChartData.length) * 360 * Math.PI) /
                            180
                        )
                    } ${
                      50 +
                      45 *
                        Math.sin(
                          ((index / pieChartData.length) * 360 * Math.PI) /
                            180
                        )
                    } A45 45 0 ${index === pieChartData.length - 1 ? "1" : "0"} 1 ${
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
                    {data.name}: {data.percentage}%
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="status-testruns-header">
                <h2> Test Runs </h2>
                {/* <div className="status-delete-testrun">
                    <button > Delete Selected </button>
                </div> */}
            </div>

            <div className="status-testrun-details-class">
                <div className="status-testrun-details">
                    <input type="checkbox"/>
                    <p><strong><a
                                href={`/TestRunTestsResults`}
                            >
                                Test Run Name
                            </a></strong>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial<br></br></p>
                    <div className="status-testrun-statusbar">
                        <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}> </div>
                        <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="status-testrun-progress-value">42%</div>
                </div>
            </div>

            <div className="status-testrun-details-class">
                <div className="status-testrun-details">
                    <input type="checkbox"/>
                    <p><strong><a
                                href={`/TestRunTestsResults`}
                            >
                                Test Run Name
                            </a></strong>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial<br></br></p>
                    <div className="status-testrun-statusbar">
                        <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}> </div>
                        <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="status-testrun-progress-value">42%</div>
                </div>
            </div>

            <div className="status-testrun-details-class">
                <div className="status-testrun-details">
                    <input type="checkbox"/>
                    <p><strong><a
                                href={`/TestRunTestsResults`}
                            >
                                Test Run Name
                            </a></strong>92 Passed, 0 Blocked, 0 Untested, 0 Retest, 4 Failed, 0 Comments and 0 Partial<br></br></p>
                    <div className="status-testrun-statusbar">
                        <div className="status-testrun-progress-bar-passed" style={{ width: '42%' }}> </div>
                        <div className="status-testrun-progress-bar-untested" style={{ width: '16%' }}> </div>
                        <div className="status-testrun-progress-bar-failed" style={{ width: '42%' }}> </div>
                    </div>
                    <div className="status-testrun-progress-value">42%</div>
                </div>
            </div>


          {/* <div className="test-plan-status-summary">
            <div className="test-plan-status-summary-text">
              96% passed
            </div>
            <div className="test-plan-status-summary-text">
              0/96 untested (0%).
            </div>
          </div> */}


        </div>
        <aside className="test-case-sidebar">
        <section className="sidebar-section">
            <h3 className="sidebar-title">
              <Link
                to={`/TestPlanStatus?testPlanId=${testPlanId}&testPlanName=${testPlanName}`}
                className="sidebar-link"
              >
                Status
              </Link>
            </h3>
            <ul className="sidebar-links">
              <li>
                <Link
                  to={`/milestone-activity?testPlanId=${testPlanId}&testPlanName=${testPlanName}&source=TestPlanStatus`}
                  className="sidebar-link"
                >
                  Activity
                </Link>
              </li>
              <li>
                <Link
                  to={`/milestone-progress?testPlanId=${testPlanId}&testPlanName=${testPlanName}&source=TestPlanStatus`}
                  className="sidebar-link"
                >
                  Progress
                </Link>
              </li>
              <li>
                <Link
                  to={`/milestone-defect?testPlanId=${testPlanId}&testPlanName=${testPlanName}&source=TestPlanStatus`}
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