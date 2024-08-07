// import React, { useState, useEffect } from 'react';
// import '../styles/AddTestRun.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { createTestRun } from '../api/TestRun'; 
// import { getQaUsers } from '../api/Auth'; 
// import { fetchMilestonesIdName } from '../api/Milestone'; 
// import { getProjectID } from '../utilities/globals'; 

// const AddTestRun = ({ userID }) => {
//   const [name, setName] = useState('');
//   const [references, setReferences] = useState('');
//   const [milestone, setMilestone] = useState('');
//   const [assignTo, setAssignTo] = useState('');
//   const [description, setDescription] = useState('');
//   const [testCaseSelection, setTestCaseSelection] = useState('all');
//   const [images, setImages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [projectID] = useState(getProjectID()); 


//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from;
//   const { selectedOption } = location.state || {};

  
//   const searchParams = new URLSearchParams(location.search);
//   const suiteId = searchParams.get('suiteId') || '0'; 
//   const sourcePage = searchParams.get('source'); 
//   const suiteName = searchParams.get('suite') || 'Test Suite'; 

//   useEffect(() => {
//     if (selectedOption) {
//       setName(selectedOption);
//     }

//     const fetchData = async () => {
//       try {
//         const usersData = await getQaUsers('qa-user');
//         setUsers(usersData);

        // console.log("fetching milestone")
//         const milestonesData = await fetchMilestonesIdName(projectID);
//         setMilestone(milestonesData);
//       } catch (error) {
//         console.error('Error fetching data:', error); // debug statement, remove before production
//       }
//     };

//     fetchData();
//   }, [projectID, selectedOption]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const testRunData = {
//       name,
//       test_suite_id: suiteId, 
//       created_by: userID,   
//       milestone_id: milestone, 
//       description,
//       test_case_filter: testCaseSelection, 
//       project_id: projectID, 
//     };

//     try {
//       await createTestRun(testRunData);
//       console.log('Test run created successfully'); // debug statement, remove before productions

//       // Navigate based on the source page
//       if (sourcePage === 'TestRuns') {
//         navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//       } else {
//         navigate('/TestSuitsCases'); 
//       }
//     } catch (error) {
//       console.error('Failed to create Test Run:', error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => { 
//     navigate(from);
//   };

//   return (
//     <div className="test-run-container">
//       <form className="test-run-form" onSubmit={handleSubmit}>
//         <h2 className="add-test-run-title">Add Test Run</h2>

//         <div className="test-run-form-group">
//           <label htmlFor="name" className="test-run-label">
//             Name<span className="test-run-required">*</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter test run name"
//             className="test-run-input"
//             required
//           />
//         </div>

//         <div className="test-run-form-group">
//           <label htmlFor="references" className="test-run-label">
//             References
//           </label>
//           <input
//             type="text"
//             id="references"
//             value={references}
//             onChange={(e) => setReferences(e.target.value)}
//             placeholder="Add reference IDs"
//             className="test-run-input"
//           />
//         </div>

//         <div className="test-run-form-group">
//           <label htmlFor="milestone" className="test-run-label">
//             Milestone
//           </label>
//           <select
//             id="milestone"
//             value={milestone}
//             onChange={(e) => setMilestone(e.target.value)}
//             className="test-run-select"
//           >
//             <option value="">Select milestone</option>
//             {milestone.map((m) => (
//               <option key={m.id} value={m.id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="test-run-form-group">
//           <label htmlFor="assignTo" className="test-run-label">
//             Assign To
//           </label>
//           <select
//             id="assignTo"
//             value={assignTo}
//             onChange={(e) => setAssignTo(e.target.value)}
//             className="test-run-select"
//           >
//             <option value="">Select user</option>
//             {users.map((user) => (
//               <option key={user.email} value={user.email}>
//                 {user.first_name} {user.last_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="test-run-form-group">
//           <label htmlFor="description" className="test-run-label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Use this description to describe the purpose of this test run."
//             className="test-run-textarea"
//           />
//           <input 
//             type="file"
//             id="file-upload"
//             name="file-upload"
//             onChange={handleFileChange}
//             accept="image/*"
//             multiple
//           />
//         </div>

