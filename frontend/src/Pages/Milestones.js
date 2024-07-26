// import React, { useState, useEffect } from 'react';
// import '../styles/Milestones.css';
// import { useNavigate } from 'react-router-dom';
// import { fetchMilestones, deleteMilestone } from '../api/Milestone';

// const Milestones = () => {

//   const navigate = useNavigate();
//   const [showButtons, setShowButtons] = useState(false);

//   const [openMilestones, setOpenMilestones] = useState([]);
//   const [completedMilestones, setCompletedMilestones] = useState([]);
//   const [error, setError] = useState(null);

  
//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         // Fetch milestones data
//         const data = await fetchMilestones();
//         console.log("Fetched milestones data:", data);
  
//         // Separate open and completed milestones based on is_complete flag
//         const open = data.filter(milestone => !milestone.is_complete);
//         console.log("Open milestones:", JSON.stringify(open, null, 2));
  
//         const completed = data.filter(milestone => milestone.is_complete);
//         console.log("Completed milestones:", JSON.stringify(completed, null, 2));
  
//         // Update state with separated milestones
//         setOpenMilestones(open);
//         setCompletedMilestones(completed);
//       } catch (error) {
//         console.error('Error fetching milestones:', error);
//       }
//     };
  
//     fetchData();
//   }, []);  

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

//   const handleDelete = () => {
//     setOpenMilestones(openMilestones.filter((milestone) => !milestone.checked));
//     setCompletedMilestones(completedMilestones.filter((milestone) => !milestone.checked));
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     navigate('/AddMilestone');
//   };


//   return (
    
//     <div className="Milestones-container">
//         <div className='heading'>
//             <h2>Milestones</h2>
//             <div className='button-class'>
//                 <button onClick={handleAdd}> + Add Milestone</button>
//                 <button onClick={handleDelete}> - Delete Milestone</button>
//             </div>
//         </div>

//         <div className='open'>
//           <h3>Open</h3>

//           {openMilestones.map((milestone) => (
//             <div className='details' key={milestone.id}>
//               <input type="checkbox" checked={milestone.checked} onChange={() => handleCheckboxChange(milestone.id, 'open')} />
//               <a href='' className='milestoneName'>{milestone.name}</a> 
//               <div className="status-bar">
//                 <div className="status-bar-inner status-52"></div> 
//               </div>
//               <span className="milestoneStatus">52%</span>
//             </div>
//           ))}

//         </div>

//         <div className='completed'>
//           <h3>Completed</h3>

//           {completedMilestones.map((milestone) => (
//             <div className='details' key={milestone.id}>
//               <input type="checkbox" checked={milestone.checked} onChange={() => handleCheckboxChange(milestone.id, 'completed')} />
//               <a href='' className='milestoneName'>{milestone.name}</a> 
//               <div className="status-bar">
//                 <div className="status-bar-inner status-100"></div> 
//               </div>
//               <span className="milestoneStatus">100%</span> 
//             </div>
//           ))}
//         </div>


//     </div>
//   );
// };

// export default Milestones;


import React, { useState, useEffect } from 'react';
import '../styles/Milestones.css';
import { useNavigate } from 'react-router-dom';
import { fetchMilestones, deleteMilestone } from '../api/Milestone';
import AlertBox from '../components/Alert'; // Adjust the import path as necessary

const Milestones = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [openMilestones, setOpenMilestones] = useState([]);
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMilestones();
        console.log("Fetched milestones data:", data);

        const open = data.filter(milestone => !milestone.is_complete);
        console.log("Open milestones:", JSON.stringify(open, null, 2));

        const completed = data.filter(milestone => milestone.is_complete);
        console.log("Completed milestones:", JSON.stringify(completed, null, 2));

        setOpenMilestones(open);
        setCompletedMilestones(completed);
      } catch (error) {
        console.error('Error fetching milestones:', error);
        setError('Error fetching milestones. Please try again.');
      }
    };

    fetchData();
  }, []);

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
      setError('Failed to delete. Please try again.');
      setSuccess(null);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/AddMilestone');
  };

  return (
    <div className="Milestones-container">
      <div className='heading'>
        <h2>Milestones</h2>
        <div className='button-class'>
          <button onClick={handleAdd}>+ Add Milestone</button>
          <button onClick={handleDelete}>- Delete Milestone</button>
        </div>
      </div>

      <AlertBox message={success} type="success" onClose={() => setSuccess(null)} />
      <AlertBox message={error} type="error" onClose={() => setError(null)} />

      <div className='open'>
        <h3>Open</h3>

        {openMilestones.map((milestone) => (
          <div className='details' key={milestone.id}>
            <input
              type="checkbox"
              checked={milestone.checked || false}
              onChange={() => handleCheckboxChange(milestone.id, 'open')}
            />
            <a href='' className='milestoneName'>{milestone.name}</a>
            <div className="status-bar">
              <div className="status-bar-inner status-52"></div>
            </div>
            <span className="milestoneStatus">52%</span>
          </div>
        ))}
      </div>

      <div className='completed'>
        <h3>Completed</h3>

        {completedMilestones.map((milestone) => (
          <div className='details' key={milestone.id}>
            <input
              type="checkbox"
              checked={milestone.checked || false}
              onChange={() => handleCheckboxChange(milestone.id, 'completed')}
            />
            <a href='' className='milestoneName'>{milestone.name}</a>
            <div className="status-bar">
              <div className="status-bar-inner status-100"></div>
            </div>
            <span className="milestoneStatus">100%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Milestones;
