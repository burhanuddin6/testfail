// import React, { useState, useEffect } from 'react';
// import '../styles/AddTestPlan.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Popup from './selectSuite';
// import FileUpload from '../components/fileUpload';

// const AddTestPlan = () => {
//   const [name, setName] = useState('');
//   const [references, setReferences] = useState('');
//   const [milestone, setMilestone] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [selectedPopupOptions, setSelectedPopupOptions] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from;

//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   const handleConfirm = (option, actionType) => {
//     if (actionType === 'suite') {
//       setSelectedPopupOptions([...selectedPopupOptions, option]);
//       console.log(`suite data in add test plan response: ${JSON.stringify(option, null, 2)}`); // debug statement, remove before production

//       setPopupVisible(false);
//     }
//     setIsPopupVisible(false);
//   };

//   const handleCancel = () => {
//     navigate(from);
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleRemoveOption = (option) => {
//     setSelectedPopupOptions((prev) => prev.filter((opt) => opt !== option));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Handle form submission here
//     console.log('Form submitted with:', {
//       name,
//       references,
//       milestone,
//       description,
//       images,
//     });
//     navigate(from);
//   };

//   return (
//     <div className="test-plan-container">
//       <form className="test-plan-form" onSubmit={handleSubmit}>
//         <h2 className="add-test-plan-title">Add Test Plan</h2>

//         <div className="test-plan-form-group">
//           <label htmlFor="name" className="test-plan-label">
//             Name<span className="test-plan-required">*</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter test run name"
//             className="test-plan-input"
//             required
//           />
//         </div>

//         <div className="test-plan-form-group">
//           <div className='references-add-plan-form-grp'>
//             <label htmlFor="references">References</label>
//             <a href="" className='add-references-add-plan-form'>Add</a>
//           </div>

//           <input
//             type="text"
//             id="references"
//             value={references}
//             onChange={(e) => setReferences(e.target.value)}
//             placeholder="Add reference IDs"
//             className="test-plan-input"
//           />
//         </div>

//         <div className="test-plan-form-group">
//           <label htmlFor="milestone" className="test-plan-label">
//             Milestone
//           </label>
//           <select
//             id="milestone"
//             value={milestone}
//             onChange={(e) => setMilestone(e.target.value)}
//             className="test-plan-select"
//           >
//             <option value="">Select milestone</option>
//             <option value="milestone1">Milestone 1</option>
//             <option value="milestone2">Milestone 2</option>
//             <option value="milestone3">Milestone 3</option>
//           </select>
//         </div>

//         <div className="test-plan-form-group">
//           <label htmlFor="description" className="test-plan-label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Use this description to describe the purpose of this test run."
//             className="test-plan-textarea"
//           />
//           {/* <input
//             type="file"
//             id="file-upload"
//             name="file-upload"
//             onChange={handleFileChange}
//             accept="image/*"
//             multiple
//           /> */}
//         </div>

//         <div className='form-add-test-suite'>
//             <label htmlFor="test-suites" className="test-plan-label">
//                 Test Suites
//             </label>
//             <div className='selected-test-suite'>
//                 <ul>
//                     {selectedPopupOptions.map((option, index) => (
//                     <li key={index}>
//                         <button className="testsuite-remove" onClick={() => handleRemoveOption(option)}>✗</button>
//                         {option}
//                     </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className='test-plan-input-buttons'>
//                 <button
//                     type="button"
//                     className="test-plan-button"
//                     onClick={() => setIsPopupVisible(true)}
//                 >
//                     + Add Test Suite
//                 </button>
//                 {isPopupVisible && (
//                   <Popup
//                     onConfirm={handleConfirm}
//                     onCancel={() => setIsPopupVisible(false)}
//                     actionType="suite"
//                   />
//                 )}
//             </div>
            
//         </div>
        
//         <FileUpload/>
        

//         <div className="test-plan-buttons">
//           <button type="submit" className="test-plan-button test-plan-submit">
//             ✓ Add Test Plan
//           </button>
//           <button
//             type="button"
//             className="test-plan-button test-plan-cancel"
//             onClick={handleCancel}
//           >
//             ✗ Cancel
//           </button>
//         </div>
//       </form>

//       {popupVisible && (
//         <Popup
//           closePopup={() => setPopupVisible(false)}
//           onConfirm={handleConfirm}
//         />
//       )}

//     </div>
//   );
// };

// export default AddTestPlan;





import React, { useState, useEffect } from 'react';
import '../styles/AddTestPlan.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProjectID } from '../utilities/globals';
import { createTestPlan } from '../api/TestPlan';
import { fetchMilestonesIdName } from '../api/Milestone';


import Popup from './selectSuite';
import FileUpload from '../components/fileUpload';

const AddTestPlan = () => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [milestone, setMilestone] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPopupOptions, setSelectedPopupOptions] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [files, setFiles] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const projectID = getProjectID();
  const userID = sessionStorage.getItem("user_id");

  // Fetch milestones on component mount
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const milestonesData = await fetchMilestonesIdName(projectID);
        setMilestones(milestonesData);
      } catch (error) {
        console.error('Failed to fetch milestones:', error);
      }
    };

    fetchMilestones();
  }, [projectID]);

  const handleConfirm = (option, actionType) => {
    if (actionType === 'suite') {
      if (!selectedPopupOptions.some(o => o.test_suite_id === option.test_suite_id)) {
        setSelectedPopupOptions([...selectedPopupOptions, option]);
      }
      setPopupVisible(false);
    }
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    navigate(from);
  };


  const handleFilesChange = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleRemoveOption = (option) => {
    setSelectedPopupOptions((prev) => prev.filter((opt) => opt !== option));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const testPlanData = {
      name,
      project_id: projectID,
      selection: selectedPopupOptions.map(option => ({
        test_suite_id: option,
        selection_type: "ALL",
        selection: option.selection || []
      })),
      created_by: userID,
      references,
      milestone,
      description,
      images
    };

    try {
      // Replace with your actual API call
      await createTestPlan(testPlanData);
      console.log('Test plan created successfully:', testPlanData);
      navigate(from);
    } catch (error) {
      console.error('Failed to create test plan:', error);
    }
  };

  return (
    <div className="test-plan-container">
      <form className="test-plan-form" onSubmit={handleSubmit}>
        <h2 className="add-test-plan-title">Add Test Plan</h2>

        <div className="test-plan-form-group">
          <label htmlFor="name" className="test-plan-label">
            Name<span className="test-plan-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter test run name"
            className="test-plan-input"
            required
          />
        </div>

        <div className="test-plan-form-group">
          <div className='references-add-plan-form-grp'>
            <label htmlFor="references">References</label>
            <a href="" className='add-references-add-plan-form'>Add</a>
          </div>

          <input
            type="text"
            id="references"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            placeholder="Add reference IDs"
            className="test-plan-input"
          />
        </div>

        <div className="test-plan-form-group">
          <label htmlFor="milestone" className="test-plan-label">
            Milestone
          </label>
          <select
            id="milestone"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            className="test-plan-select"
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

        <div className="test-plan-form-group">
          <label htmlFor="description" className="test-plan-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Use this description to describe the purpose of this test run."
            className="test-plan-textarea"
          />
          {/* <input
            type="file"
            id="file-upload"
            name="file-upload"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          /> */}
        </div>

        <div className='form-add-test-suite'>
            <label htmlFor="test-suites" className="test-plan-label">
                Test Suites
            </label>
            <div className='selected-test-suite'>
                <ul>
                    {selectedPopupOptions.map((option, index) => (
                    <li key={index}>
                        <button className="testsuite-remove" onClick={() => handleRemoveOption(option)}>✗</button>
                        {option.test_suite_id}
                    </li>
                    ))}
                </ul>
            </div>
            <div className='test-plan-input-buttons'>
                <button
                    type="button"
                    className="test-plan-button"
                    onClick={() => setIsPopupVisible(true)}
                >
                    + Add Test Suite
                </button>
                {isPopupVisible && (
                  <Popup
                    onConfirm={handleConfirm}
                    onCancel={() => setIsPopupVisible(false)}
                    actionType="suite"
                  />
                )}
            </div>
            
        </div>
        
        <FileUpload onFilesChange={handleFilesChange}/>

        <div className="test-plan-buttons">
          <button type="submit" className="test-plan-button test-plan-submit">
            ✓ Add Test Plan
          </button>
          <button
            type="button"
            className="test-plan-button test-plan-cancel"
            onClick={handleCancel}
          >
            ✗ Cancel
          </button>
        </div>
      </form>

      {popupVisible && (
        <Popup
          closePopup={() => setPopupVisible(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default AddTestPlan;
