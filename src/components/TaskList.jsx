// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   toggleComplete, 
//   toggleImportant, 
//   deleteTask, 
//   editTask 
// } from '../store/tasksSlice';
// import { setSelectedTask, toggleRightSidebar } from '../store/sidebarSlice';

// const TaskList = ({ view }) => {
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');
  
//   const dispatch = useDispatch();
//   const { tasks } = useSelector(state => state.tasks);
//   const { darkMode } = useSelector(state => state.theme);
  
//   // Filter tasks based on view
//   const filteredTasks = tasks.filter(task => {
//     if (view === 'all') return true;
//     if (view === 'today') {
//       const today = new Date().toISOString().split('T')[0];
//       const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
//       return taskDate === today;
//     }
//     if (view === 'important') return task.important;
//     return true;
//   });

//   const pendingTasks = filteredTasks.filter(task => !task.completed);
//   const completedTasks = filteredTasks.filter(task => task.completed);

//   const handleToggleComplete = (id) => {
//     dispatch(toggleComplete(id));
//   };

//   const handleToggleImportant = (id) => {
//     dispatch(toggleImportant(id));
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteTask(id));
//   };

//   const startEditing = (task) => {
//     setEditingId(task.id);
//     setEditText(task.text);
//   };

//   const handleEditSave = () => {
//     if (editText.trim()) {
//       dispatch(editTask({ id: editingId, text: editText }));
//     }
//     setEditingId(null);
//   };

//   const handleSelectTask = (id) => {
//     dispatch(setSelectedTask(id));
//     dispatch(toggleRightSidebar(true));
//   };

//   // Determine layout class based on view
//   const layoutClass = view === 'all' ? 'table-row' : 'd-flex flex-column';

//   return (
//     <div className={`task-list ${darkMode ? 'text-light' : ''}`}>
//       {/* Pending Tasks */}
//       <div className="mb-4">
//         <h5>Pending Tasks</h5>
//         {pendingTasks.length === 0 ? (
//           <p className="">No pending tasks</p>
//         ) : (
//           <div className={layoutClass}>
//             {pendingTasks.map(task => (
//               <div key={task.id} className={`card mb-2 ${darkMode ? 'bg-dark border-secondary text-white' : ''} ${view === 'all' ? 'w-100' : ''}`}>
//                 <div className="card-body d-flex align-items-center">
//                   {editingId === task.id ? (
//                     <div className="d-flex w-100">
//                       <input
//                         type="text"
//                         className={`form-control me-2 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                         value={editText}
//                         onChange={(e) => setEditText(e.target.value)}
//                         autoFocus
//                       />
//                       <button 
//                         className="btn btn-sm btn-success" 
//                         onClick={handleEditSave}
//                       >
//                         Save
//                       </button>
//                       <button 
//                         className="btn btn-sm btn-outline-secondary ms-1" 
//                         onClick={() => setEditingId(null)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           checked={task.completed}
//                           onChange={() => handleToggleComplete(task.id)}
//                         />
//                       </div>
//                       <div className="ms-2 flex-grow-1" onClick={() => handleSelectTask(task.id)}>
//                         {task.text}
//                         {task.dueDate && (
//                           <small className="text-muted ms-2">
//                             <i className="bi bi-calendar"></i> {new Date(task.dueDate).toLocaleDateString()}
//                           </small>
//                         )}
//                       </div>
//                       <div>
//                         <button 
//                           className="btn btn-sm btn-link" 
//                           onClick={() => handleToggleImportant(task.id)}
//                         >
//                           <i className={`bi ${task.important ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
//                         </button>
//                         <button 
//                           className="btn btn-sm btn-link" 
//                           onClick={() => startEditing(task)}
//                         >
//                           <i className="bi bi-pencil"></i>
//                         </button>
//                         <button 
//                           className="btn btn-sm btn-link text-danger" 
//                           onClick={() => handleDelete(task.id)}
//                         >
//                           <i className="bi bi-trash"></i>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Completed Tasks */}
//       <div>
//         <h5>Completed Tasks</h5>
//         {completedTasks.length === 0 ? (
//           <p className="">No completed tasks</p>
//         ) : (
//           <div className={layoutClass}>
//             {completedTasks.map(task => (
//               <div key={task.id} className={`card mb-2 ${darkMode ? 'bg-dark border-secondary text-white' : ''} ${view === 'all' ? 'w-100' : ''}`}>
//                 <div className="card-body d-flex align-items-center">
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       checked={task.completed}
//                       onChange={() => handleToggleComplete(task.id)}
//                     />
//                   </div>
//                   <div className="ms-2 flex-grow-1 text-decoration-line-through ">
//                     {task.text}
//                   </div>
//                   <div>
//                     <button 
//                       className="btn btn-sm btn-link" 
//                       onClick={() => handleToggleImportant(task.id)}
//                     >
//                       <i className={`bi ${task.important ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
//                     </button>
//                     <button 
//                       className="btn btn-sm btn-link text-danger" 
//                       onClick={() => handleDelete(task.id)}
//                     >
//                       <i className="bi bi-trash"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;



