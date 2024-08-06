import React, { useState, useEffect } from 'react';
import '../styles/AddTestPlan.css';
import { useNavigate, useLocation } from 'react-router-dom';
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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleConfirm = (option, actionType) => {
    if (actionType === 'suite') {
      setSelectedPopupOptions([...selectedPopupOptions, option]);
      setPopupVisible(false);
    }
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    navigate(from);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveOption = (option) => {
    setSelectedPopupOptions((prev) => prev.filter((opt) => opt !== option));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission here
    console.log('Form submitted with:', {
      name,
      references,
      milestone,
      description,
      images,
    });
    navigate(from);
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
            <option value="milestone1">Milestone 1</option>
            <option value="milestone2">Milestone 2</option>
            <option value="milestone3">Milestone 3</option>
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
                        {option}
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
        
        <FileUpload/>
        

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
