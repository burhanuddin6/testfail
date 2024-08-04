// import React, { useState, useEffect } from 'react';
// import '../styles/AddTestCase.css'; // Import the CSS file
// import { useNavigate, useLocation } from 'react-router-dom';
// import { fetchTestCaseChoices } from '../api/TestCase';
// import { fetchSectionsBySuiteId } from '../api/Section'; // Import the function for sections

// const AddTestCase = () => {
//     const [section, setSection] = useState('');
//     const [template, setTemplate] = useState('');
//     const [type, setType] = useState('');
//     const [priority, setPriority] = useState('');
//     const [estimate, setEstimate] = useState('');
//     const [title, setTitle] = useState('');
//     const [references, setReferences] = useState('');
//     const [automationType, setAutomationType] = useState('');
//     const [obsolete, setObsolete] = useState(false);
//     const [preconditions, setPreconditions] = useState('');
//     const [steps, setSteps] = useState('');
//     const [expectedResult, setExpectedResult] = useState('');
//     const [automatedCases, setAutomatedCases] = useState('');
//     const [choices, setChoices] = useState({});
//     const [sections, setSections] = useState([]);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const suiteId = searchParams.get('suiteId') || '0';
//     const suiteName = searchParams.get('suite') || 'Test Suite';

    // useEffect(() => {
    //     const loadChoices = async () => {
    //         try {
    //             const data = await fetchTestCaseChoices();
    //             setChoices(data);
    //         } catch (error) {
    //             console.error('Failed to load test case choices:', error);
    //         }
    //     };

    //     loadChoices();
    // }, []);

    // useEffect(() => {
    //     if (suiteId) {
    //         const loadSections = async () => {
    //             try {
    //                 const data = await fetchSectionsBySuiteId(suiteId);
    //                 setSections(data);
    //             } catch (error) {
    //                 console.error('Failed to load sections:', error);
    //             }
    //         };

    //         loadSections();
    //     }
    // }, [suiteId]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form submitted with:', {
//             section,
//             template,
//             type,
//             priority,
//             estimate,
//             title,
//             references,
//             automationType,
//             obsolete,
//             preconditions,
//             steps,
//             expectedResult,
//             automatedCases,
//         });

//         navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//     };

//     const handleCancel = (e) => {
//         e.preventDefault();
//         navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//     };

//     return (
//         <div className="test-case-page">
//             <div className="test-case-header">
//                 <h2 className="add-test-case-title">Add Test Case</h2>
//             </div>
//             <div className="test-case-container">
//                 <h2 className="add-test-case-title">Add Test Case</h2>
//                 <form className="test-case-form" onSubmit={handleSubmit}>
//                     <div className="test-case-form-group">
//                         <label htmlFor="title" className="test-case-label">
//                             Title<span className="test-case-required">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="test-case-input"
//                             placeholder="Enter test case title"
//                             required
//                         />
//                     </div>

//                     {/* Select and Input Fields */}
//                     <div className="test-case-form-group">
//                         <div className="test-case-form-row">
//                             <div className="form-column">
//                                 <label htmlFor="section" className="test-case-label">
//                                     Section<span className="test-case-required">*</span>
//                                 </label>
//                                 <select
//                                     id="section"
//                                     value={section}
//                                     onChange={(e) => setSection(e.target.value)}
//                                     className="test-case-select"
//                                     required
//                                 >
//                                     <option value="">Select Section</option>
//                                     {sections.map(sec => (
//                                         <option key={sec.section_id} value={sec.section_id}>
//                                             {sec.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="form-column">
//                                 <label htmlFor="template" className="test-case-label">
//                                     Template<span className="test-case-required">*</span>
//                                 </label>
//                                 <select
//                                     id="template"
//                                     value={template}
//                                     onChange={(e) => setTemplate(e.target.value)}
//                                     className="test-case-select"
//                                     required
//                                 >
//                                     {choices.template_type && Object.keys(choices.template_type).map(key => (
//                                         <option key={key} value={key}>{choices.template_type[key]}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="form-column">
//                                 <label htmlFor="type" className="test-case-label">
//                                     Type<span className="test-case-required">*</span>
//                                 </label>
//                                 <select
//                                     id="type"
//                                     value={type}
//                                     onChange={(e) => setType(e.target.value)}
//                                     className="test-case-select"
//                                     required
//                                 >
//                                     {choices.type_id && Object.keys(choices.type_id).map(key => (
//                                         <option key={key} value={key}>{choices.type_id[key]}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="form-column">
//                                 <label htmlFor="priority" className="test-case-label">
//                                     Priority<span className="test-case-required">*</span>
//                                 </label>
//                                 <select
//                                     id="priority"
//                                     value={priority}
//                                     onChange={(e) => setPriority(e.target.value)}
//                                     className="test-case-select"
//                                     required
//                                 >
//                                     {choices.priority_id && Object.keys(choices.priority_id).map(key => (
//                                         <option key={key} value={key}>{choices.priority_id[key]}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="test-case-form-row">
//                             <div className="form-column">
//                                 <label htmlFor="estimate" className="test-case-label">
//                                     Estimate
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="estimate"
//                                     value={estimate}
//                                     onChange={(e) => setEstimate(e.target.value)}
//                                     className="test-case-input"
//                                     placeholder="Estimate time"
//                                 />
//                             </div>

