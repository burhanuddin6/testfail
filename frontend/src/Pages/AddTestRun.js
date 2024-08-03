// import React, { useState } from 'react';
// import '../styles/AddTestRun.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { createTestRun } from '../api/TestRun'; // Import the createTestRun function

// const AddTestRun = ({userID}) => {
//   const [name, setName] = useState('');
//   const [references, setReferences] = useState('');
//   const [milestone, setMilestone] = useState('');
//   const [assignTo, setAssignTo] = useState('');
//   const [description, setDescription] = useState('');
//   const [testCaseSelection, setTestCaseSelection] = useState('all');

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve suite ID, source page, and suite name from URL query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
//   const sourcePage = searchParams.get('source'); // Will be either 'TestSuitesCases' or 'TestRuns'
//   const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

//   const handleSubmit = async (event) => {
//     event.preventDefault();

    
//     // Prepare the test run data
//     const testRunData = {
//       name,
//       test_suite_id: 1, 
//       creator_id: userID,   
//       milestone_id: 1,
//       description,
//       test_case_filter: testCaseSelection === 'specific' ? 'Specific Test Cases Filter' : '', 
//       project_id: 1,     
//     };

//     try {
//       // Call the API to create the test run
//       await createTestRun(testRunData);
//       console.log('Test run created successfully');

//       // Navigate based on the source page
//       if (sourcePage === 'TestRuns') {
//         navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//       } else {
//         navigate('/TestSuitsCases'); // Default to Test Suites & Cases
//       }
//     } catch (error) {
//       console.error('Failed to create Test Run:', error);
//       // Optionally, you could show an error message to the user here
//     }
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();

//     // Navigate based on the source page and include suite ID in URL
//     if (sourcePage === 'TestRuns') {
//       navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//     } else {
//       navigate('/TestSuitsCases');
//     }
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
//             <option value="milestone1">Milestone 1</option>
//             <option value="milestone2">Milestone 2</option>
//             <option value="milestone3">Milestone 3</option>
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
//             <option value="user1">User 1</option>
//             <option value="user2">User 2</option>
//             <option value="user3">User 3</option>
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
//         </div>

//         <div className="test-run-case-selection">
//           <div>
//             <input
//               type="radio"
//               id="include-all"
//               name="testCaseSelection"
//               value="all"
//               checked={testCaseSelection === 'all'}
//               onChange={() => setTestCaseSelection('all')}
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
//               value="specific"
//               checked={testCaseSelection === 'specific'}
//               onChange={() => setTestCaseSelection('specific')}
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
//               value="dynamic"
//               checked={testCaseSelection === 'dynamic'}
//               onChange={() => setTestCaseSelection('dynamic')}
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
import { createTestRun } from '../api/TestRun'; // Import the createTestRun function
import { getQaUsers } from '../api/Auth'; // Import the getQaUsers function
import { fetchMilestonesIdName } from '../api/Milestone'; // Import the fetchMilestonesIdName function
import { getProjectID } from '../utilities/globals'; // Import getProjectID

