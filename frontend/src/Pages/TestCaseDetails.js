// // TestCaseDetails.js

// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import '../styles/TestCaseDetails.css'; // Ensure this path is correct

// const TestCaseDetails = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const testCaseId = searchParams.get('testCaseId') || 'C18969'; // Default to 'C18969' if no testCaseId is provided
//   const testCaseName = searchParams.get('testCaseName') || 'Opening and navigating on Chrome'; // Default to the provided name

//   const suiteName = searchParams.get('suite') || 'General UI Testcases'; // Fetch the suite name from the query params
//   const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
//   const sectionName = searchParams.get('section') || 'General Cases'; // Fetch the section name from the query params

//   return (
//     <div className="test-case-details-container">
//       <div className="test-case-details-content">
//         <div className="test-case-header">
//           <div className="test-case-id">{testCaseId}</div>
//           <h1 className="test-case-name">{testCaseName}</h1>
//           <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestCaseDetails`} className="edit-case-link">Edit</Link>
//         </div>

//         <nav className="breadcrumb-nav">
//           <Link to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`} className="breadcrumb-link">
//             {suiteName} &gt; {sectionName}
//           </Link>
//         </nav>

//         <div className="test-case-summary">
//           <table className="summary-table">
//             <tbody>
//               <tr>
//                 <td className="summary-label">Type</td>
//                 <td className="summary-value">Automated</td>
//                 <td className="summary-label">Priority</td>
//                 <td className="summary-value">Medium</td>
//               </tr>
//               <tr>
//                 <td className="summary-label">Estimate</td>
//                 <td className="summary-value">None</td>
//                 <td className="summary-label">References</td>
//                 <td className="summary-value">None</td>
//               </tr>
//               <tr>
//                 <td className="summary-label">Automation</td>
//                 <td className="summary-value">UI</td>
//                 <td className="summary-label">Obsolete</td>
//                 <td className="summary-value">No</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="additional-details">
//             <p>No additional details available.</p>
//           </div>
//         </div>
//       </div>

//       <aside className="test-case-sidebar">
//         <section className="sidebar-section">
//           <h3 className="sidebar-title">
//             <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
//               Details
//             </Link>
//           </h3>
//           <ul className="sidebar-links">
//             <li>
//             <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
//                 Tests & Results
//             </Link>
//             </li>
//             <li>
//               <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
//                 Defects
//               </Link>
//             </li>
//             <li>
//               <Link to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
//                 History
//               </Link>
//             </li>
//           </ul>
//         </section>
//         <section className="sidebar-section">
//           <h3 className="sidebar-title">People & Dates</h3>
//           <div className="people-dates">
//             <div className="date-item">
//               <div className="date-label">Created</div>
//               <div className="date-value">Muhammad Faizan</div>
//               <div className="date-timestamp">10/29/2020 12:22 PM</div>
//             </div>
//             <div className="date-item">
//               <div className="date-label">Updated</div>
//               <div className="date-value">Mohammed Maqsood</div>
//               <div className="date-timestamp">11/2/2020 12:39 PM</div>
//             </div>
//           </div>
//         </section>
//       </aside>
//     </div>
//   );
// };

// export default TestCaseDetails;


// TestCaseDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchTestCaseDetails } from '../api/TestCase';
import '../styles/TestCaseDetails.css'; // Ensure this path is correct

const TestCaseDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testCaseId = searchParams.get('testCaseId') || 'C18969'; // Default to 'C18969' if no testCaseId is provided
  const testCaseName = searchParams.get('testCaseName') || 'Opening and navigating on Chrome'; // Default to the provided name
  const suiteName = searchParams.get('suite') || 'General UI Testcases'; // Fetch the suite name from the query params
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const sectionName = searchParams.get('section') || 'General Cases'; // Fetch the section name from the query params

  const [testCaseDetails, setTestCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTestCaseDetails(testCaseId);
        setTestCaseDetails(data);
      } catch (err) {
        setError('Failed to fetch test case details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testCaseId]);

  console.log(testCaseDetails);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!testCaseDetails) return <p>No test case details available</p>;

  // return (
  //   <div className="test-case-details-container">
  //     <div className="test-case-details-content">
  //       <div className="test-case-header">
  //         <div className="test-case-id">{testCaseDetails.test_case_id}</div>
  //         <h1 className="test-case-name">{testCaseDetails.title}</h1>
  //         <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestCaseDetails`} className="edit-case-link">Edit</Link>
  //       </div>

  //       <nav className="breadcrumb-nav">
  //         <Link to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`} className="breadcrumb-link">
  //           {suiteName} &gt; {sectionName}
  //         </Link>
  //       </nav>

  //       <div className="test-case-summary">
  //         <table className="summary-table">
  //           <tbody>
  //             <tr>
  //               <td className="summary-label">Type</td>
  //               <td className="summary-value">{testCaseDetails.type_id}</td>
  //               <td className="summary-label">Priority</td>
  //               <td className="summary-value">{testCaseDetails.priority_id}</td>
  //             </tr>
  //             <tr>
  //               <td className="summary-label">Estimate</td>
  //               <td className="summary-value">{testCaseDetails.estimate || 'None'}</td>
  //               <td className="summary-label">References</td>
  //               <td className="summary-value">None</td>
  //             </tr>
  //             <tr>
  //               <td className="summary-label">Automation</td>
  //               <td className="summary-value">{testCaseDetails.automation_type}</td>
  //               <td className="summary-label">Obsolete</td>
  //               <td className="summary-value">{testCaseDetails.obsolete ? 'Yes' : 'No'}</td>
  //             </tr>
  //           </tbody>
  //         </table>

  //         <div className="additional-details">
  //           <p>{testCaseDetails.preconditions || 'No additional details available.'}</p>
  //         </div>
  //       </div>
  //     </div>

  //     <aside className="test-case-sidebar">
  //       <section className="sidebar-section">
  //         <h3 className="sidebar-title">
  //           <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //             Details
  //           </Link>
  //         </h3>
  //         <ul className="sidebar-links">
  //           <li>
  //             <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //               Tests & Results
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //               Defects
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //               History
  //             </Link>
  //           </li>
  //         </ul>
  //       </section>
  //       <section className="sidebar-section">
  //         <h3 className="sidebar-title">People & Dates</h3>
  //         <div className="people-dates">
  //           <div className="date-item">
  //             <div className="date-label">Created</div>
  //             <div className="date-value">{testCaseDetails.created_by.username}</div> {/* Replace with actual username field */}
  //             <div className="date-timestamp">{new Date(testCaseDetails.created_on).toLocaleString()}</div>
  //           </div>
  //           <div className="date-item">
  //             <div className="date-label">Updated</div>
  //             <div className="date-value">{testCaseDetails.updated_by ? testCaseDetails.updated_by.username : 'N/A'}</div> {/* Replace with actual username field */}
  //             <div className="date-timestamp">{testCaseDetails.updated_on ? new Date(testCaseDetails.updated_on).toLocaleString() : 'N/A'}</div>
  //           </div>
  //         </div>
  //         </div>

  //       <div className="test-case-sidebar">
  //         <nav className="breadcrumb-nav">
  //           <div className="test-case-details-options">
  //               <h3 className="sidebar-title">
  //                 <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //                   Details
  //                 </Link>
  //               </h3>
  //               <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //                 Tests & Results
  //               </Link>
  //               <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //                 Defects
  //               </Link>
  //               <Link to={`/TestCaseHistory?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
  //                 History
  //               </Link>
  //           </div>
  //         </nav>
  //         <div className="sidebar-section-people">
  //           <h3 className="sidebar-title">People & Dates</h3>
  //           <div className="people-dates">
  //             <div className="date-item">
  //               <div className="date-label">Created</div>
  //               <div className="date-value">Muhammad Faizan</div>
  //               <div className="date-timestamp">10/29/2020 12:22 PM</div>
  //             </div>
  //             <div className="date-item">
  //               <div className="date-label">Updated</div>
  //               <div className="date-value">Mohammed Maqsood</div>
  //               <div className="date-timestamp">11/2/2020 12:39 PM</div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
        
  //       </div>
  //   </div>
  // );
  return (
    <div className="test-case-details-container">
      <div className="test-case-detail-body">
        <div className='test-case-left-side'>
          <div className='test-case-header-class'>
            <div className="test-case-header">
              <div className="test-case-id">{testCaseDetails.test_case_id}</div>
              <h1 className="test-case-name">{testCaseDetails.title}</h1>
              <Link to={`/EditTestCase?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}&source=TestCaseDetails`} className="edit-case-link">Edit</Link>
            </div>
            <Link to={`/SectionsCases?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}`} className="breadcrumb-link">
              {suiteName} &gt; {sectionName}
            </Link>
          </div>
          
          <div className="test-case-summary">
            <table className="summary-table">
              <tbody>
                <tr>
                  <td className="summary-label">Type</td>
                  <td className="summary-value">{testCaseDetails.type_id}</td>
                  <td className="summary-label">Priority</td>
                  <td className="summary-value">{testCaseDetails.priority_id}</td>
                </tr>
                <tr>
                  <td className="summary-label">Estimate</td>
                  <td className="summary-value">{testCaseDetails.estimate || 'None'}</td>
                  <td className="summary-label">References</td>
                  <td className="summary-value">None</td>
                </tr>
                <tr>
                  <td className="summary-label">Automation Type</td>
                  <td className="summary-value">{testCaseDetails.automation_type}</td>
                  <td className="summary-label">Obsolete</td>
                  <td className="summary-value">{testCaseDetails.obsolete ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
  
            <div className="additional-details">
              {testCaseDetails.preconditions && (
                <div className="detail-section">
                  <h4>Preconditions</h4>
                  <p>{testCaseDetails.preconditions}</p>
                </div>
              )}
              {testCaseDetails.steps && (
                <div className="detail-section">
                  <h4>Steps</h4>
                  <p>{testCaseDetails.steps}</p>
                </div>
              )}
              {testCaseDetails.expected_result && (
                <div className="detail-section">
                  <h4>Expected Result</h4>
                  <p>{testCaseDetails.expected_result}</p>
                </div>
              )}
              {testCaseDetails.mission && (
                <div className="detail-section">
                  <h4>Mission</h4>
                  <p>{testCaseDetails.mission}</p>
                </div>
              )}
              {testCaseDetails.goals && (
                <div className="detail-section">
                  <h4>Goals</h4>
                  <p>{testCaseDetails.goals}</p>
                </div>
              )}
              {testCaseDetails.bdd_scenario && (
                <div className="detail-section">
                  <h4>BDD Scenario</h4>
                  <p>{testCaseDetails.bdd_scenario}</p>
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="test-case-sidebar">
          <nav className="breadcrumb-nav">
            <div className="test-case-details-options">
              <h3 className="sidebar-title">
                <Link to={`/TestCaseDetails?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                  Details
                </Link>
              </h3>
              <Link to={`/TestsResults?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                Tests & Results
              </Link>
              <Link to={`/TestCaseDefects?suiteId=${suiteId}&suite=${suiteName}&section=${sectionName}&testCaseId=${testCaseId}&testCaseName=${testCaseName}`} className="sidebar-link">
                Defects
              </Link>
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
                <div className="date-value">{testCaseDetails.created_by.username}</div>
                <div className="date-timestamp">{new Date(testCaseDetails.created_on).toLocaleString()}</div>
              </div>
              <div className="date-item">
                <div className="date-label">Updated</div>
                <div className="date-value">{testCaseDetails.updated_by ? testCaseDetails.updated_by.username : 'N/A'}</div>
                <div className="date-timestamp">{testCaseDetails.updated_on ? new Date(testCaseDetails.updated_on).toLocaleString() : 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default TestCaseDetails;