//                             <div className="form-column">
//                                 <label htmlFor="references" className="test-case-label">
//                                     References
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="references"
//                                     value={references}
//                                     onChange={(e) => setReferences(e.target.value)}
//                                     className="test-case-input"
//                                     placeholder="References"
//                                 />
//                             </div>

//                             <div className="form-column">
//                                 <label htmlFor="automationType" className="test-case-label">
//                                     Automation Type
//                                 </label>
//                                 <select
//                                     id="automationType"
//                                     value={automationType}
//                                     onChange={(e) => setAutomationType(e.target.value)}
//                                     className="test-case-select"
//                                 >
//                                     {choices.automation_type && Object.keys(choices.automation_type).map(key => (
//                                         <option key={key} value={key}>{choices.automation_type[key]}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="form-column">
//                                 <label htmlFor="obsolete" className="test-case-label">
//                                     Obsolete
//                                 </label>
//                                 <input
//                                     type="checkbox"
//                                     id="obsolete"
//                                     checked={obsolete}
//                                     onChange={(e) => setObsolete(e.target.checked)}
//                                     className="test-case-checkbox"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Text Areas */}
//                     <div className="test-case-form-group">
//                         <label htmlFor="preconditions" className="test-case-label">
//                             Preconditions
//                         </label>
//                         <textarea
//                             id="preconditions"
//                             value={preconditions}
//                             onChange={(e) => setPreconditions(e.target.value)}
//                             className="test-case-textarea"
//                             placeholder="The preconditions of this test case. Reference other test cases with [C#] (e.g., C7)."
//                         />
//                     </div>

//                     <div className="test-case-form-group">
//                         <label htmlFor="steps" className="test-case-label">
//                             Steps
//                         </label>
//                         <textarea
//                             id="steps"
//                             value={steps}
//                             onChange={(e) => setSteps(e.target.value)}
//                             className="test-case-textarea"
//                             placeholder="The required steps to execute the test case."
//                         />
//                     </div>

//                     <div className="test-case-form-group">
//                         <label htmlFor="expectedResult" className="test-case-label">
//                             Expected Result
//                         </label>
//                         <textarea
//                             id="expectedResult"
//                             value={expectedResult}
//                             onChange={(e) => setExpectedResult(e.target.value)}
//                             className="test-case-textarea"
//                             placeholder="The expected result after executing the test case."
//                         />
//                     </div>

//                     <div className="test-case-form-group">
//                         <label htmlFor="automatedCases" className="test-case-label">
//                             Automated Cases
//                         </label>
//                         <textarea
//                             id="automatedCases"
//                             value={automatedCases}
//                             onChange={(e) => setAutomatedCases(e.target.value)}
//                             className="test-case-textarea"
//                             placeholder="Automated Cases"
//                         />
//                     </div>

//                     {/* Buttons */}
//                     <div className="test-case-buttons">
//                         <button type="submit" className="test-case-button">
//                             ✓ Add Test Case
//                         </button>
//                         <button className="test-case-button test-case-cancel" onClick={handleCancel}>
//                             ✗ Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddTestCase;

import React, { useState, useEffect } from 'react';
import '../styles/AddTestCase.css'; // Import the CSS file
import { useNavigate, useLocation } from 'react-router-dom';
import { createTestCase, fetchTestCaseChoices } from '../api/TestCase';
import { getProjectID } from '../utilities/globals'; // Import your function to get the project ID
import { fetchSectionsBySuiteId } from '../api/Section';