const AddTestRun = ({ userID }) => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [milestone, setMilestone] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [description, setDescription] = useState('');
  const [testCaseSelection, setTestCaseSelection] = useState('all');
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { selectedOption } = location.state || {};

  // Retrieve suite ID, source page, and suite name from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const sourcePage = searchParams.get('source'); // Will be either 'TestSuitesCases' or 'TestRuns'
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided
  
  const [projectID] = useState(getProjectID()); // Retrieve the project ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users assigned to the QA group
        const usersData = await getQaUsers('qa-user');
        setUsers(usersData);

        // Fetch milestones for the project
        const milestonesData = await fetchMilestonesIdName(projectID);
        setMilestones(milestonesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [projectID]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the test run data
    const testRunData = {
      name,
      test_suite_id: 1, 
      created_by: userID,   
      milestone_id: milestone, // Update to use selected milestone ID
      description,
      test_case_filter: testCaseSelection, 
      project_id: projectID, // Update to use current project ID
    };

    try {
      // Call the API to create the test run
      await createTestRun(testRunData);
      console.log('Test run created successfully');

      // Navigate based on the source page
      if (sourcePage === 'TestRuns') {
        navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
      } else {
        navigate('/TestSuitsCases'); // Default to Test Suites & Cases
      }
    } catch (error) {
      console.error('Failed to create Test Run:', error);
      // Optionally, you could show an error message to the user here
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  
  return (
    <div className="test-run-container">
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
          <label htmlFor="references" className="test-run-label">
            References
          </label>
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
            {milestones.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="test-run-form-group">
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
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div> */}

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
              <option key={user.email} value={user.email}>
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
          <input 
            type="file"
            id="file-upload"
            name="file-upload"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>

        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className="preview-image"
              />
              <button
                type="button"
                className="remove-image-button"
                onClick={() => removeImage(index)}
              >
                ✗
              </button>
            </div>
          ))}
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
              Include all test cases
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
              Select specific test cases
            </label>
          </div>

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
              Dynamic Filtering
            </label>
          </div>
        </div>

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
      </form>
    </div>
  );
};

export default AddTestRun;

// import React, { useState, useEffect } from 'react';
// import '../styles/AddTestRun.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { createTestRun } from '../api/TestRun'; // Import the createTestRun function
// import { getQaUsers } from '../api/Auth'; // Import the getQaUsers function
// import { fetchMilestonesIdName } from '../api/Milestone'; // Import the fetchMilestonesIdName function
// import { getProjectID } from '../utilities/globals'; // Import getProjectID

// const AddTestRun = ({ userID }) => {
//   const [name, setName] = useState('');
//   const [references, setReferences] = useState('');
//   const [milestone, setMilestone] = useState('');
//   const [assignTo, setAssignTo] = useState('');
//   const [description, setDescription] = useState('');
//   const [testCaseSelection, setTestCaseSelection] = useState('all'); // Ensure this matches the backend values
  
//   const [milestones, setMilestones] = useState([]);
//   const [users, setUsers] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve suite ID, source page, and suite name from URL query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
//   const sourcePage = searchParams.get('source'); // Will be either 'TestSuitesCases' or 'TestRuns'
//   const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided
  
//   const [projectID] = useState(getProjectID()); // Retrieve the project ID

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch users assigned to the QA group
//         const usersData = await getQaUsers('qa-user');
//         setUsers(usersData);

//         // Fetch milestones for the project
//         const milestonesData = await fetchMilestonesIdName(projectID);
//         setMilestones(milestonesData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [projectID]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Prepare the test run data
//     const testRunData = {
//       name,
//       test_suite_id: 1, 
//       created_by: userID,   
//       milestone_id: milestone, // Update to use selected milestone ID
//       description,
//       test_case_filter: testCaseSelection, // Use the selected filter value
//       project_id: projectID, // Update to use current project ID
//     };

//     try {
//       // Call the API to create the test run
//       await createTestRun(testRunData);
//       console.log('Test run created successfully');

//       // Navigate based on the source page
//       if (sourcePage === 'TestRuns') {
//         navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//       } else {
//         navigate('/TestSuitsCases'); // Default to Test Suites & Cases
//       }
//     } catch (error) {
//       console.error('Failed to create Test Run:', error);
//       // Optionally, you could show an error message to the user here
//     }
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();

//     // Navigate based on the source page and include suite ID in URL
//     if (sourcePage === 'TestRuns') {
//       navigate(`/TestRuns?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//     } else {
//       navigate('/TestSuitsCases');
//     }
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
//             {milestones.map((m) => (
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
//         </div>

//         <div className="test-run-case-selection">
//           <div>
//             <input
//               type="radio"
//               id="include-all"
//               name="testCaseSelection"
//               value="all" // Backend value for 'ALL'
//               checked={testCaseSelection === 'all'}
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
//               value="selected" // Backend value for 'SELECTED'
//               checked={testCaseSelection === 'selected'}
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
//               value="regex" // Backend value for 'REGEX_ON_NAME'
//               checked={testCaseSelection === 'regex'}
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


