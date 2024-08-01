import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/TestCaseHistory.css';

const testCaseHistoryData = [
    {
        date: 'November 17, 2020',
        updates: [
            {
                version: 5,
                author: 'Mohammed M.',
                typeChange: 'Functional → Automatable',
                automationTypeChange: 'None → UI',
            },
        ],
    },
    {
        date: 'November 17, 2020',
        updates: [
            {
                version: 4,
                author: 'Mohammed M.',
                typeChange: 'Functional → Automatable',
                automationTypeChange: 'None → UI',
            },
        ],
    },
    
    {
        date: 'November 17, 2020',
        updates: [
            {
                version: 3,
                author: 'Mohammed M.',
                typeChange: 'Functional → Automatable',
                automationTypeChange: 'None → UI',
            },
        ],
    },
    {
        date: 'November 17, 2020',
        updates: [
            {
                version: 2,
                author: 'Mohammed M.',
                typeChange: 'Functional → Automatable',
                automationTypeChange: 'None → UI',
            },
        ],
    },
    {
        date: 'October 29, 2020',
        updates: [
            {
                version: 1,
                author: 'Muhammad F.',
                description: 'This test case was created. Changes to this test case are displayed above, separately for each update.',
            },
        ],
    },
    // Add more history data here
];

const TestCaseHistory = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const testCaseId = searchParams.get('testCaseId') || 'N/A';
    const testCaseName = decodeURIComponent(searchParams.get('testCaseName')) || 'N/A';
    const suiteName = searchParams.get('suite') || 'General UI Testcases';
    const suiteId = searchParams.get('suiteId') || '0';
    const sectionName = searchParams.get('section') || 'General Cases';

    return (
        <div className="test-case-history-container">
            <div className="test-case-details-content">
                <div className="test-case-header">
                    <div className="test-case-id">{testCaseId}</div>
                    <h1 className="test-case-name">{testCaseName}</h1>
                    <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestCaseHistory`} className="edit-casehistory-link">Edit</Link>
                </div>
                <nav className="breadcrumb-nav">
                    <Link
                        to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`}
                        className="breadcrumb-link"
                    >
                        {suiteName} &gt; {sectionName}
                    </Link>
                </nav>
                <div className="history-content">
                    {testCaseHistoryData.map((entry, index) => (
                        <div className="history-entry" key={index}>
                            <div className="history-header">
                                <span>
                                    {entry.updates.some(update => update.version === 1 && update.description)
                                        ? 'Created'
                                        : 'Updated'}
                                </span>
                                <span>{entry.date}</span>
                            </div>
                            <div className="history-details">
                                {entry.updates.map((update, idx) => (
                                    <div key={idx} className="history-detail">
                                        {update.version && <div><span>Version:</span> {update.version}</div>}
                                        {update.author && <div><span>Author:</span> {update.author}</div>}
                                        {update.typeChange && <div><span>Type:</span> {update.typeChange}</div>}
                                        {update.automationTypeChange && <div><span>Automation Type:</span> {update.automationTypeChange}</div>}
                                        {update.description && <div>{update.description}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <aside className="test-case-sidebar">
                <section className="sidebar-section">
                    <ul className="sidebar-links">
                        <li>
                            <Link
                                to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`}
                                className="sidebar-link"
                            >
                                Details
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`}
                                className="sidebar-link"
                            >
                                Tests & Results
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`}
                                className="sidebar-link"
                            >
                                Defects
                            </Link>
                        </li>
                        <li>
                        <h3 className="sidebar-title">
                            <Link
                                to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`}
                                className="sidebar-link"
                            >
                                History
                            </Link>
                        </h3>
                        </li>
                    </ul>
                </section>
                <section className="sidebar-section">
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
                            <div className="date-timestamp">11/17/2020 08:03 PM</div>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    );
};

export default TestCaseHistory;