import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleComplete, 
  toggleImportant, 
  deleteTask, 
  editTask 
} from '../store/tasksSlice';
import { setSelectedTask, toggleRightSidebar } from '../store/sidebarSlice';

const TaskList = ({ view }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const { darkMode } = useSelector(state => state.theme);
  
  // Filter tasks based on view
  const filteredTasks = tasks.filter(task => {
    if (view === 'all') return true;
    if (view === 'today') {
      const today = new Date().toISOString().split('T')[0];
      const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
      return taskDate === today;
    }
    if (view === 'important') return task.important;
    return true;
  });

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleToggleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: editingId, text: editText }));
    }
    setEditingId(null);
  };

  const handleSelectTask = (id) => {
    dispatch(setSelectedTask(id));
    dispatch(toggleRightSidebar(true));
  };

  return (
    <div className={`task-list ${darkMode ? 'text-light' : ''}`}>
      {/* Pending Tasks */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center">
          <span>Pending Tasks</span>
          {pendingTasks.length > 0 && (
            <span className="badge bg-primary ms-2">{pendingTasks.length}</span>
          )}
        </h5>
        {pendingTasks.length === 0 ? (
          <p className="text-muted fst-italic">No pending tasks</p>
        ) : (
          <div className="d-flex flex-column">
            {pendingTasks.map(task => (
              <div 
                key={task.id} 
                className={`card mb-2 ${darkMode ? 'bg-dark border-secondary text-white' : ''}`}
              >
                <div className="card-body d-flex flex-wrap align-items-center py-2 px-2 px-sm-3">
                  {editingId === task.id ? (
                    <div className="d-flex w-100 flex-wrap">
                      <input
                        type="text"
                        className={`form-control me-2 mb-2 mb-sm-0 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                      <div>
                        <button 
                          className="btn btn-sm btn-success me-1" 
                          onClick={handleEditSave}
                        >
                          Save
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary" 
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="form-check me-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleComplete(task.id)}
                        />
                      </div>
                      <div 
                        className="ms-1 flex-grow-1 task-text py-1" 
                        onClick={() => handleSelectTask(task.id)}
                        style={{ cursor: 'pointer', wordBreak: 'break-word' }}
                      >
                        {task.text}
                        {task.dueDate && (
                          <small className="text-muted d-block d-sm-inline ms-0 ms-sm-2 mt-1 mt-sm-0">
                            <i className="bi bi-calendar"></i> {new Date(task.dueDate).toLocaleDateString()}
                          </small>
                        )}
                      </div>
                      <div className="d-flex mt-2 mt-sm-0 ms-auto">
                        <button 
                          className="btn btn-sm btn-link p-1" 
                          onClick={() => handleToggleImportant(task.id)}
                        >
                          <i className={`bi ${task.important ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-link p-1" 
                          onClick={() => startEditing(task)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-link text-danger p-1" 
                          onClick={() => handleDelete(task.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      <div>
        <h5 className="d-flex align-items-center">
          <span>Completed Tasks</span>
          {completedTasks.length > 0 && (
            <span className="badge bg-success ms-2">{completedTasks.length}</span>
          )}
        </h5>
        {completedTasks.length === 0 ? (
          <p className="text-muted fst-italic">No completed tasks</p>
        ) : (
          <div className="d-flex flex-column">
            {completedTasks.map(task => (
              <div 
                key={task.id} 
                className={`card mb-2 ${darkMode ? 'bg-dark border-secondary text-white' : ''}`}
              >
                <div className="card-body d-flex flex-wrap align-items-center py-2 px-2 px-sm-3">
                  <div className="form-check me-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                  </div>
                  <div 
                    className="ms-1 flex-grow-1 text-decoration-line-through"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {task.text}
                  </div>
                  <div className="d-flex mt-2 mt-sm-0 ms-auto">
                    <button 
                      className="btn btn-sm btn-link p-1" 
                      onClick={() => handleToggleImportant(task.id)}
                    >
                      <i className={`bi ${task.important ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-link text-danger p-1" 
                      onClick={() => handleDelete(task.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;