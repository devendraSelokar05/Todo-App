import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../store/sidebarSlice';
import { toggleDarkMode } from '../store/themeSlice';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.theme);
  
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`navbar position-sticky top-0 border-secondary border-bottom z-1 navbar-expand-lg navbar-${darkMode ? 'dark' : 'light'} bg-${darkMode ? 'dark' : 'light'} `}>
      <div className="container-fluid">
        <button 
          className={`btn border-0 ${darkMode ? 'text-white' : ''}`} 
          onClick={handleToggleSidebar}
        >
          <i className="bi bi-list fs-4"></i>
        </button>
        
        <a className="navbar-brand me-auto" href="/">
          <i className="bi bi-check-circle-fill text-success me-2"></i>
          DoIt
        </a>
        
        <div className="d-flex">
          <button className={`btn border-0 me-2 ${darkMode ? 'text-white' : ''}`}>
            <i className="bi bi-search"></i>
          </button>
          
          <button 
            className={`btn border-0 me-2 ${darkMode ? 'text-white' : ''}`}
            onClick={handleToggleDarkMode}
          >
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
          </button>
          
          <button 
            className={`btn border-0 me-2 ${darkMode ? 'text-white' : ''}`}
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleSidebar } from '../store/sidebarSlice';
// import { setDarkMode } from '../store/themeSlice';
// import { logout } from '../store/authSlice';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const { darkMode } = useSelector(state => state.theme);
//   const { isOpen } = useSelector(state => state.sidebar);

//   const toggleTheme = () => {
//     const newMode = !darkMode;
//     dispatch(setDarkMode(newMode));
//     localStorage.setItem('darkMode', newMode.toString());
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleToggleSidebar = () => {
//     dispatch(toggleSidebar(!isOpen));
//   };

//   return (
//     <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} border-bottom`}>
//       <div className="container-fluid">
//         <button 
//           id="sidebar-toggler"
//           className="btn btn-outline-secondary me-2" 
//           onClick={handleToggleSidebar}
//         >
//           <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
//         </button>
//         <a className="navbar-brand" href="/">Task Master</a>
        
//         <div className="ms-auto d-flex">
//           <button 
//             className="btn btn-outline-secondary me-2" 
//             onClick={toggleTheme}
//           >
//             <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
//           </button>
          
//           <button 
//             className="btn btn-outline-danger" 
//             onClick={handleLogout}
//           >
//             <i className="bi bi-box-arrow-right me-1"></i>
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;