//         <div className="image-preview">
//           {images.map((image, index) => (
//             <div key={index} className="image-container">
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt={`Selected ${index}`}
//                 className="preview-image"
//               />
//               <button
//                 type="button"
//                 className="remove-image-button"
//                 onClick={() => removeImage(index)}
//               >
//                 ✗
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="test-run-case-selection">
//           <div>
//             <input
//               type="radio"
//               id="include-all"
//               name="testCaseSelection"
//               value="ALL"
//               checked={testCaseSelection === 'ALL'}
//               onChange={() => setTestCaseSelection('ALL')}
//               className="test-run-radio"
//             />
//             <label htmlFor="include-all" className="test-run-radio-label">
//               Include all test cases
//             </label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               id="select-specific"
//               name="testCaseSelection"
//               value="SELECTED"
//               checked={testCaseSelection === 'SELECTED'}
//               onChange={() => setTestCaseSelection('SELECTED')}
//               className="test-run-radio"
//             />
//             <label htmlFor="select-specific" className="test-run-radio-label">
//               Select specific test cases
//             </label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               id="dynamic-filtering"
//               name="testCaseSelection"
//               value="REGEX_ON_NAME"
//               checked={testCaseSelection === 'REGEX_ON_NAME'}
//               onChange={() => setTestCaseSelection('REGEX_ON_NAME')}
//               className="test-run-radio"
//             />
//             <label htmlFor="dynamic-filtering" className="test-run-radio-label">
//               Dynamic Filtering
//             </label>
//           </div>
//         </div>

//         <div className="test-run-buttons">
//           <button type="submit" className="test-run-button test-run-submit">
//             ✓ Add Test Run
//           </button>
//           <button
//             type="button"
//             className="test-run-button test-run-cancel"
//             onClick={handleCancel}
//           >
//             ✗ Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTestRun;

import React, { useState, useEffect } from 'react';
import '../styles/AddTestRun.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTestRun } from '../api/TestRun';
import { getQaUsers } from '../api/Auth';
import { fetchMilestonesIdName } from '../api/Milestone';
import { getProjectID } from '../utilities/globals';
import AlertBox from '../components/Alert'; 
import FilterPopup from './ChangeSelectionTestRun.js'
import FileUpload from '../components/fileUpload.js';

