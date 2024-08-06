// import React, { useState, useEffect } from 'react';
// import '../styles/Milestones.css';
// import { useNavigate } from 'react-router-dom';
// import { fetchMilestones, deleteMilestone } from '../api/Milestone';
// import AlertBox from '../components/Alert'; 
// import { getProjectID } from '../utilities/globals';

// const Milestones = () => {
//   const navigate = useNavigate();
//   const [showButtons, setShowButtons] = useState(false);
//   const [openMilestones, setOpenMilestones] = useState([]);
//   const [completedMilestones, setCompletedMilestones] = useState([]);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const projectID = getProjectID();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchMilestones(projectID);
//         console.log("Fetched milestones data:", data); //debug statement, remove before deployment 

//         // Filter open milestones: not completed and no parent
//         const open = data
//           .filter(milestone => !milestone.is_complete && milestone.parent_id === null)
//           .sort((a, b) => new Date(b.created_on) - new Date(a.created_on)); // Sort by creation date, latest first

//         // Filter completed milestones
//         const completed = data
//           .filter(milestone => milestone.is_complete)
//           .sort((a, b) => new Date(b.completed_on) - new Date(a.completed_on)); // Sort by completion date, latest first

//         setOpenMilestones(open);
//         setCompletedMilestones(completed);
//       } catch (error) {
//         console.error('Error fetching milestones:', error); //debug statement, remove before deployment 
//         setError('Error fetching milestones. Please try again.');
//       }
//     };

//     fetchData();
//   }, [projectID]);

//   const handleFormat = () => {
//     setShowButtons(!showButtons);
//   };

//   const handleCheckboxChange = (id, type) => {
//     if (type === 'open') {
//       setOpenMilestones(openMilestones.map((milestone) => {
//         if (milestone.id === id) {
//           return { ...milestone, checked: !milestone.checked };
//         }
//         return milestone;
//       }));
//     } else {
//       setCompletedMilestones(completedMilestones.map((milestone) => {
//         if (milestone.id === id) {
//           return { ...milestone, checked: !milestone.checked };
//         }
//         return milestone;
//       }));
//     }
//   };

//   const handleDelete = async () => {
//     const idsToDelete = [
//       ...openMilestones.filter(milestone => milestone.checked).map(milestone => milestone.id),
//       ...completedMilestones.filter(milestone => milestone.checked).map(milestone => milestone.id)
//     ];

//     try { //Review for mariam
//       for (const id of idsToDelete) {
//         await deleteMilestone(id);
//       }

//       setOpenMilestones(openMilestones.filter(milestone => !milestone.checked));
//       setCompletedMilestones(completedMilestones.filter(milestone => !milestone.checked));

//       setSuccess('Successfully deleted.');
//       setError(null);
//     } catch (error) {
//       setError('Failed to delete. Please try again.');
//       setSuccess(null);
//     }
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     navigate('/add-milestone', { state: { from: '/milestones' , action: 'add'} });
//   };

//   // Group completed milestones by date
//   const groupByCompletionDate = (milestones) => {
//     return milestones.reduce((groups, milestone) => {
//       const date = new Date(milestone.completed_on).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(milestone);
//       return groups;
//     }, {});
//   };

//   const groupedCompletedMilestones = groupByCompletionDate(completedMilestones);

//   return (
//     <div className="Milestones-container">
//         <div className='milestone-main-heading'>
//             <h2>Milestones</h2>
//             <div className='button-class'>
//                 <button className="milestone-add-button" onClick={handleAdd}> + Add Milestone</button>
//                 <button className="milestone-delete-button" onClick={handleDelete}> - Delete Milestone</button>
//             </div>
//         </div>

//         <div className='milestone-listing'>
//          <div className='milestones-open'>
//             <h3 className='milestones-heading'> Open</h3>
//             <div className='milestones-scrollable'>
//                 {openMilestones.map((milestone) => (
//                   <div className='details' key={milestone.id}>
//                     <input
//                       type="checkbox"
//                       checked={milestone.checked || false} //Review
//                       onChange={() => handleCheckboxChange(milestone.id, 'open')}
//                     />
//                     <a href='/milestone-status' className='milestoneName'>{milestone.name}</a>
//                     <div className="status-bar">
//                       <div className="status-bar-inner status-52"></div>
//                     </div>
//                     <span className="milestoneStatus">8%</span>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           <div className='milestones-completed'>
//             <h3 className='milestones-heading'>Completed</h3>
//             <div className='milestones-scrollable'>
//               {Object.keys(groupedCompletedMilestones).map(date => (
//                 <div className='milestones-completed-datewise' key={date}>
//                   <div className='milestones-completed-date'>
//                     <p> {date}</p>
//                   </div>
//                   {groupedCompletedMilestones[date].map(milestone => (
//                     <div className='details' key={milestone.id}>
//                       <input type="checkbox" checked={milestone.checked} //Review
//                        onChange={() => handleCheckboxChange(milestone.id, 'completed')} /> 
//                       <a href='/milestone-status' className='milestoneName'>{milestone.name}</a>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//            </div>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default Milestones;

