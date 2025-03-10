// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTask } from '../store/tasksSlice';

// const TaskInput = () => {
//   const [taskText, setTaskText] = useState('');
//   const dispatch = useDispatch();
//   const { darkMode } = useSelector(state => state.theme);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (taskText.trim()) {
//       dispatch(addTask(taskText));
//       setTaskText('');
//     }
//   };

//   return (
// <div className={`border mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : 'bg-light'}`}>
//   <div className="p-3 p-md-4">
//     <form onSubmit={handleSubmit}>
      
//       {/* Input Box (Responsive) */}
//       <div className="mb-3">
//         <input
//           type="text"
//           className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
//           placeholder="Add A Task"
//           value={taskText}
//           onChange={(e) => setTaskText(e.target.value)}
//         />
//       </div>

//       {/* Icons & Button Row (Responsive) */}
//       <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
//         <div className="d-flex">
//           <button type="button" className="btn btn-link text-decoration-none p-1 p-md-2" title="Set reminder">
//             <i className="bi bi-bell"></i>
//           </button>
          
//           <button type="button" className="btn btn-link text-decoration-none p-1 p-md-2" title="Add due date">
//             <i className="bi bi-calendar"></i>
//           </button>
          
//           <button type="button" className="btn btn-link text-decoration-none p-1 p-md-2" title="Add notification">
//             <i className="bi bi-exclamation-circle"></i>
//           </button>
//         </div>

//         <button type="submit" className="btn btn-success">
//           ADD TASK
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
  
//   );
// };

// export default TaskInput








import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/tasksSlice';

const TaskInput = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.theme);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  return (
    <div className={`border  mb-3 rounded ${darkMode ? 'bg-dark text-light border-secondary' : 'bg-light'}`}>
      <div className="p-2 p-sm-3 p-md-4 ">
        <form onSubmit={handleSubmit}>
          
          {/* Input Box (Responsive) */}
          <div className="mb-2 mb-md-3">
            <input
              type="text"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              placeholder="Add A Task"
              style={{color:'white', opacity:1}}
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </div>

          {/* Icons & Button Row (Responsive) */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="d-flex">
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-1 p-sm-2" 
                title="Set reminder"
              >
                <i className="bi bi-bell"></i>
              </button>
              
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-1 p-sm-2" 
                title="Add due date"
              >
                <i className="bi bi-calendar"></i>
              </button>
              
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-1 p-sm-2" 
                title="Add notification"
              >
                <i className="bi bi-exclamation-circle"></i>
              </button>
            </div>

            <button 
              type="submit" 
              className="btn btn-success btn-sm btn-md-lg"
            >
              ADD TASK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;