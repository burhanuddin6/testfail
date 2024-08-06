import React, { useState } from 'react';
import '../styles/Milestones.css';
import { useNavigate } from 'react-router-dom';

const Milestones = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  const [openMilestones, setOpenMilestones] = useState([
    { id: 1, name: 'FSA Release 1.114 Cycle 1', checked: false },
    { id: 2, name: 'Dummy-Interns', checked: false },
  ]);
  const [completedMilestones, setCompletedMilestones] = useState([
    { id: 3, name: 'Release 1.120', checked: false },
    { id: 4, name: 'Genstack', checked: false },
  ]);

  const handleFormat = () => {
    setShowButtons(!showButtons);
  };

  const handleCheckboxChange = (id, type) => {
    if (type === 'open') {
      setOpenMilestones(openMilestones.map((milestone) => {
        if (milestone.id === id) {
          return { ...milestone, checked: !milestone.checked };
        }
        return milestone;
      }));
    } else {
      setCompletedMilestones(completedMilestones.map((milestone) => {
        if (milestone.id === id) {
          return { ...milestone, checked: !milestone.checked };
        }
        return milestone;
      }));
    }
  };

  const handleDelete = () => {
    setOpenMilestones(openMilestones.filter((milestone) => !milestone.checked));
    setCompletedMilestones(completedMilestones.filter((milestone) => !milestone.checked));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/add-milestone', { state: { from: '/milestones', action: 'add' } });
  };

  // Handle click on a milestone to navigate to milestone-status page
  const handleMilestoneClick = (milestoneId, milestoneName) => {
    navigate(`/milestone-status?milestoneId=${milestoneId}&milestoneName=${encodeURIComponent(milestoneName)}`);
  };

  return (
    <div className="Milestones-container">
      <div className='milestone-main-heading'>
        <h2>Milestones</h2>
        <div className='button-class'>
          <button className="milestone-add-button" onClick={handleAdd}> + Add Milestone</button>
          <button className="milestone-delete-button" onClick={handleDelete}> - Delete Milestone</button>
        </div>
      </div>

      <div className='milestone-listing'>
        <div className='milestones-open'>
          <h3 className='milestones-heading'>Open</h3>
          <div className='milestones-scrollable'>
            {openMilestones.map((milestone) => (
              <div className='details' key={milestone.id}>
                <input type="checkbox" checked={milestone.checked} onChange={() => handleCheckboxChange(milestone.id, 'open')} />
                <a
                  // href="#"
                  className='milestoneName'
                  onClick={() => handleMilestoneClick(milestone.id, milestone.name)}
                >
                  {milestone.name}
                </a>
                <div className="status-bar">
                  <div className="status-bar-inner status-6"></div>
                </div>
                <span className="milestoneStatus">6%</span>
              </div>
            ))}
          </div>
        </div>

        <div className='milestones-completed'>
          <h3 className='milestones-heading'>Completed</h3>
          <div className='milestones-scrollable'>
            <div className='milestones-completed-datewise'>
              <div className='milestones-completed-date'>
                20 July 2024
              </div>
              {completedMilestones.map((milestone) => (
                <div className='details' key={milestone.id}>
                  <input type="checkbox" checked={milestone.checked} onChange={() => handleCheckboxChange(milestone.id, 'completed')} />
                  <a
                    // href="#"
                    className='milestoneName'
                    onClick={() => handleMilestoneClick(milestone.id, milestone.name)}
                  >
                    {milestone.name}
                  </a>
                </div>
              ))}
            </div>
            <div className='milestones-completed-datewise'>
              <div className='milestones-completed-date'>
                19 July 2024
              </div>
              {completedMilestones.map((milestone) => (
                <div className='details' key={milestone.id}>
                  <input type="checkbox" checked={milestone.checked} onChange={() => handleCheckboxChange(milestone.id, 'completed')} />
                  <a
                    href="#"
                    className='milestoneName'
                    onClick={() => handleMilestoneClick(milestone.id, milestone.name)}
                  >
                    {milestone.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
