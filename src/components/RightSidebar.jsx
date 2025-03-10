// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleRightSidebar } from '../store/sidebarSlice';
// import { setDueDate, setReminder, addStep, setRepeatTask } from '../store/tasksSlice';

// const RightSidebar = () => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [showReminderForm, setShowReminderForm] = useState(false);
//   const [reminderTime, setReminderTime] = useState('');
//   const [showStepForm, setShowStepForm] = useState(false);
//   const [stepText, setStepText] = useState('');
//   const [showRepeatForm, setShowRepeatForm] = useState(false);
//   const [repeatType, setRepeatType] = useState('daily');
//   const [repeatDays, setRepeatDays] = useState([]);
//   const [repeatDate, setRepeatDate] = useState(1);
  
//   const dispatch = useDispatch();
//   const { rightSidebarOpen, selectedTaskId } = useSelector(state => state.sidebar);
//   const { darkMode } = useSelector(state => state.theme);
//   const { tasks } = useSelector(state => state.tasks);
  
//   const selectedTask = tasks.find(task => task.id === selectedTaskId);

//   const handleClose = () => {
//     dispatch(toggleRightSidebar(false));
//   };

//   // Due Date functions
//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };

//   const handleSetDueDate = () => {
//     if (selectedTaskId && selectedDate) {
//       dispatch(setDueDate({ id: selectedTaskId, dueDate: selectedDate }));
//       setShowCalendar(false);
//     }
//   };

//   // Reminder functions
//   const toggleReminderForm = () => {
//     setShowReminderForm(!showReminderForm);
//   };

//   const handleSetReminder = () => {
//     if (selectedTaskId && reminderTime) {
//       dispatch(setReminder({ id: selectedTaskId, reminderTime }));
//       setShowReminderForm(false);
//       setReminderTime('');
//     }
//   };

//   // Step functions
//   const toggleStepForm = () => {
//     setShowStepForm(!showStepForm);
//   };

//   const handleAddStep = () => {
//     if (selectedTaskId && stepText.trim()) {
//       dispatch(addStep({ id: selectedTaskId, stepText: stepText.trim() }));
//       setShowStepForm(false);
//       setStepText('');
//     }
//   };

//   // Repeat functions
//   const toggleRepeatForm = () => {
//     setShowRepeatForm(!showRepeatForm);
//   };

//   const handleRepeatDayToggle = (day) => {
//     if (repeatDays.includes(day)) {
//       setRepeatDays(repeatDays.filter(d => d !== day));
//     } else {
//       setRepeatDays([...repeatDays, day]);
//     }
//   };

//   const handleSetRepeatTask = () => {
//     if (selectedTaskId) {
//       let repeatConfig = { type: repeatType };
      
//       if (repeatType === 'weekly') {
//         repeatConfig.days = repeatDays;
//       } else if (repeatType === 'monthly') {
//         repeatConfig.date = repeatDate;
//       }
      
//       dispatch(setRepeatTask({ id: selectedTaskId, repeatConfig }));
//       setShowRepeatForm(false);
//     }
//   };

//   if (!rightSidebarOpen) return null;

//   return (
//     <div className={`right-sidebar   bg-${darkMode ? 'dark' : 'light'} border-secondary border-start`} style={{ width: '330px', height: 'calc(100vh)', position: 'sticky', top: '56px', overflowY: 'auto' }}>
//       <div className="p-3 d-flex justify-content-between">
//         <h5 className="mb-0 m-auto border-bottom">Task Details</h5>
//         <button 
//           className="btn btn-sm btn-link" 
//           onClick={handleClose}
//         >
//           <i className="bi bi-x-lg"></i>
//         </button>
//       </div>
      
//       <div className="p-3">
//         {selectedTask ? (
//           <div>
//             <div className="form-check mb-3">
//               <input 
//                 type="checkbox"
//                 className="form-check-input"
//                 checked={selectedTask.completed}
//                 readOnly
//               />
//               <label className="form-check-label fw-bold">{selectedTask.text}</label>
//             </div>
            
//             <div className="d-flex justify-content-between mb-3">
//               <span className="text-muted">Created: {new Date(selectedTask.createdAt).toLocaleString()}</span>
//               <span className={`badge ${selectedTask.important ? 'bg-warning' : 'bg-secondary'}`}>
//                 {selectedTask.important ? 'Important' : 'Normal'}
//               </span>
//             </div>
            
//             {selectedTask.dueDate && (
//               <div className="mb-3">
//                 <span className="text-info">
//                   <i className="bi bi-calendar me-2"></i>
//                   Due: {new Date(selectedTask.dueDate).toLocaleDateString()}
//                 </span>
//               </div>
//             )}
            