// working updated code mariam
import React, { useState, useEffect } from 'react';
import '../styles/Milestones.css';
import { useNavigate } from 'react-router-dom';
import { fetchMilestones, deleteMilestone } from '../api/Milestone';
import AlertBox from '../components/Alert'; 
import { getProjectID } from '../utilities/globals';

const Milestones = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [openMilestones, setOpenMilestones] = useState([]);
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [allMilestones, setAllMilestones] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const projectID = getProjectID();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMilestones(projectID);
        console.log("Fetched milestones data:", data); // Log fetched data

        // Filter open milestones: not completed and no parent
        const open = data
          .filter(milestone => !milestone.is_complete && milestone.parent_id === null)
          .sort((a, b) => new Date(b.created_on) - new Date(a.created_on)); // Sort by creation date, latest first

        // Filter completed milestones
        const completed = data
          .filter(milestone => milestone.is_complete && milestone.parent_id === null)
          .sort((a, b) => new Date(b.completed_on) - new Date(a.completed_on)); // Sort by completion date, latest first

        setOpenMilestones(open);
        setCompletedMilestones(completed);
        setAllMilestones(data)
      } catch (error) {
        console.error('Error fetching milestones:', error); // Log error
        setError('Error fetching milestones. Please try again.');
      }
    };

    fetchData();
  }, [projectID]);

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

  const handleDelete = async () => {
    const idsToDelete = [
      ...openMilestones.filter(milestone => milestone.checked).map(milestone => milestone.id),
      ...completedMilestones.filter(milestone => milestone.checked).map(milestone => milestone.id)
    ];

    try { 
      for (const id of idsToDelete) {
        await deleteMilestone(id);
      }

      setOpenMilestones(openMilestones.filter(milestone => !milestone.checked));
      setCompletedMilestones(completedMilestones.filter(milestone => !milestone.checked));

      setSuccess('Successfully deleted.');
      setError(null);
    } catch (error) {
      console.error('Failed to delete milestones:', error); // Log error
      setError('Failed to delete. Please try again.');
      setSuccess(null);
    }
  };

  const handleAdd = (e) => { 
    e.preventDefault();
    navigate('/add-milestone', { state: { from: '/milestones', action: 'add' } });
  };

  const getChildMilestones = (parentId) => {
    // console.log(`open response: ${JSON.stringify(openMilestones, null, 2)}`); // debug statement, remove before production
    // console.log(`complete response: ${JSON.stringify(openMilestones, null, 2)}`); // debug statement, remove before production


    // return [...openMilestones, ...completedMilestones].filter(milestone => milestone.parent_id === parentId);
    return [...allMilestones].filter(milestone => milestone.parent_id === parentId);

  };

  const handleMilestoneClick = (milestone) => {
    const children = getChildMilestones(milestone.id);
    console.log("Passing children to MilestoneStatus:", children); // Log children being passed
    navigate('/milestone-status', { state: { from: '/milestones', children } });
  };

  // Group completed milestones by date
  const groupByCompletionDate = (milestones) => {
    return milestones.reduce((groups, milestone) => {
      const date = new Date(milestone.completed_on).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(milestone);
      return groups;
    }, {});
  };

  const groupedCompletedMilestones = groupByCompletionDate(completedMilestones);

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
            <h3 className='milestones-heading'> Open</h3>
            <div className='milestones-scrollable'>
                {openMilestones.map((milestone) => (
                  <div className='details' key={milestone.id}>
                    <input
                      type="checkbox"
                      checked={milestone.checked || false}
                      onChange={() => handleCheckboxChange(milestone.id, 'open')}
                    />
                    <a href='/milestone-status' className='milestoneName' onClick={() => handleMilestoneClick(milestone)}>
                      {milestone.name}
                    </a>
                    <div className="status-bar">
                      <div className="status-bar-inner status-52"></div>
                    </div>
                    <span className="milestoneStatus">8%</span>
                  </div>
                ))}
            </div>
          </div>

          <div className='milestones-completed'>
            <h3 className='milestones-heading'>Completed</h3>
            <div className='milestones-scrollable'>
              {Object.keys(groupedCompletedMilestones).map(date => (
                <div className='milestones-completed-datewise' key={date}>
                  <div className='milestones-completed-date'>
                    <p>{date}</p>
                  </div>
                  {groupedCompletedMilestones[date].map(milestone => (
                    <div className='details' key={milestone.id}>
                      <input type="checkbox" checked={milestone.checked}
                       onChange={() => handleCheckboxChange(milestone.id, 'completed')} /> 
                      <a href='/milestone-status' className='milestoneName' onClick={() => handleMilestoneClick(milestone)}>
                        {milestone.name}
                      </a>
                    </div>
                  ))}
                </div>
              ))}
           </div>
          </div>
        </div>
    </div>
  );
};

export default Milestones;
