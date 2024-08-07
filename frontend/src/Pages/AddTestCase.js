import React, { useState, useEffect } from 'react';
import '../styles/AddTestCase.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { createTestCase, fetchTestCaseChoices } from '../api/TestCase';
import { getProjectID } from '../utilities/globals';
import { fetchSectionsBySuiteId } from '../api/Section';
import FileUpload from '../components/fileUpload';
import TestStep from '../components/testSteps';
import BDD from '../components/bdd';

const AddTestCase = () => {
  const [section, setSection] = useState(''); 
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
  const [sections, setSections] = useState([]);
  const [choices, setChoices] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [mission, setMission] = useState('');
  const [goals, setGoals] = useState('');
  const [stepsCases, setStepsCases] = useState([{ id: 1 }]);
  const [bddscenerio, setbddscenerio] = useState([{ id: 1 }]);
  const [files, setFiles] = useState([]);


  const addStepCases = (e) => {
    e.preventDefault();
    setStepsCases((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1 },
    ]);
  };

  const removeStepCases = (id) => {
    setStepsCases((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const addBDD = (e) => {
    e.preventDefault();
    setbddscenerio((prevbdd) => [
      ...prevbdd,
      { id: prevbdd.length + 1 },
    ]);
  };

  const removeBDD = (id) => {
    setbddscenerio((prevbdd) => prevbdd.filter((bdd) => bdd.id !== id));
  };

  

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; 
  const suiteName = searchParams.get('suite') || 'Test Suite'; 

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [sectionsResponse, choicesResponse] = await Promise.all([
          fetchSectionsBySuiteId(suiteId),
          fetchTestCaseChoices() 
        ]);

        setSections(sectionsResponse);
        setChoices(choicesResponse);
        // console.log(`Test case choices: ${JSON.stringify(choicesResponse, null, 2)}`); // debug statement, remove before production
        // console.log(`Test section choices: ${JSON.stringify(sectionsResponse, null, 2)}`); // debug statement, remove before production


        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error); // debug statement, remove before production
        setLoading(false);
      }
    };

    loadData();
  }, [suiteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userId = sessionStorage.getItem('user_id');
    const projectId = getProjectID(); 
    let newTestCase = {
      title,
      project_id: projectId,
      section_id: section,
      template_type: template,
      type_id: type,
      priority_id: priority,
      obsolete,
      preconditions,
      steps,
      expected_result: expectedResult,
      automated_cases: automatedCases,
      created_by: userId,
    };
    if(automationType !== '') newTestCase = {...newTestCase, automation_type: automationType};
    if(estimate) newTestCase = {...newTestCase, estimate: parseInt(estimate, 10)};
    // console.log(newTestCase); // debug statement, remove before production
    try {
      await createTestCase(newTestCase);
      navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
    } catch (error) {
      console.error('Failed to create test case:', error); // debug statement, remove before production
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
  };


  const handleFilesChange = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="test-case-page">
      {/* <div className="test-case-header">
        <h2 className="add-test-case-title">Add Test Case</h2>
      </div> */}
      {/* <div className="test-case-container"> */}
       
        <form className="test-case-form" onSubmit={handleSubmit}>
        <h2 className="add-test-case-title">Add Test Case</h2>
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
                <div className='references-add-testcase-form'>
                  <label className="test-case-label">References</label>
                  <a href="" className='add-references-add-testcase-form'>Add</a>
                </div>
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

          {template == "Test Case (Text)" &&
            <div className='test-case-template-based'>
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
            </div>
          }

          {template == "Test Case (Steps)" &&
            <div className='test-case-template-based'>
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
                <p className='steps-description'>Enter all test steps needed to verify this test case.</p>
                {stepsCases.map((step) => (
                  <TestStep key={step.id} stepNumber={step.id} onRemove={() => removeStepCases(step.id)} />
                ))}
                <div className='action-button'>
                  <button className="action-button-add-steps" onClick={addStepCases}>
                    +
                  </button>
                </div>
              </div> 
            </div>
          }

          {template == "Exploratory Session" &&
            <div className='test-case-template-based'>
              <div className="test-case-form-group">
                <label htmlFor="mission" className="test-case-label">
                  Mission
                </label>
                <textarea
                  id="mission"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  className="test-case-textarea"
                  placeholder="A high-level overview of what to test and which areas to cover, usually just 1-2 sentences."
                />
              </div>

              <div className="test-case-form-group">
                <label htmlFor="goals" className="test-case-label">
                  Goals
                </label>
                <textarea
                  id="goals"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="test-case-textarea"
                  placeholder="A detailed list of goals to cover as part of the exploratory sessions."
                />
              </div>
            </div>
          }

          {template == "Behavior Driven Development" &&
            <div className='test-case-template-based'>
              <div className="test-case-form-group">
                <label htmlFor="bdd" className="test-case-label">
                  BDD Scenerio
                </label>
                <p className='bdd-scenerio-description'>Enter all test scenarios needed to verify this test case.</p>
                {bddscenerio.map((bdd) => (
                  <BDD key={bdd.id} stepNumber={bdd.id} onRemove={() => removeBDD(bdd.id)} />
                ))}
                <div className='action-button'>
                  <button className="action-button-add-steps" onClick={addBDD}>
                    +
                  </button>
                </div>
              </div>
            </div>
          }
          

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
          

          <FileUpload onFilesChange={handleFilesChange}/>

          <div className="test-case-buttons">
            <button type="submit" className="test-case-button">
              ✓ Add Test Case
            </button>
            <button className="test-case-button test-case-cancel" onClick={handleCancel}>
              ✗ Cancel
            </button>
          </div>
        </form>
      {/* </div> */}
    </div>
  );
};

export default AddTestCase;



