import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/SectionsCases.css'; // Import the CSS for styling

const SectionsCases = () => {
  // Extract suiteId and suiteName from URL parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

  // Example sections and cases data
  const sections = [
    {
      id: 0,
      title: "General Cases",
      cases: [
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" }
        // Add more test cases as needed
      ]
    },
    {
      id: 1,
      title: "UOC Launch",
      cases: [
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" },
        { id: "C18951", title: "Opening and navigating on Firefox", automation: "Automated", type: "UI" }
        // Add more test cases as needed
      ]
    }
  ];

  const navigate = useNavigate();

  // Navigate to Add Section page
  const handleAddSection = () => {
    navigate(`/AddSection?suiteId=${suiteId}&suite=${suiteName}`);
  };

  const handleCaseClick = (testCase) => {
    navigate(`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sections.find(section => section.cases.includes(testCase)).title}&testCaseId=${testCase.id}&testCaseName=${testCase.title}`);
  };

  // Calculate total sections and cases
  const totalSections = sections.length;
  const totalCases = sections.reduce((sum, section) => sum + section.cases.length, 0);

  return (
    <div className="sections-cases-page">
      <div className="sections-cases-header">
        <h2>{`S${suiteId} - ${suiteName}`}</h2>
        <div className="sections-cases-actions">
          <Link to={`/AddTestCase?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`} className="add-test-case-button">+ Add Test Case</Link>
          <Link to={`/EditTestSuite?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}&source=SectionsCases`} className="edit-test-suite-link">Edit</Link>
          <button className="delete-case-button">- Delete Test Case</button>
        </div>
      </div>

      <div className="sections-cases-summary">
        <span>Contains {totalSections} sections and {totalCases} cases.</span>
      </div>

      <div className="sections-cases-content">
        <div className="sections-list">
          {sections.map((section) => (
            <div key={section.id} className="section">
              <div className="section-header">
                <h3>{section.title}</h3>
                <button className="delete-section-button">&times;</button>
                <span>{section.cases.length} cases</span>
              </div>
              <div className="case-list">
                {/* Column Headers */}
                <div className="case-header">
                  <div className="case-header-item">ID</div>
                  <div className="case-header-item">Title</div>
                  <div className="case-header-item">Automation</div>
                  <div className="case-header-item">Type</div>
                </div>
                {section.cases.map((testCase) => (
                  <div key={testCase.id} className="case-item">
                    <div className="case-id">
                      <input type="checkbox" />
                      <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sections.find(section => section.cases.includes(testCase)).title}&testCaseId=${testCase.id}&testCaseName=${testCase.title}`} className="case-id-link">{testCase.id}</Link>
                    </div>
                    <div className="case-title">
                      <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sections.find(section => section.cases.includes(testCase)).title}&testCaseId=${testCase.id}&testCaseName=${testCase.title}`} className="case-title-link">{testCase.title}</Link>
                    </div>
                    <div className="case-automation">{testCase.automation}</div>
                    <div className="case-type">{testCase.type}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sections-tree-view">
          <div className="sections-tree-header">
            <span>Sections & Cases</span>
            <button className="add-section-button" onClick={handleAddSection}>+ Add Section</button>
          </div>
          <ul className="sections-tree">
            {sections.map((section) => (
              <li key={section.id}>
                <div className="tree-node">
                  <span className="tree-node-title">{section.title}</span>
                </div>
                <ul className="cases-subtree">
                  {section.cases.map((testCase) => (
                    <li key={testCase.id}>
                      <Link
                        to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sections.find(section => section.cases.includes(testCase)).title}&testCaseId=${testCase.id}&testCaseName=${testCase.title}`}
                        className="case-link"
                        onClick={() => handleCaseClick(testCase)}
                      >
                        {testCase.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionsCases;
