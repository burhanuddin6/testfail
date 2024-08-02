import React, { useState, useEffect } from 'react';
import '../styles/AddTestPlan.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from './selectSuite';

const AddTestPlan = () => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [milestone, setMilestone] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPopupOptions, setSelectedPopupOptions] = useState([]);

  const handlePopupConfirm = (option) => {
    setSelectedPopupOptions([...selectedPopupOptions, option]);
    setPopupVisible(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

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
          <label htmlFor="references" className="test-plan-label">
            References
          </label>
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

        <div className='form-add-test-suite'>
            <label htmlFor="test-suites" className="test-plan-label">
                Test Suites
            </label>
            <div className='selected-test-suite'>
                <ul>
                    {selectedPopupOptions.map((option, index) => (
                    <li key={index}>
                        {option}
                        <button onClick={() => handleRemoveOption(option)}>Remove</button>
                    </li>
                    ))}
                </ul>
            </div>
            <div className='test-plan-input-buttons'>
                <button
                    type="button"
                    className="test-plan-button"
                    onClick={() => setPopupVisible(true)}
                >
                    + Add Test Suite
                </button>
            </div>
            
        </div>
        
        

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
          onConfirm={handlePopupConfirm}
        />
      )}

    </div>
  );
};

export default AddTestPlan;
