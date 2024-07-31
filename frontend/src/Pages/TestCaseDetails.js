// TestCaseDetails.js

import React from 'react';
import '../styles/TestCaseDetails.css'; // Ensure this path is correct

const TestCaseDetails = () => {
  return (
    <div className="test-case-details-container">
      <div className="test-case-details-content">
        <div className="test-case-header">
          <div className="test-case-id">C18969</div>
          <h1 className="test-case-name">Opening and navigating on Chrome</h1>
        </div>

        <nav className="breadcrumb-nav">
          <a href="#general-ui-testcases" className="breadcrumb-link">
            0.0.. General UI Testcases &gt; General Cases
          </a>
        </nav>

        <div className="test-case-summary">
          <table className="summary-table">
            <tbody>
              <tr>
                <td className="summary-label">Type</td>
                <td className="summary-value">Automated</td>
                <td className="summary-label">Priority</td>
                <td className="summary-value">Medium</td>
              </tr>
              <tr>
                <td className="summary-label">Estimate</td>
                <td className="summary-value">None</td>
                <td className="summary-label">References</td>
                <td className="summary-value">None</td>
              </tr>
              <tr>
                <td className="summary-label">Automation</td>
                <td className="summary-value">UI</td>
                <td className="summary-label">Obsolete</td>
                <td className="summary-value">No</td>
              </tr>
            </tbody>
          </table>

          <div className="additional-details">
            <p>No additional details available.</p>
          </div>
        </div>
      </div>

      <aside className="test-case-sidebar">
        <section className="sidebar-section">
          <h3 className="sidebar-title">Details</h3>
          <ul className="sidebar-links">
            <li>
              <a href="#tests-results" className="sidebar-link">
                Tests & Results
              </a>
            </li>
            <li>
              <a href="#defects" className="sidebar-link">
                Defects
              </a>
            </li>
            <li>
              <a href="#history" className="sidebar-link">
                History
              </a>
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
              <div className="date-timestamp">11/2/2020 12:39 PM</div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default TestCaseDetails;
