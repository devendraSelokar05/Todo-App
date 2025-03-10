import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, toggleRightSidebar } from '../store/sidebarSlice';
import TaskProgressCircle from './TaskprogressCircle';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.sidebar);
  const { darkMode } = useSelector(state => state.theme);
  const { user } = useSelector(state => state.auth);
  const { tasks } = useSelector(state => state.tasks);
  
  const todayCount = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
    return taskDate === today && !task.completed;
  }).length;
  
  const importantCount = tasks.filter(task => task.important && !task.completed).length;

  const handlePlannedClick = () => {
    // Only show right sidebar for planned view
    dispatch(toggleRightSidebar(true));
    // Hide left sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar(false));
    }
  };

  const handleNavClick = () => {
    // Hide left sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar(false));
    }
  };

  // Prevent sidebar from disappearing on planned page
  useEffect(() => {
    if (location.pathname === '/planned') {
      dispatch(toggleRightSidebar(true));
    }
  }, [location.pathname, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      id="left-sidebar"
      className={`bg-${darkMode ? 'dark' : 'light'} border-secondary border-end`}
      style={{
        width: '330px',
        height: 'calc(100vh - 56px)',
        position: "fixed",
        top: "56px",
        left: "0",
        overflowY: 'auto',
        scrollbarWidth: "none",
        zIndex: 1000,
        transition: 'transform 0.3s ease',
      }}
    >
      <div className="p-3 text-center border-secondary border-bottom">
        <img
          src={user?.profilePic || 'https://via.placeholder.com/70'}
          alt="Profile"
          className="rounded-circle mb-2"
          width="70"
          height="70"
        />
        <h6 className={`mb-0 ${darkMode ? 'text-light' : 'text-dark'}`}>Hey, {user?.name || 'User'}</h6>
      </div>
      
      <div className="nav flex-column p-3">
        <Link
          to="/"
          className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/' ? ' bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
          onClick={handleNavClick}
        >
          <i className="bi bi-check2-all me-2"></i>
          All Tasks
        </Link>
        
        <Link
          to="/today"
          className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/today' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
          onClick={handleNavClick}
        >
          <i className="bi bi-calendar-day me-2"></i>
          Today Tasks
          {todayCount > 0 && (
            <span className="badge bg-primary rounded-pill ms-2">{todayCount}</span>
          )}
        </Link>
        
        <Link
          to="/important"
          className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/important' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
          onClick={handleNavClick}
        >
          <i className="bi bi-star-fill me-2 text-warning"></i>
          Important
          {importantCount > 0 && (
            <span className="badge bg-primary rounded-pill ms-2">{importantCount}</span>
          )}
        </Link>
        
        <Link
          to="/planned"
          className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/planned' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
          onClick={handlePlannedClick}
        >
          <i className="bi bi-calendar me-2"></i>
          Planned
        </Link>
        
        <Link
          to="/assigned"
          className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/assigned' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
          onClick={handleNavClick}
        >
          <i className="bi bi-person-check me-2"></i>
          Assigned to me
        </Link>
        
        <button className="btn btn-outline-success w-100 mt-3">
          <i className="bi bi-plus me-2"></i>
          Add list
        </button>
      </div>
      <TaskProgressCircle />
    </div>
  );
};

export default Sidebar;




// import React, { useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleSidebar, toggleRightSidebar } from '../store/sidebarSlice';
// import TaskProgressCircle from './TaskprogressCircle';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isOpen } = useSelector(state => state.sidebar);
//   const { darkMode } = useSelector(state => state.theme);
//   const { user } = useSelector(state => state.auth);
//   const { tasks } = useSelector(state => state.tasks);
  
//   const todayCount = tasks.filter(task => {
//     const today = new Date().toISOString().split('T')[0];
//     const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
//     return taskDate === today && !task.completed;
//   }).length;
  
//   const importantCount = tasks.filter(task => task.important && !task.completed).length;

//   const handlePlannedClick = () => {
//     // Always show right sidebar for planned view, but don't toggle it off if already open
//     dispatch(toggleRightSidebar(true));
    
//     // Hide left sidebar on mobile after navigation
//     if (window.innerWidth < 768) {
//       dispatch(toggleSidebar(false));
//     }
//   };

//   const handleNavClick = () => {
//     // Hide left sidebar on mobile after navigation
//     if (window.innerWidth < 768) {
//       dispatch(toggleSidebar(false));
//     }
//   };

//   // Keep right sidebar visible on planned page, regardless of left sidebar state
//   useEffect(() => {
//     if (location.pathname === '/planned') {
//       dispatch(toggleRightSidebar(true));
//     }
//   }, [location.pathname, dispatch]);

//   if (!isOpen) return null;

//   return (
//     <div
//       id="left-sidebar"
//       className={`bg-${darkMode ? 'dark' : 'light'} border-secondary border-end`}
//       style={{
//         width: '330px',
//         height: 'calc(100vh - 56px)',
//         position: "fixed",
//         top: "56px",
//         left: "0",
//         overflowY: 'auto',
//         scrollbarWidth: "none",
//         zIndex: 1000,
//         transition: 'transform 0.3s ease',
//       }}
//     >
//       <div className="p-3 text-center border-secondary border-bottom">
//         <img
//           src={user?.profilePic || 'https://via.placeholder.com/70'}
//           alt="Profile"
//           className="rounded-circle mb-2"
//           width="70"
//           height="70"
//         />
//         <h6 className={`mb-0 ${darkMode ? 'text-light' : 'text-dark'}`}>Hey, {user?.name || 'User'}</h6>
//       </div>
      
//       <div className="nav flex-column p-3">
//         <Link
//           to="/"
//           className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/' ? ' bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
//           onClick={handleNavClick}
//         >
//           <i className="bi bi-check2-all me-2"></i>
//           All Tasks
//         </Link>
        
//         <Link
//           to="/today"
//           className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/today' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
//           onClick={handleNavClick}
//         >
//           <i className="bi bi-calendar-day me-2"></i>
//           Today Tasks
//           {todayCount > 0 && (
//             <span className="badge bg-primary rounded-pill ms-2">{todayCount}</span>
//           )}
//         </Link>
        
//         <Link
//           to="/important"
//           className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/important' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
//           onClick={handleNavClick}
//         >
//           <i className="bi bi-star-fill me-2 text-warning"></i>
//           Important
//           {importantCount > 0 && (
//             <span className="badge bg-primary rounded-pill ms-2">{importantCount}</span>
//           )}
//         </Link>
        
//         <Link
//           to="/planned"
//           className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/planned' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
//           onClick={handlePlannedClick}
//         >
//           <i className="bi bi-calendar me-2"></i>
//           Planned
//         </Link>
        
//         <Link
//           to="/assigned"
//           className={`p-2 text-decoration-none mb-2 rounded ${location.pathname === '/assigned' ? 'active bg-success text-white' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
//           onClick={handleNavClick}
//         >
//           <i className="bi bi-person-check me-2"></i>
//           Assigned to me
//         </Link>
        
//         <button className="btn btn-outline-success w-100 mt-3">
//           <i className="bi bi-plus me-2"></i>
//           Add list
//         </button>
//       </div>
//       <TaskProgressCircle />
//     </div>
//   );
// };

// export default Sidebar;