//             {selectedTask.reminder && (
//               <div className="mb-3">
//                 <span className="text-warning">
//                   <i className="bi bi-bell me-2"></i>
//                   Reminder: {new Date(selectedTask.reminder).toLocaleString()}
//                 </span>
//               </div>
//             )}
            
//             {selectedTask.repeatConfig && (
//               <div className="mb-3">
//                 <span className="text-success">
//                   <i className="bi bi-arrow-repeat me-2"></i>
//                   Repeats: {selectedTask.repeatConfig.type}
//                 </span>
//               </div>
//             )}
            
//             <hr />
            
//             {/* Display steps if any */}
//             {selectedTask.steps && selectedTask.steps.length > 0 && (
//               <div className="mb-3">
//                 <h6>Steps</h6>
//                 <ul className="list-group mb-3">
//                   {selectedTask.steps.map(step => (
//                     <li key={step.id} className="list-group-item d-flex justify-content-between align-items-center">
//                       <div>
//                         <input
//                           type="checkbox"
//                           className="form-check-input me-2"
//                           checked={step.completed}
//                           readOnly
//                         />
//                         <span>{step.text}</span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             <div className="list-group">
//               <button 
//                 className="list-group-item list-group-item-action d-flex align-items-center"
//                 onClick={toggleStepForm}
//               >
//                 <i className="bi bi-plus-circle me-2"></i>
//                 Add Step
//               </button>
              
//               <button 
//                 className="list-group-item list-group-item-action d-flex align-items-center"
//                 onClick={toggleReminderForm}
//               >
//                 <i className="bi bi-bell me-2"></i>
//                 Set Reminder
//               </button>
              
//               <button 
//                 className="list-group-item list-group-item-action d-flex align-items-center"
//                 onClick={toggleCalendar}
//               >
//                 <i className="bi bi-calendar me-2"></i>
//                 Add Due Date
//               </button>
              
//               <button 
//                 className="list-group-item list-group-item-action d-flex align-items-center"
//                 onClick={toggleRepeatForm}
//               >
//                 <i className="bi bi-arrow-repeat me-2"></i>
//                 Repeat Task
//               </button>
//             </div>
            
//             {/* Add Step Form */}
//             {showStepForm && (
//               <div className="mt-3 p-3 border rounded">
//                 <div className="mb-3">
//                   <label className="form-label">Step Description</label>
//                   <input 
//                     type="text" 
//                     className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                     value={stepText}
//                     onChange={(e) => setStepText(e.target.value)}
//                     placeholder="Enter step description"
//                   />
//                 </div>
                
//                 <div className="d-flex">
//                   <button 
//                     className="btn btn-success me-2"
//                     onClick={handleAddStep}
//                   >
//                     Add
//                   </button>
                  
//                   <button 
//                     className="btn btn-outline-secondary"
//                     onClick={toggleStepForm}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Set Reminder Form */}
//             {showReminderForm && (
//               <div className="mt-3 p-3 border rounded">
//                 <div className="mb-3">
//                   <label className="form-label">Reminder Time</label>
//                   <input 
//                     type="datetime-local" 
//                     className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                     value={reminderTime}
//                     onChange={(e) => setReminderTime(e.target.value)}
//                   />
//                 </div>
                
//                 <div className="d-flex">
//                   <button 
//                     className="btn btn-success me-2"
//                     onClick={handleSetReminder}
//                   >
//                     Save
//                   </button>
                  
//                   <button 
//                     className="btn btn-outline-secondary"
//                     onClick={toggleReminderForm}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Due Date Form */}
//             {showCalendar && (
//               <div className="mt-3 p-3 border rounded">
//                 <div className="mb-3">
//                   <label className="form-label">Select Due Date</label>
//                   <input 
//                     type="date" 
//                     className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                   />
//                 </div>
                
//                 <div className="d-flex">
//                   <button 
//                     className="btn btn-success me-2"
//                     onClick={handleSetDueDate}
//                   >
//                     Save
//                   </button>
                  
//                   <button 
//                     className="btn btn-outline-secondary"
//                     onClick={toggleCalendar}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Repeat Task Form */}
//             {showRepeatForm && (
//               <div className="mt-3 p-3 border rounded">
//                 <div className="mb-3">
//                   <label className="form-label">Repeat Type</label>
//                   <select 
//                     className={`form-select ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                     value={repeatType}
//                     onChange={(e) => setRepeatType(e.target.value)}
//                   >
//                     <option value="daily">Daily</option>
//                     <option value="weekly">Weekly</option>
//                     <option value="monthly">Monthly</option>
//                   </select>
//                 </div>
                
