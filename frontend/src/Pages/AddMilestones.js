import React, { useState, useEffect } from 'react';
import '../styles/AddMilestones.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { createMilestone } from '../api/Milestone';
import { getProjectID } from '../utilities/globals';
import { fetchMilestonesIdName } from '../api/Milestone'; 

const AddMilestone = ({ userID }) => {
  const [name, setName] = useState('');
  const [references, setReferences] = useState('');
  const [parent, setParent] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newText, setNewText] = useState('');
  const [images, setImages] = useState([]);
  const [projectID] = useState(getProjectID());
  const [parentMilestones, setParentMilestones] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  const action = location.state?.action;

  useEffect(() => {
    const loadParentMilestones = async () => {
      try {
        const milestones = await fetchMilestonesIdName(projectID);
        setParentMilestones(milestones);
      } catch (error) {
        console.error('Error fetching parent milestones:', error); //debug statement, remove before deployment
      }
    };

    loadParentMilestones();
  }, [projectID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("userID in AddMilestone page " + userID); //debug statement, remove before deployment
    const milestoneData = {
      name,
      created_by: userID,
      parent_id: parent || null,
      description,
      start_date: startDate || null,
      end_date: endDate || null,
      is_complete: isCompleted,
      project_id: projectID,
    };

    try {
      const createdMilestone = await createMilestone(milestoneData); //remove storing response 
      console.log('Milestone created:', createdMilestone); //debug statement, remove before deployment
      console.log('ProjID in addmilestone', projectID); //debug statement, remove before deployment
      // navigate(`/milestones/overview?projectID=${projectID}`); // URL CHANGE
      navigate(from); //batoolchange

    } catch (error) {
      console.error('Failed to create milestone:', error); //debug statement, remove before deployment
    }
  };

  const handleCancel = (e) => {
    // e.preventDefault();
    // navigate(`/milestones/overview?projectID=${projectID}`); // URL CHANGE
    navigate(from); //batoolchange
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="milestone-form">
      <form className='add_f' onSubmit={handleSubmit}>
        <h2>{action == "edit" ? 'Edit' : 'Add'} Milestone</h2>
        <div className="add-form-group">
          <label htmlFor="name">Name<span className='required'>*</span></label> 
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Version 1.0, Internal Beta 2 or Sprint #4"
            required
          /> 
        </div>
        <div className="add-form-group">
          <label htmlFor="references">References</label>
          <input
            type="text"
            id="references"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="parent">Parent</label>
          <select
            id="parent"
            value={parent}
            onChange={(e) => setParent(e.target.value)}
          >
            <option value="">Select parent milestone</option>
            {parentMilestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Use this description to describe the purpose and goals of this milestone."
          >
          </textarea>

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

        <div className="add-form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="The expected or scheduled start date of this milestone (for upcoming and not yet active milestones)."
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="The expected due or end date of this milestone."
          />
        </div>
        <div className='add-form-check'>
          <input
            type="checkbox"
            id="isCompleted"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <label htmlFor="isCompleted">This milestone is completed</label>
        </div>
        <div className="form-buttons">
          <button type="submit" className='add-edit-button'> ✓ {action == "edit" ? 'Update' : 'Add'} Milestone</button>
          <button type="button" onClick={handleCancel} className='add-cancel-button'>✗ Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMilestone;