const AddTestCase = () => {
  const [section, setSection] = useState(''); // Default empty as it will be populated dynamically
  const [template, setTemplate] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [estimate, setEstimate] = useState('');
  const [title, setTitle] = useState('');
  const [references, setReferences] = useState('');
  const [automationType, setAutomationType] = useState('');
  const [obsolete, setObsolete] = useState(false);
  const [preconditions, setPreconditions] = useState('');
  const [steps, setSteps] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [automatedCases, setAutomatedCases] = useState('');
  const [sections, setSections] = useState([]); // To hold section options
  const [choices, setChoices] = useState({}); // To hold choices for fields
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch sections and choices
        const [sectionsResponse, choicesResponse] = await Promise.all([
          fetchSectionsBySuiteId(suiteId),
          fetchTestCaseChoices // Adjusted to your choices endpoint
        ]);

        setSections(sectionsResponse.data);
        setChoices(choicesResponse.data);
        console.log(`Test case choices: ${JSON.stringify(choicesResponse.data, null, 2)}`);
        console.log(`Test case choices: ${JSON.stringify(sectionsResponse.data, null, 2)}`);


        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [suiteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userId = sessionStorage.getItem('user_id');
    const projectId = getProjectID(); // Ensure this function is defined in your globals
    let newTestCase = {
      title,
      project_id: projectId,
      section_id: section,
      template_type: template,
      type_id: type,
      priority_id: priority,
      // estimate: estimate ? parseInt(estimate, 10) : null, // Convert to integer if not empty
      // automation_type: null,
      obsolete,
      preconditions,
      steps,
      expected_result: expectedResult,
      automated_cases: automatedCases,
      created_by: userId,
    };
    if(automationType !== '') newTestCase = {...newTestCase, automation_type: automationType};
    if( estimate ) newTestCase = {...newTestCase, estimate: parseInt(estimate, 10)};
    console.log(newTestCase);
    try {
      await createTestCase(newTestCase);
      navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
    } catch (error) {
      console.error('Failed to create test case:', error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="test-case-page">
      <div className="test-case-header">
        <h2 className="add-test-case-title">Add Test Case</h2>
      </div>
      <div className="test-case-container">
        <h2 className="add-test-case-title">Add Test Case</h2>
        <form className="test-case-form" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="test-case-form-group">
            <label htmlFor="title" className="test-case-label">
              Title<span className="test-case-required">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="test-case-input"
              placeholder="Enter test case title"
              required
            />
          </div>

          {/* Select and Input Fields */}
          <div className="test-case-form-group">
            <div className="test-case-form-row">
              <div className="form-column">
                <label htmlFor="section" className="test-case-label">
                  Section<span className="test-case-required">*</span>
                </label>
                <select
                  id="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section.section_id} value={section.section_id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="template" className="test-case-label">
                  Template<span className="test-case-required">*</span>
                </label>
                <select
                  id="template"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="">Select Template</option>
                  {choices.template_type && Object.entries(choices.template_type).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="type" className="test-case-label">
                  Type<span className="test-case-required">*</span>
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="">Select Type</option>
                  {choices.type_id && Object.entries(choices.type_id).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="priority" className="test-case-label">
                  Priority<span className="test-case-required">*</span>
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="test-case-select"
                  required
                >
                  <option value="">Select Priority</option>
                  {choices.priority_id && Object.entries(choices.priority_id).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="test-case-form-row">
              <div className="form-column">
                <label htmlFor="estimate" className="test-case-label">
                  Estimate
                </label>
                <input
                  type="text"
                  id="estimate"
                  value={estimate}
                  onChange={(e) => setEstimate(e.target.value)}
                  className="test-case-input"
                  placeholder="Estimate time"
                />
              </div>

              <div className="form-column">
                <label htmlFor="references" className="test-case-label">
                  References
                </label>
                <input
                  type="text"
                  id="references"
                  value={references}
                  onChange={(e) => setReferences(e.target.value)}
                  className="test-case-input"
                  placeholder="References"
                />
              </div>

              <div className="form-column">
                <label htmlFor="automationType" className="test-case-label">
                  Automation Type
                </label>
                <select
                  id="automationType"
                  value={automationType}
                  onChange={(e) => setAutomationType(e.target.value)}
                  className="test-case-select"
                >
                  <option value="">Select Automation Type</option>
                  {choices.automation_type && Object.entries(choices.automation_type).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-column">
                <label htmlFor="obsolete" className="test-case-label">
                  Obsolete
                </label>
                <input
                  type="checkbox"
                  id="obsolete"
                  checked={obsolete}
                  onChange={(e) => setObsolete(e.target.checked)}
                  className="test-case-checkbox"
                />
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="test-case-form-group">
            <label htmlFor="preconditions" className="test-case-label">
              Preconditions
            </label>
            <textarea
              id="preconditions"
              value={preconditions}
              onChange={(e) => setPreconditions(e.target.value)}
              className="test-case-textarea"
              placeholder="The preconditions of this test case. Reference other test cases with [C#] (e.g., C7)."
            />
          </div>

          <div className="test-case-form-group">
            <label htmlFor="steps" className="test-case-label">
              Steps
            </label>
            <textarea
              id="steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="test-case-textarea"
              placeholder="The required steps to execute the test case."
            />
          </div>

          <div className="test-case-form-group">
            <label htmlFor="expectedResult" className="test-case-label">
              Expected Result
            </label>
            <textarea
              id="expectedResult"
              value={expectedResult}
              onChange={(e) => setExpectedResult(e.target.value)}
              className="test-case-textarea"
              placeholder="The expected result after executing the test case."
            />
          </div>

          <div className="test-case-form-group">
            <label htmlFor="automatedCases" className="test-case-label">
              Automated Cases
            </label>
            <textarea
              id="automatedCases"
              value={automatedCases}
              onChange={(e) => setAutomatedCases(e.target.value)}
              className="test-case-textarea"
              placeholder="Automated Cases"
            />
          </div>

          {/* Buttons */}
          <div className="test-case-buttons">
            <button type="submit" className="test-case-button">
              ✓ Add Test Case
            </button>
            <button className="test-case-button test-case-cancel" onClick={handleCancel}>
              ✗ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestCase;