//                 {repeatType === 'weekly' && (
//                   <div className="mb-3">
//                     <label className="form-label">Select Days</label>
//                     <div className="d-flex flex-wrap">
//                       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
//                         <div key={day} className="form-check me-3 mb-2">
//                           <input 
//                             type="checkbox" 
//                             className="form-check-input"
//                             id={`day-${index}`}
//                             checked={repeatDays.includes(index)}
//                             onChange={() => handleRepeatDayToggle(index)}
//                           />
//                           <label className="form-check-label" htmlFor={`day-${index}`}>{day}</label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {repeatType === 'monthly' && (
//                   <div className="mb-3">
//                     <label className="form-label">Day of Month</label>
//                     <select 
//                       className={`form-select ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                       value={repeatDate}
//                       onChange={(e) => setRepeatDate(parseInt(e.target.value))}
//                     >
//                       {[...Array(31)].map((_, i) => (
//                         <option key={i+1} value={i+1}>{i+1}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
                
//                 <div className="d-flex">
//                   <button 
//                     className="btn btn-success me-2"
//                     onClick={handleSetRepeatTask}
//                   >
//                     Save
//                   </button>
                  
//                   <button 
//                     className="btn btn-outline-secondary"
//                     onClick={toggleRepeatForm}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             <div className="mt-4">
//               <h6>Add Notes</h6>
//               <textarea 
//                 className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                 rows="3"
//                 placeholder="Add notes here..."
//               ></textarea>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-5">
//             <i className="bi bi-info-circle fs-1 text-muted"></i>
//             <p className="mt-3">Select a task to view details</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RightSidebar;




import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRightSidebar } from '../store/sidebarSlice';
import { setDueDate, setReminder, addStep, setRepeatTask } from '../store/tasksSlice';

