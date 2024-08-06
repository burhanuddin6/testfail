// import React, { useState } from 'react';
// import '../styles/AddSection.css'; // Import the CSS file
// import { useNavigate, useLocation } from 'react-router-dom';


// const AddSection = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const searchParams = new URLSearchParams(location.search);
//   const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
//   const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//     console.log('Form submitted with:', {
//       name,
//       description,
//       file,
//     });

//     // Navigate back to the Sections & Cases page
//     navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();

//     // Navigate back to the Sections & Cases page
//     navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   return (
//     <div className="add-section-container">
//       <form className="add-section-form" onSubmit={handleSubmit}>
//         <h2 className="add-section-title">Add Section</h2>

//         <div className="add-section-form-group">
//           <label htmlFor="name" className="add-section-label">
//             Name<span className="add-section-required">*</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Ex: Save Dialog Tests, Contact Form or Performance Tests"
//             className="add-section-input"
//             required
//           />
//         </div>

//         <div className="add-section-form-group">
//           <label htmlFor="description" className="add-section-label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="An optional description for this section (e.g. to explain its content or purpose)."
//             className="add-section-textarea"
//           />
//         </div>

//         <div className="add-section-file-upload">
//           <div className="file-upload-icon" />
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="file-upload-input"
//           />
//           <p className="file-upload-text">
//             Drop files here to attach, or click on "+" to browse
//           </p>
//         </div>

//         <div className="add-section-buttons">
//           <button type="submit" className="add-section-form-button add-section-submit">
//             ✓ Add Section
//           </button>
//           <button
//             type="button"
//             className="add-section-form-button add-section-cancel"
//             onClick={handleCancel}
//           >
//             ✗ Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddSection;


import React, { useState } from 'react';
import '../styles/AddSection.css'; // Import the CSS file
import { useNavigate, useLocation } from 'react-router-dom';
import { createSection } from '../api/Section'; // Import the API function
import FileUpload from '../components/fileUpload';


const AddSection = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null); // State to handle errors

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId') || '0'; // Default to '0' if no suiteId is provided
  const suiteName = searchParams.get('suite') || 'Test Suite'; // Default to 'Test Suite' if no suiteName is provided

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = sessionStorage.getItem('user_id');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);
    console.log("file is" + file);
    formData.append('test_suite_id', suiteId);
    formData.append('created_by', userId); 
    // formData.append('parent_id', null); 
    try {
      await createSection(formData); // Use the API function
      navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
    } catch (err) {
      setError('Failed to create section. Please try again.'); // Set error message
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/SectionsCases?suiteId=${suiteId}&suite=${encodeURIComponent(suiteName)}`);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="add-section-container">
      <form className="add-section-form" onSubmit={handleSubmit}>
        <h2 className="add-section-title">Add Section</h2>

        {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}

        <div className="add-section-form-group">
          <label htmlFor="name" className="add-section-label">
            Name<span className="add-section-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Save Dialog Tests, Contact Form or Performance Tests"
            className="add-section-input"
            required
          />
        </div>

        <div className="add-section-form-group">
          <label htmlFor="description" className="add-section-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="An optional description for this section (e.g. to explain its content or purpose)."
            className="add-section-textarea"
          />
        </div>

        <FileUpload/>

        <div className="add-section-buttons">
          <button type="submit" className="add-section-form-button add-section-submit">
            ✓ Add Section
          </button>
          <button
            type="button"
            className="add-section-form-button add-section-cancel"
            onClick={handleCancel}
          >
            ✗ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSection;

