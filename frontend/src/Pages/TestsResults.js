import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import '../styles/TestsResults.css';

const testResults = [
  {
    date: 'April 2021',
    results: [
      {
        status: 'Passed',
        id: 'T21499',
        suite: 'O_ General UI Testcases',
        release: 'Content Classification 1.43',
        type: 'Release 1.43',
        testedBy: 'Reviewer',
      },
      {
        status: 'Passed',
        id: 'T2147876',
        suite: 'O_ General UI Testcases',
        release: 'Consent Management 1.43 regression',
        type: 'Regression',
        testedBy: 'Reviewer',
      },
    ],
  },
  {
    date: 'March 2021',
    results: [
      {
        status: 'Passed',
        id: 'T1972863',
        suite: 'O_ General UI Testcases',
        release: 'Content Classification 1.40',
        type: 'Release 1.40',
        testedBy: 'Reviewer',
      },
    ],
  },
  {
    date: 'April 2021',
    results: [
      {
        status: 'Passed',
        id: 'T21499',
        suite: 'O_ General UI Testcases',
        release: 'Content Classification 1.43',
        type: 'Release 1.43',
        testedBy: 'Reviewer',
      },
      {
        status: 'Passed',
        id: 'T2147876',
        suite: 'O_ General UI Testcases',
        release: 'Consent Management 1.43 regression',
        type: 'Regression',
        testedBy: 'Reviewer',
      },
    ],
  },
  
  // Add more data here as per the screenshot
];

const TestsResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testCaseId = searchParams.get('testCaseId') || 'N/A';
  const testCaseName = decodeURIComponent(searchParams.get('testCaseName')) || 'N/A';
  const suiteName = searchParams.get('suite') || 'General UI Testcases';
  const suiteId = searchParams.get('suiteId') || '0';
  const sectionName = searchParams.get('section') || 'General Cases';
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Passed', 'Blocked', 'Retest', 'Failed', 'Comments', 'Partial'],
          datasets: [
            {
              label: 'Test Results',
              data: [10, 2, 3, 1, 0, 0], // Dummy data, replace with actual data
              backgroundColor: [
                'rgba(92, 184, 92, 0.2)',
                'rgba(240, 173, 78, 0.2)',
                'rgba(91, 192, 222, 0.2)',
                'rgba(217, 83, 79, 0.2)',
                'rgba(119, 119, 119, 0.2)',
                'rgba(119, 119, 119, 0.2)',
              ],
              borderColor: [
                'rgba(92, 184, 92, 1)',
                'rgba(240, 173, 78, 1)',
                'rgba(91, 192, 222, 1)',
                'rgba(217, 83, 79, 1)',
                'rgba(119, 119, 119, 1)',
                'rgba(119, 119, 119, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartRef]);

  return (
    <div className="tests-results-container">
      <div className="test-case-details-content">
      <div className='test-case-left-side'>
          <div className='test-case-header-class'>
            <div className="test-case-header">
              <div className="test-case-id">{testCaseId}</div>
              <h1 className="test-case-name">{testCaseName}</h1>
              <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestsResults`} className="edit-case-link">Edit</Link>
            </div>
              <Link
                to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`}
                className="breadcrumb-link"
              >
                {suiteName} &gt; {sectionName}
              </Link> 
          </div>

          <div className="results-summary">
          <div className="results-graph">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="results-status-summary">
            <span>In the past 30 days:</span>
            <ul>
              <li className="passed">0 Passed</li>
              <li className="blocked">0 Blocked</li>
              <li className="retest">0 Retest</li>
              <li className="failed">0 Failed</li>
              <li className="comments">0 Comments</li>
              <li className="partial">0 Partial</li>
            </ul>
          </div>
        </div>

        <div className="test-results-list-scroll">
          <h2 className="test-results-heading">Test Runs</h2>
          <div className="test-results">
            {testResults.map((result, index) => (
              <div key={index} className="result-month">
                <h3>{result.date}</h3>
                {result.results.map((item, idx) => (
                  <div key={idx} className="result-item">
                    <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                    <Link
                      to={`/TestCaseDetails?suiteId=${suiteId}&testCaseId=${item.id}&testCaseName=${encodeURIComponent(
                        testCaseName
                      )}`}
                      className="test-id"
                    >
                      {item.id}
                    </Link>
                    <span className="test-suite">in {item.suite} (completed)</span>
                    <span className="release">{item.release}</span>
                    <span className="tested-by">Tested by {item.testedBy}</span>
                  </div>
                ))}
              </div>
            ))}
            
          </div>
        </div>
      </div>
                
        <div className="test-case-sidebar">
          <nav className="breadcrumb-nav">
            <div className="test-case-details-options">
                <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Details
                </Link>
                <h3 className="sidebar-title">
                  <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                    Tests & Results
                  </Link>
                </h3>
                <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Defects
                </Link>
                <Link to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId={testCaseId}&testCaseName={testCaseName}`} className="sidebar-link">
                  History
                </Link>
            </div>
          </nav>
          <div className="sidebar-section-people">
            <h3 className="sidebar-title">People & Dates</h3>
            <div className="people-dates">
              <div className="date-item">
                <div className="date-label">Created</div>
                <div className="date-value">Muhammad Faizan</div>
                <div className="date-timestamp">10/29/2020 12:22 PM</div>
              </div>
              <div className="date-item">
                <div className="date-label">Updated</div>
                <div className="date-value">Mohammed Maqsood</div>
                <div className="date-timestamp">11/2/2020 12:39 PM</div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default TestsResults;
