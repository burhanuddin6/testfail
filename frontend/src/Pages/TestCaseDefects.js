import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import '../styles/TestCaseDefects.css';

const defectsData = [
  {
    date: 'December 2020',
    defects: [
      { status: 'Failed', id: 'T818757', defectId: 'PRIV-42493', addedBy: 'Reviewer' }
    ]
  },
  {
    date: 'November 2020',
    defects: [
      { status: 'Failed', id: 'T685601', defectId: 'PRIV-40381', addedBy: 'Reviewer' },
      { status: 'Failed', id: 'T685601', defectId: 'PRIV-40381', addedBy: 'Reviewer' }
    ]
  },
  {
    date: 'December 2020',
    defects: [
      { status: 'Failed', id: 'T818757', defectId: 'PRIV-42493', addedBy: 'Reviewer' }
    ]
  },
  {
    date: 'November 2020',
    defects: [
      { status: 'Failed', id: 'T685601', defectId: 'PRIV-40381', addedBy: 'Reviewer' },
      { status: 'Failed', id: 'T685601', defectId: 'PRIV-40381', addedBy: 'Reviewer' }
    ]
  },{
    date: 'December 2020',
    defects: [
      { status: 'Failed', id: 'T818757', defectId: 'PRIV-42493', addedBy: 'Reviewer' }
    ]
  },
  {
    date: 'November 2020',
    defects: [
      { status: 'Failed', id: 'T685601', defectId: 'PRIV-40381', addedBy: 'Reviewer' },
      { status: 'Failed', id: 'T685601', defectId: 'PRIV-40381', addedBy: 'Reviewer' }
    ]
  },
  {
    date: 'December 2020',
    defects: [
      { status: 'Failed', id: 'T818757', defectId: 'PRIV-42493', addedBy: 'Reviewer' }
    ]
  }
];

const TestCaseDefects = () => {
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
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Tests', 'Results', 'Defects'],
          datasets: [
            {
              label: 'Tests and Defects',
              data: [35, 39, defectsData.reduce((sum, month) => sum + month.defects.length, 0)],
              backgroundColor: [
                'rgba(66, 135, 245, 0.2)',
                'rgba(245, 124, 66, 0.2)',
                'rgba(217, 83, 79, 0.2)'
              ],
              borderColor: [
                'rgba(66, 135, 245, 1)',
                'rgba(245, 124, 66, 1)',
                'rgba(217, 83, 79, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartRef]);

  return (
    <div className="test-case-defects-container">
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

            <div className="defects-summary">
              <div className='defects-graph-details'>
                <div className="defects-graph">
                <div className="test-case-defects-count">{defectsData.reduce((sum, month) => sum + month.defects.length, 0)} Defects</div>
                  <canvas ref={chartRef}></canvas>
                  
                </div>
                <div className="defects-status-summary">
                  <span>Tests and defects:</span>
                  <ul>
                    <li className="tests">40 tests started</li>
                    <li className="results">42 test results added</li>
                    <li className="defects">0 defects logged</li>
                  </ul>
                </div>
              </div>
            
            <hr className="defects-divider" />
            <div className="defects-list-scroll">
              <h2 className="defects-heading">Defects</h2>
              <div className="defects-list">
                {defectsData.map((month, index) => (
                  <div key={index} className="defect-month">
                    <h3>{month.date}</h3>
                    {month.defects.map((item, idx) => (
                      <div key={idx} className="defect-item">
                        <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                        <Link to={`/DefectDetails?defectId=${item.defectId}&testCaseId=${testCaseId}&testCaseName=${encodeURIComponent(testCaseName)}`} className="defect-id">
                          {item.defectId}
                        </Link>
                        <span className="added-by">Added by {item.addedBy}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
          </div>
        </div>
        </div>
        

        
        <div className="test-case-sidebar">
          <nav className="breadcrumb-nav">
            <div className="test-case-details-options">
                <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Details
                </Link>
                <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Tests & Results
                </Link>
                <h3 className="sidebar-title">
                <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Defects
                </Link>
                </h3>
                <Link to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
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

export default TestCaseDefects;