const RightSidebar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  const [showStepForm, setShowStepForm] = useState(false);
  const [stepText, setStepText] = useState('');
  const [showRepeatForm, setShowRepeatForm] = useState(false);
  const [repeatType, setRepeatType] = useState('daily');
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatDate, setRepeatDate] = useState(1);
  
  const dispatch = useDispatch();
  const { rightSidebarOpen, selectedTaskId, isOpen } = useSelector(state => state.sidebar);
  const { darkMode } = useSelector(state => state.theme);
  const { tasks } = useSelector(state => state.tasks);
  
  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  const handleClose = () => {
    dispatch(toggleRightSidebar(false));
  };

  // Due Date functions
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSetDueDate = () => {
    if (selectedTaskId && selectedDate) {
      dispatch(setDueDate({ id: selectedTaskId, dueDate: selectedDate }));
      setShowCalendar(false);
    }
  };

  // Reminder functions
  const toggleReminderForm = () => {
    setShowReminderForm(!showReminderForm);
  };

  const handleSetReminder = () => {
    if (selectedTaskId && reminderTime) {
      dispatch(setReminder({ id: selectedTaskId, reminderTime }));
      setShowReminderForm(false);
      setReminderTime('');
    }
  };

  // Step functions
  const toggleStepForm = () => {
    setShowStepForm(!showStepForm);
  };

  const handleAddStep = () => {
    if (selectedTaskId && stepText.trim()) {
      dispatch(addStep({ id: selectedTaskId, stepText: stepText.trim() }));
      setShowStepForm(false);
      setStepText('');
    }
  };

  // Repeat functions
  const toggleRepeatForm = () => {
    setShowRepeatForm(!showRepeatForm);
  };

  const handleRepeatDayToggle = (day) => {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter(d => d !== day));
    } else {
      setRepeatDays([...repeatDays, day]);
    }
  };

  const handleSetRepeatTask = () => {
    if (selectedTaskId) {
      let repeatConfig = { type: repeatType };
      
      if (repeatType === 'weekly') {
        repeatConfig.days = repeatDays;
      } else if (repeatType === 'monthly') {
        repeatConfig.date = repeatDate;
      }
      
      dispatch(setRepeatTask({ id: selectedTaskId, repeatConfig }));
      setShowRepeatForm(false);
    }
  };

  if (!rightSidebarOpen) return null;



  return (
  
    <div className={` position-sticky top-0 bg-${darkMode ? 'dark' : 'light'} `} style={{width: '600px', maxWidth: '400px', height: 'calc(100vh)', position: 'sticky', top: '56px', overflowY: 'auto', margin: '0 20px'}}>
  <div className="p-3 d-flex align-items-center justify-content-between">
    <h5 className="mb-0 m-auto border-bottom">Task Details</h5>
    <button 
      className="btn btn-sm btn-link" 
      onClick={handleClose}
    >
      <i className="bi bi-x-lg"></i>
    </button>
  </div>
  
  <div className="p-3">
    {selectedTask ? (
      <div>
        <div className="form-check mb-3">
          <input 
            type="checkbox"
            className="form-check-input"
            checked={selectedTask.completed}
            readOnly
          />
          <label className="form-check-label fw-bold">{selectedTask.text}</label>
        </div>
        
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="">Created: {new Date(selectedTask.createdAt).toLocaleString()}</span>
          <span className={`badge ${selectedTask.important ? 'bg-warning' : 'bg-secondary'}`}>
            {selectedTask.important ? 'Important' : 'Normal'}
          </span>
        </div>
        
        {selectedTask.dueDate && (
          <div className="mb-3">
            <span className="text-info">
              <i className="bi bi-calendar me-2"></i>
              Due: {new Date(selectedTask.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {selectedTask.reminder && (
          <div className="mb-3">
            <span className="text-warning">
              <i className="bi bi-bell me-2"></i>
              Reminder: {new Date(selectedTask.reminder).toLocaleString()}
            </span>
          </div>
        )}
        
        {selectedTask.repeatConfig && (
          <div className="mb-3">
            <span className="text-success">
              <i className="bi bi-arrow-repeat me-2"></i>
              Repeats: {selectedTask.repeatConfig.type}
            </span>
          </div>
        )}
        
        <hr />
        
        {/* Display steps if any */}
        {selectedTask.steps && selectedTask.steps.length > 0 && (
          <div className="mb-3">
            <h6>Steps</h6>
            <ul className="list-group mb-3">
              {selectedTask.steps.map(step => (
                <li key={step.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={step.completed}
                      readOnly
                    />
                    <span>{step.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="list-group">
          <button 
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={toggleStepForm}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Step
          </button>
          
          <button 
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={toggleReminderForm}
          >
            <i className="bi bi-bell me-2"></i>
            Set Reminder
          </button>
          
          <button 
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={toggleCalendar}
          >
            <i className="bi bi-calendar me-2"></i>
            Add Due Date
          </button>
          
          <button 
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={toggleRepeatForm}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Repeat Task
          </button>
        </div>
        
        {/* Add Step Form */}
        {showStepForm && (
          <div className="mt-3 p-3 border rounded">
            <div className="mb-3">
              <label className="form-label">Step Description</label>
              <input 
                type="text" 
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={stepText}
                onChange={(e) => setStepText(e.target.value)}
                placeholder="Enter step description"
              />
            </div>
            
            <div className="d-flex">
              <button 
                className="btn btn-success me-2"
                onClick={handleAddStep}
              >
                Add
              </button>
              
              <button 
                className="btn btn-outline-secondary"
                onClick={toggleStepForm}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Set Reminder Form */}
        {showReminderForm && (
          <div className="mt-3 p-3 border rounded">
            <div className="mb-3">
              <label className="form-label">Reminder Time</label>
              <input 
                type="datetime-local" 
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            
            <div className="d-flex">
              <button 
                className="btn btn-success me-2"
                onClick={handleSetReminder}
              >
                Save
              </button>
              
              <button 
                className="btn btn-outline-secondary"
                onClick={toggleReminderForm}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Due Date Form */}
        {showCalendar && (
          <div className="mt-3 p-3 border rounded">
            <div className="mb-3">
              <label className="form-label">Select Due Date</label>
              <input 
                type="date" 
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div className="d-flex">
              <button 
                className="btn btn-success me-2"
                onClick={handleSetDueDate}
              >
                Save
              </button>
              
              <button 
                className="btn btn-outline-secondary"
                onClick={toggleCalendar}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Repeat Task Form */}
        {showRepeatForm && (
          <div className="mt-3 p-3 border rounded">
            <div className="mb-3">
              <label className="form-label">Repeat Type</label>
              <select 
                className={`form-select ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={repeatType}
                onChange={(e) => setRepeatType(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            {repeatType === 'weekly' && (
              <div className="mb-3">
                <label className="form-label">Select Days</label>
                <div className="d-flex flex-wrap">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={day} className="form-check me-3 mb-2">
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        id={`day-${index}`}
                        checked={repeatDays.includes(index)}
                        onChange={() => handleRepeatDayToggle(index)}
                      />
                      <label className="form-check-label" htmlFor={`day-${index}`}>{day}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {repeatType === 'monthly' && (
              <div className="mb-3">
                <label className="form-label">Day of Month</label>
                <select 
                  className={`form-select ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  value={repeatDate}
                  onChange={(e) => setRepeatDate(parseInt(e.target.value))}
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="d-flex">
              <button 
                className="btn btn-success me-2"
                onClick={handleSetRepeatTask}
              >
                Save
              </button>
              
              <button 
                className="btn btn-outline-secondary"
                onClick={toggleRepeatForm}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <h6>Add Notes</h6>
          <textarea 
            className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
            rows="3"
            placeholder="Add notes here..."
          ></textarea>
        </div>
      </div>
    ) : (
      <div className="text-center py-5">
        <i className="bi bi-info-circle fs-1 text-muted"></i>
        <p className="mt-3">Select a task to view details</p>
      </div>
    )}
  </div>
</div>
  
  );
};

export default RightSidebar