import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/TestRunTestsResults.css";
import { fetchTestRunData } from "../api/TestRun";

const TestRunTestsResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testRunId = searchParams.get("testRunId") || "0";
  const testRunName = searchParams.get("testRunName") || "Test Run";
  const suiteId = searchParams.get("suiteId") || "0";
  const suiteName = searchParams.get("suite") || "Test Suite";
  const navigate = useNavigate();

  const [testRunData, setTestRunData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestRun = async () => {
      try {
        const data = await fetchTestRunData(testRunId);
        setTestRunData(data);
      } catch (error) {
        console.error("Error fetching test run data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestRun();
  }, [testRunId]);

  const handleTestCaseClick = (testCase) => {
    navigate(
      `/TestCaseDetails?suiteId=${suiteId}&suite=${encodeURIComponent(
        suiteName
      )}&testRunId=${testRunId}&testRunName=${encodeURIComponent(
        testRunName
      )}&testCaseId=${testCase.id}&testCaseName=${encodeURIComponent(
        testCase.title
      )}`
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!testRunData) {
    return <div>No data available</div>;
  }

  const { test_case_results: testCases } = testRunData;

  // Calculate pie chart data
  const testCaseData = testCases.reduce(
    (acc, testCase) => {
      acc[testCase.status.toLowerCase()] += 1;
      return acc;
    },
    { passed: 0, blocked: 0, retest: 0, failed: 0, untested: 0 }
  );

  const totalCases = Object.values(testCaseData).reduce((sum, val) => sum + val, 0);
  const pieChartData = Object.entries(testCaseData).map(([key, value]) => ({
    name: key,
    value,
    percentage: ((value / totalCases) * 100).toFixed(0),
  }));

  return (
    <div className="test-run-tests-results-page">
      <div className="test-run-tests-results-header">
        <h2>{`R${testRunId} - ${testRunName}`}</h2>
        <div className="test-run-tests-results-actions">
          <Link
            to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}`}
            className="add-case-button"
          >
            Suite
          </Link>
          <button className="edit-test-run-link">Export</button>
        </div>
      </div>

      <div className="test-run-tests-results-content">
        <div className="test-run-tests-results-stats">
          <div className="test-run-tests-results-pie-chart">
            {/* Pie chart component here */}
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
          <div className="test-run-tests-results-test-cases">
            <div className="test-run-tests-results-section">
              <h3 className="test-run-tests-results-section-name">
                General Cases
              </h3>
            </div>
            <div className="test-run-tests-results-summary">
              <span>Contains {testCases.length} test cases.</span>
            </div>
            <div className="test-run-tests-results-test-cases-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Assigned To</th>
                    <th>Defects</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((testCase, index) => (
                    <tr key={index}>
                      <td>{testCase.id}</td>
                      <td>
                        <Link
                          to={`/TestCaseDetails?suiteId=${suiteId}&suite=${encodeURIComponent(
                            suiteName
                          )}&testRunId=${testRunId}&testRunName=${encodeURIComponent(
                            testRunName
                          )}&testCaseId=${testCase.id}&testCaseName=${encodeURIComponent(
                            testCase.title
                          )}`}
                          className="test-case-title"
                          onClick={() => handleTestCaseClick(testCase)}
                        >
                          {testCase.title}
                        </Link>
                      </td>
                      <td>{testCase.assigned_to || "N/A"}</td>
                      <td>
                        {testCase.defects && testCase.defects.length > 0 && (
                          <ul className="test-case-defects">
                            {testCase.defects.map((defect) => (
                              <li key={defect}>{defect}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>
                        <select
                          className={`test-case-status ${testCase.status}`}
                          defaultValue={testCase.status}
                        >
                          <option value="Passed">Passed</option>
                          <option value="Blocked">Blocked</option>
                          <option value="Retest">Retest</option>
                          <option value="Failed">Failed</option>
                          <option value="Comments">Comments</option>
                          <option value="Partial">Partial</option>
                        </select>
                      </td>
                      <td>{/* Add any other actions here like edit/delete */}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <aside className="test-case-sidebar">
          <section className="sidebar-section">
            <h3 className="sidebar-title">
              <Link
                to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}`}
                className="sidebar-link"
              >
                Tests & Results
              </Link>
            </h3>
            <ul className="sidebar-links">
              <li>
                <Link
                  to={`/milestone-activity?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&source=TestRunTestsResults`}
                  className="sidebar-link"
                >
                  Activity
                </Link>
              </li>
              <li>
                <Link
                  to={`/milestone-progress?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&source=TestRunTestsResults`}
                  className="sidebar-link"
                >
                  Progress
                </Link>
              </li>
              <li>
                <Link
                  to={`/milestone-defect?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&source=TestRunTestsResults`}
                  className="sidebar-link"
                >
                  Defects
                </Link>
              </li>
            </ul>
          </section>
          <section className="sidebar-section">
            <div className="sidebar-header">
              <h3>Sections</h3>
            </div>
            <ul>
              {testRunData.sections &&
                testRunData.sections.map((section, index) => (
                  <li key={index}>
                    <Link
                      to={`/TestRunTestsResults?suiteId=${suiteId}&suite=${suiteName}&testRunId=${testRunId}&testRunName=${testRunName}&sectionId=${section.id}`}
                      className="sidebar-link"
                    >
                      {section.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TestRunTestsResults;
