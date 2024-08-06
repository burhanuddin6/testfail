import React, { useState } from 'react';
import '../styles/ChangeSelectionTestRun.css'; // Import the CSS file for styling
import ChangeSelectionFilters from '../components/changeSelectionFilter.js'

const ChangeSelection = ({ onCancel }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAutomationType, setIsAutomationType] = useState(false);
  const [isCreatedBy, setIsCreatedBy] = useState(false);
  const [isCreatedOn, setIsCreatedOn] = useState(false);
  const [isEstimate, setIsEstimate] = useState(false);
  const [isForecast, setIsForecast] = useState(false);
  const [isObsolete, setIsObsolete] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const [isReferences, setIsReferences] = useState(false);
  const [isSection, setIsSection] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isUpdatedBy, setIsUpdatedBy] = useState(false);
  const [isUpdatedOn, setIsUpdatedOn] = useState(false);

  const [AutomationType, setAutomationType] = useState('');
  const [CreatedBy, setCreatedBy] = useState('');
  const [CreatedOn, setCreatedOn] = useState('');
  const [Estimate, setEstimate] = useState([{ id: 1 }]);
  const [Forecast, setForecast] = useState([{ id: 1 }]);
  const [Obsolete, setObsolete] = useState('');
  const [Priority, setPriority] = useState('');
  const [References, setReferences] = useState([{ id: 1 }]);
  const [Section, setSection] = useState('');
  const [Template, setTemplate] = useState('');
  const [Title, setTitle] = useState([{ id: 1 }]);
  const [Type, setType] = useState('');
  const [UpdatedBy, setUpdatedBy] = useState('');
  const [UpdatedOn, setUpdatedOn] = useState('');

  const [selectedOptionTitle, setSelectedOptionTitle] = useState('');
  const [selectedOptionForecast, setSelectedOptionForecast] = useState('');
  const [selectedOptionEstimate, setSelectedOptionEstimate] = useState('');
  const [selectedOptionReference, setSelectedOptionReference] = useState('');

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const addTitle = (e) => {
    e.preventDefault();
    setTitle((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1 },
    ]);
  };

  const removeTitle = (id) => {
    setTitle((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const addEstimate = (e) => {
    e.preventDefault();
    setEstimate((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1 },
    ]);
  };

  const removeEstimate = (id) => {
    setEstimate((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const addReferences = (e) => {
    e.preventDefault();
    setReferences((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1 },
    ]);
  };

  const removeReferences = (id) => {
    setReferences((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const addForecast = (e) => {
    e.preventDefault();
    setForecast((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1 },
    ]);
  };

  const removeForecast = (id) => {
    setForecast((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  return (
    <div className="ChangeSelection-overlay">
      <div className="ChangeSelection-content">
        <div className="ChangeSelection-header">
          <h2>Select Cases</h2>
        </div>
        <div className="ChangeSelection-body">
          <div className="ChangeSelection-sidebar">
            <div className='ChangeSelection-select'>
                <label htmlFor="selectAll">Select: </label>
                <p className='ChangeSelection-select-options'>All</p>
                <p className='ChangeSelection-select-options'>None</p>
            </div>
            
            <div className="categories">
              <label>
                <input type="checkbox" />
                General Cases
              </label>
              <label>
                <input type="checkbox" />
                UDC Launch
              </label>
              {/* Add more categories as needed */}
            </div>
          </div>

          <div className="ChangeSelection-main">
            <div className='ChangeSelection-select'>
                <label htmlFor="selectAll">Select: </label>
                <p className='ChangeSelection-select-options'>All</p>
                <p className='ChangeSelection-select-options'>None</p>
            </div>
            <div className='ChangeSelection-TestSuite-name'><strong>Selected Test Suite Name</strong></div>
            <div className="case-list">
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes('Case 1')}
                  onChange={() => handleCheckboxChange('Case 1')}
                />
                Opening and navigating on Chrome
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes('Case 2')}
                  onChange={() => handleCheckboxChange('Case 2')}
                />
                Opening and navigating on Firefox
              </label>
              {/* Add more cases as needed */}
            </div>
          </div>

          <div className="ChangeSelection-filter">
            <h3>Selection Filter</h3>
            <div className="filter-options">

              <p onClick={() => setIsAutomationType(!isAutomationType)}>Automation Type</p>
              {isAutomationType &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Any"
                            // checked={}
                            onChange={() => setAutomationType('Any')}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Triage"
                            // checked={}
                            onChange={() => setAutomationType('Need to Triage')}
                            // className="test-run-radio"
                        />
                        <label>Need to Triage</label>
                    </div>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Triage"
                            // checked={}
                            onChange={() => setAutomationType("BE")}
                            // className="test-run-radio"
                        />
                        <label>BE</label>
                    </div>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Triage"
                            // checked={}
                            onChange={() => setAutomationType('UI')}
                            // className="test-run-radio"
                        />
                        <label>UI</label>
                    </div>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Triage"
                            // checked={}
                            onChange={() => setAutomationType("BE & UI")}
                            // className="test-run-radio"
                        />
                        <label>BE & UI</label>
                    </div>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Triage"
                            // checked={}
                            onChange={() => setAutomationType("Can't Automate")}
                            // className="test-run-radio"
                        />
                        <label>Can't Automate</label>
                    </div>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="automationSelection"
                            // value="Triage"
                            // checked={}
                            onChange={() => setAutomationType('Automatable')}
                            // className="test-run-radio"
                        />
                        <label>Automatable</label>
                    </div>
                </div>}
                
             
              <p onClick={() => setIsCreatedBy(!isCreatedBy)}>Created By</p>
              {isCreatedBy &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdBy"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedBy('Any')}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>
                </div>}

              <p onClick={() => setIsCreatedOn(!isCreatedOn)}>Created On</p>
              {isCreatedOn &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("Today")}
                            // className="test-run-radio"
                        />
                        <label>Today</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("Yesterday")}
                            // className="test-run-radio"
                        />
                        <label>Yesterday</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("Last 24 Hours")}
                            // className="test-run-radio"
                        />
                        <label>Last 24 Hours</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("This Week")}
                            // className="test-run-radio"
                        />
                        <label>This Week</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("This Month")}
                            // className="test-run-radio"
                        />
                        <label>This Month</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("Last Week")}
                            // className="test-run-radio"
                        />
                        <label>Last Week</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("Last Month")}
                            // className="test-run-radio"
                        />
                        <label>Last Month</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="createdOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setCreatedOn("Custom")}
                            // className="test-run-radio"
                        />
                        <label>Custom</label>

                        {CreatedOn == 'Custom' && 
                            <div className='custom-time-set'>
                                <label>From: </label>
                                <input
                                    type="date"
                                />
                                <br></br>
                                <label>To: </label>
                                <input
                                    type="date"
                                />
                            </div>}
                    </div>

                </div>}

              <p onClick={() => setIsEstimate(!isEstimate)}>Estimate</p>
              {isEstimate && 
                <div className="filter-selection">
                    <label>
                        <input type="radio" name="filter-title" />
                        Match only of the above
                    </label>
                    <label>
                        <input type="radio" name="filter-title" />
                        Match any of the above
                    </label>
                    {Estimate.map((step) => (
                        <ChangeSelectionFilters key={step.id} stepNumber={step.id} onRemove={() => removeEstimate(step.id)} dropOptions={['Is', 'Is Not', 'Is Less', 'Is More']} />
                    ))}

                    <div className='action-button-filter'>
                        <button className="action-button-add-filter" onClick={addEstimate}>
                            +
                        </button>
                    </div>
                </div>
               }
              
              <p onClick={() => setIsForecast(!isForecast)}>Forecast</p>
              {isForecast && 
                <div className="filter-selection">
                    <label>
                        <input type="radio" name="filter-title" />
                        Match only of the above
                    </label>
                    <label>
                        <input type="radio" name="filter-title" />
                        Match any of the above
                    </label>
                    {Forecast.map((step) => (
                        <ChangeSelectionFilters key={step.id} stepNumber={step.id} onRemove={() => removeForecast(step.id)} dropOptions={['Is', 'Is Not', 'Is Less', 'Is More']} />
                    ))}

                    <div className='action-button-filter'>
                        <button className="action-button-add-filter" onClick={addForecast}>
                            +
                        </button>
                    </div>
                </div>
               }
              
              <p onClick={() => setIsObsolete(!isObsolete)}>Obsolete</p>
              {isObsolete &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Obsolete"
                            // value="Any"
                            // checked={}
                            onChange={() => setObsolete("Any")}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Obsolete"
                            // value="Any"
                            // checked={}
                            onChange={() => setObsolete("Checked")}
                            // className="test-run-radio"
                        />
                        <label>Checked</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Obsolete"
                            // value="Any"
                            // checked={}
                            onChange={() => setObsolete("Unchecked")}
                            // className="test-run-radio"
                        />
                        <label>Unchecked</label>
                    </div>
                </div>}


              <p onClick={() => setIsPriority(!isPriority)}>Priority</p>
              {isPriority &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="priority"
                            // value="Any"
                            // checked={}
                            onChange={() => setPriority("Any")}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="priority"
                            // value="Critical"
                            // checked={}
                            onChange={() => setPriority("Critical")}
                            // className="test-run-radio"
                        />
                        <label>Critical</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="priority"
                            // value="High"
                            // checked={}
                            onChange={() => setPriority("High")}
                            // className="test-run-radio"
                        />
                        <label>High</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="priority"
                            // value="Medium"
                            // checked={}
                            onChange={() => setPriority("Medium")}
                            // className="test-run-radio"
                        />
                        <label>Medium</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="priority"
                            // value="Low"
                            // checked={}
                            onChange={() => setPriority("Low")}
                            // className="test-run-radio"
                        />
                        <label>Low</label>
                    </div>

                </div>}


              <p onClick={() => setIsReferences(!isReferences)}>References</p>
              {isReferences && 
                <div className="filter-selection">
                    <label>
                        <input type="radio" name="filter-title" />
                        Match only of the above
                    </label>
                    <label>
                        <input type="radio" name="filter-title" />
                        Match any of the above
                    </label>
                    {References.map((step) => (
                        <ChangeSelectionFilters key={step.id} stepNumber={step.id} onRemove={() => removeReferences(step.id)} dropOptions={['Is', 'Is Not', 'Contains', 'Does Not Contain']} />
                    ))}

                    <div className='action-button-filter'>
                        <button className="action-button-add-filter" onClick={addReferences}>
                            +
                        </button>
                    </div>
                </div>
               }

              
              <p onClick={() => setIsSection(!isSection)}>Section</p>
              {isSection &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Section"
                            // value="Any"
                            // checked={}
                            onChange={() => setSection("Any")}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Section"
                            // value="Any"
                            // checked={}
                            onChange={() => setSection("General Cases")}
                            // className="test-run-radio"
                        />
                        <label>General Cases</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Section"
                            // value="Any"
                            // checked={}
                            onChange={() => setSection("UDC Launch")}
                            // className="test-run-radio"
                        />
                        <label>UDC Launch</label>
                    </div>

                </div>}

              
              <p onClick={() => setIsTemplate(!isTemplate)}>Template</p>
              {isTemplate &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Template"
                            // value="Any"
                            // checked={}
                            onChange={() => setTemplate("Any")}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Template"
                            // value="Behavior Driven Development"
                            // checked={}
                            onChange={() => setTemplate("Behavior Driven Development")}
                            // className="test-run-radio"
                        />
                        <label>Behavior Driven Development</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Template"
                            // value="Exploratory Session"
                            // checked={}
                            onChange={() => setTemplate("Exploratory Session")}
                            // className="test-run-radio"
                        />
                        <label>Exploratory Session</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Template"
                            // value="Test Case (Steps)"
                            // checked={}
                            onChange={() => setTemplate("Test Case (Steps)")}
                            // className="test-run-radio"
                        />
                        <label>Test Case (Steps)</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Template"
                            // value="Test Case (Text)"
                            // checked={}
                            onChange={() => setTemplate("Test Case (Text)")}
                            // className="test-run-radio"
                        />
                        <label>Test Case (Text)</label>
                    </div>

                </div>}

              <p onClick={() => setIsTitle(!isTitle)}>Title</p>
              {isTitle && 
                <div className="filter-selection">
                    <label>
                        <input type="radio" name="filter-title" />
                        Match only of the above
                    </label>
                    <label>
                        <input type="radio" name="filter-title" />
                        Match any of the above
                    </label>
                    {Title.map((step) => (
                        <ChangeSelectionFilters key={step.id} stepNumber={step.id} onRemove={() => removeTitle(step.id)} dropOptions={['Is', 'Is Not', 'Contains', 'Does Not Contain']} />
                    ))}

                <div className='action-button-filter'>
                  <button className="action-button-add-filter" onClick={addTitle}>
                    +
                  </button>
                </div>
                </div>
               }

              <p onClick={() => setIsType(!isType)}>Type</p>
              {isType &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Any")}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>   

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Acceptance")}
                            // className="test-run-radio"
                        />
                        <label>Acceptance</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Accessibility")}
                            // className="test-run-radio"
                        />
                        <label>Accessibility</label>
                    </div>   

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Automatable")}
                            // className="test-run-radio"
                        />
                        <label>Automatable</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Automated")}
                            // className="test-run-radio"
                        />
                        <label>Automated</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Can't Automate")}
                            // className="test-run-radio"
                        />
                        <label>Can't Automate</label>
                    </div>   

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Compatibility")}
                            // className="test-run-radio"
                        />
                        <label>Compatibility</label>
                    </div>   

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Destructive")}
                            // className="test-run-radio"
                        />
                        <label>Destructive</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Functional")}
                            // className="test-run-radio"
                        />
                        <label>Functional</label>
                    </div>   

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Other")}
                            // className="test-run-radio"
                        />
                        <label>Other</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Performance")}
                            // className="test-run-radio"
                        />
                        <label>Performance</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Regression")}
                            // className="test-run-radio"
                        />
                        <label>Regression</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Security")}
                            // className="test-run-radio"
                        />
                        <label>Security</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Acceptance"
                            // checked={}
                            onChange={() => setType("Smoke & Sanity")}
                            // className="test-run-radio"
                        />
                        <label>Smoke & Sanity</label>
                    </div> 

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="Type"
                            // value="Any"
                            // checked={}
                            onChange={() => setType("Usability")}
                            // className="test-run-radio"
                        />
                        <label>Usability</label>
                    </div> 
              </div>}


              <p onClick={() => setIsUpdatedBy(!isUpdatedBy)}>Updated By</p>
              {isUpdatedBy &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="updatedBy"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedBy("Any")}
                            // className="test-run-radio"
                        />
                        <label>Any</label>
                    </div>
                </div>}

              <p onClick={() => setIsUpdatedOn(!isUpdatedOn)}>Updated On</p>
              {isUpdatedOn &&
                <div className='filter-option-popup'>
                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("Today")}
                            // className="test-run-radio"
                        />
                        <label>Today</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("Yesterday")}
                            // className="test-run-radio"
                        />
                        <label>Yesterday</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("Last 24 Hours")}
                            // className="test-run-radio"
                        />
                        <label>Last 24 Hours</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("This Week")}
                            // className="test-run-radio"
                        />
                        <label>This Week</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("This Month")}
                            // className="test-run-radio"
                        />
                        <label>This Month</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("Last Week")}
                            // className="test-run-radio"
                        />
                        <label>Last Week</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("Last Month")}
                            // className="test-run-radio"
                        />
                        <label>Last Month</label>
                    </div>

                    <div className='filter-option-popup-elements'>
                        <input
                            type="radio"
                            // id=""
                            name="UpdatedOn"
                            // value="Any"
                            // checked={}
                            onChange={() => setUpdatedOn("Custom")}
                            // className="test-run-radio"
                        />
                        <label>Custom</label>

                        {UpdatedOn == 'Custom' && 
                            <div className='custom-time-set'>
                                <label>From: </label>
                                <input
                                    type="date"
                                />
                                <br></br>
                                <label>To: </label>
                                <input
                                    type="date"
                                />
                            </div>}
                    </div>

                </div>}

            </div>

            <div className="filter-selection">
              <label>
                <input type="radio" name="filter" />
                Match only of the above
              </label>
              <label>
                <input type="radio" name="filter" />
                Match any of the above
              </label>
            </div>
          </div>
        </div>
        
        <div className="ChangeSelection-footer">
          <button className="ok-button" onClick={onCancel}>OK</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSelection;