const AddTestRun = ({ userID }) => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [milestone, setMilestone] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [testCaseSelection, setTestCaseSelection] = useState('ALL');
  const [images, setImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisibleFilter, setIsPopupVisibleFilter] = useState(false);
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' }); 
  const [projectID] = useState(getProjectID());
  const [selectedTestCases, setSelectedTestCases] = useState([]);
  const [APIres, setAPIres] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { selectedOption } = location.state || {};

  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0';
  const sourcePage = searchParams.get('source');
  const suiteName = searchParams.get('suite') || 'Test Suite';

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const usersData = await getQaUsers('qa-user');
        console.log(`user response: ${JSON.stringify(usersData, null, 2)}`); // debug statement, remove before production

        setUsers(usersData);

        const milestonesData = await fetchMilestonesIdName(projectID);
        
        if (Array.isArray(milestonesData)) {
          setMilestones(milestonesData);
        } else {
          console.warn('Expected milestonesData to be an array:', milestonesData);
          setMilestones([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [projectID, selectedOption]);
  // console.log(`These are the selected test cases: ${selectedTestCases}`);
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    
  //   const userID = sessionStorage.getItem("user_id");

  //   if (testCaseSelection === 'ALL' || testCaseSelection === 'SELECTED' || testCaseSelection === 'REGEX_ON_NAME') {
  //     const testRunData = {
  //       name,
  //       test_suite_id: selectedOption || suiteId,
  //       created_by: userID,
  //       milestone_id: milestone,
  //       description,
  //       test_case_filter: testCaseSelection,
  //       project_id: projectID,
  //       assigned_to: assignTo,
  //     };

  //     try {
  //       await createTestRun(testRunData);
  //       console.log('Test run created successfully');
  
  //       if (sourcePage === 'TestSuiteTestRuns') {
  //         navigate(`/TestSuiteTestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
  //       } else if (sourcePage === 'TestRuns') {
  //           navigate('/TestRuns')
  //         } else {
  //           navigate('/TestSuitsCases');
  //       }
  //     } catch (error) {
  //       console.error('Failed to create Test Run:', error);
  
  //       if (error.response && error.response.data && error.response.data.name) {
          
  //         setAlert({ message: 'Test run with this name already exists.', type: 'error' });
  //       } else if (error.response && error.response.data && error.response.data.test_case_filter) {
  //         setAlert({ message: 'Not a valid choice. Please select a valid test case filter.', type: 'error' });
  //       } else {
  //         setAlert({ message: 'Failed to create Test Run. Please try again.', type: 'error' });
  //       }
  //     }
  //   } else {
  //     setAlert({ message: '"all" is not a valid choice. Please select a valid test case filter.', type: 'error' });
  //   }
  // };

  const formatSelectedTestCases = () => {
    if (testCaseSelection !== 'SELECTED' || selectedTestCases.length === 0) {
      return '';
    }
  
    return selectedTestCases.join(', ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    const userID = sessionStorage.getItem("user_id");
  
    let testCaseFilter = '';
  
    if (testCaseSelection === 'ALL') {
      testCaseFilter = '';
    } else if (testCaseSelection === 'SELECTED') {
      testCaseFilter = formatSelectedTestCases();
    }
  
    let testRunData = {
      name,
      test_suite_id: selectedOption,
      created_by: userID,
      description,
      test_case_filter: testCaseSelection,
      test_case_filter_value: testCaseFilter,
      project_id: projectID,
    };

    if(milestone !== '') testRunData = {...testRunData, milestone_id: milestone};
    if(assignTo !== '') testRunData = {...testRunData, assigned_to: assignTo};

    

    console.log('Selected Test Cases:', selectedTestCases);
    console.log('Selected Test Cases:', testCaseFilter);
    console.log('Selected Test Cases:', testRunData);



  
    try {
      await createTestRun(testRunData);
      console.log('Test run created successfully');
  
      if (sourcePage === 'TestSuiteTestRuns') {
        navigate(`/TestSuiteTestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
      } else if (sourcePage === 'TestRuns') {
        navigate('/TestRuns');
      } else {
        navigate('/TestSuitsCases');
      }
    } catch (error) {
      console.error('Failed to create Test Run:', error);
  
      if (error.response && error.response.data && error.response.data.name) {
        setAlert({ message: 'Test run with this name already exists.', type: 'error' });
      } else if (error.response && error.response.data && error.response.data.test_case_filter) {
        setAlert({ message: 'Not a valid choice. Please select a valid test case filter.', type: 'error' });
      } else {
        setAlert({ message: 'Failed to create Test Run. Please try again.', type: 'error' });
      }
    }
  };
  
  

  
  
  
  const handleFilesChange = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    // navigate(from);
    if (sourcePage === 'TestSuiteTestRuns') {
      navigate(`/TestSuiteTestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
    } else if (sourcePage === 'TestRuns') {
        navigate('/TestRuns')
      } else {
        navigate('/TestSuitsCases');
    }
  };

  const handleClickableTextClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAlertClose = () => {
    setAlert({ message: '', type: '' });
  };

  return (
    <div className="test-run-container">
      {alert.message && (
        <AlertBox message={alert.message} type={alert.type} onClose={handleAlertClose} />
      )}
      <form className="test-run-form" onSubmit={handleSubmit}>
        <h2 className="add-test-run-title">Add Test Run</h2>

        <div className="test-run-form-group">
          <label htmlFor="name" className="test-run-label">
            Name<span className="test-run-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter test run name"
            className="test-run-input"
            required
          />
        </div>

        <div className="test-run-form-group">
          <div className='references-add-run-form-grp'>
            <label htmlFor="references">References</label>
            <a href="" className='add-references-add-run-form'>Add</a>
          </div>
          <input
            type="text"
            id="references"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            placeholder="Add reference IDs"
            className="test-run-input"
          />
        </div>

        <div className="test-run-form-group">
          <label htmlFor="milestone" className="test-run-label">
            Milestone
          </label>
          <select
            id="milestone"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            className="test-run-select"
          >
            <option value="">Select milestone</option>
            {milestones.length > 0 ? (
              milestones.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No milestones available</option>
            )}
          </select>
        </div>

        <div className="test-run-form-group">
          <label htmlFor="assignTo" className="test-run-label">
            Assign To
          </label>
          <select
            id="assignTo"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            className="test-run-select"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.email} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="test-run-form-group">
          <label htmlFor="description" className="test-run-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Use this description to describe the purpose of this test run."
            className="test-run-textarea"
          />
        </div>

        <div className="test-run-case-selection">
          <div>
            <input
              type="radio"
              id="include-all"
              name="testCaseSelection"
              value="ALL"
              checked={testCaseSelection === 'ALL'}
              onChange={() => setTestCaseSelection('ALL')}
              className="test-run-radio"
            />
            <label htmlFor="include-all" className="test-run-radio-label">
              <strong>Include all test cases</strong>
              <p className='test-run-radio-label-description'>Select this option to include all test cases in this test run. If new test cases are added to the test suite, they are also automatically included in this run.</p>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="select-specific"
              name="testCaseSelection"
              value="SELECTED"
              checked={testCaseSelection === 'SELECTED'}
              onChange={() => setTestCaseSelection('SELECTED')}
              className="test-run-radio"
            />
            <label htmlFor="select-specific" className="test-run-radio-label">
              <strong>Select specific test cases</strong>
              <p className='test-run-radio-label-description'>You can alternatively select the test cases to include in this test run. New test cases are not automatically added to this run in this case.</p>
            </label>
          </div>

          {testCaseSelection === 'SELECTED' && (
            <div className='add-test-run-filter-selection'>
              <span><strong>0</strong> test cases included </span>
              <span className='add-test-run-filter-text'> (<span className="add-test-run-filter-clickable-text" onClick={handleClickableTextClick}>Change Selection</span>)</span>
            </div>
          )}

          <div>
            <input
              type="radio"
              id="dynamic-filtering"
              name="testCaseSelection"
              value="REGEX_ON_NAME"
              checked={testCaseSelection === 'REGEX_ON_NAME'}
              onChange={() => setTestCaseSelection('REGEX_ON_NAME')}
              className="test-run-radio"
            />
            <label htmlFor="dynamic-filtering" className="test-run-radio-label">
              <strong>Dynamic Filtering</strong>
              <p className='test-run-radio-label-description'>Automatically add test cases based on filter selection. New test cases are automatically added to the run if they match the filter (unless the run is closed).</p>
            </label>
          </div>
          {testCaseSelection === 'REGEX_ON_NAME' && (
            <div className='add-test-run-filter-selection'>
              <span><strong>0</strong> test cases included </span>
              <span className='add-test-run-filter-text'> (<span className="add-test-run-filter-clickable-text" onClick={handleClickableTextClick}>Change Filter</span>)</span>
            </div>
          )}
        </div>

        <FileUpload onFilesChange={handleFilesChange}/>

        <div className="test-run-buttons">
          <button type="submit" className="test-run-button test-run-submit">
            ✓ Add Test Run
          </button>
          <button
            type="button"
            className="test-run-button test-run-cancel"
            onClick={handleCancel}
          >
            ✗ Cancel
          </button>
        </div>

        {isPopupVisible && 
          <FilterPopup setApiRes = {setAPIres} setSelectionsInChild={setSelectedTestCases} suiteId = {selectedOption} onCancel={() => setIsPopupVisible(false)}/>}
        
      </form>
    </div>
  );
};

export default AddTestRun;





