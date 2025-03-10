import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Planned from './pages/Planned';
import Login from './pages/Login';
import { setDarkMode } from './store/themeSlice';
import { toggleSidebar } from './store/sidebarSlice';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { darkMode } = useSelector(state => state.theme);
  const { isOpen } = useSelector(state => state.sidebar);
  const dispatch = useDispatch();

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      dispatch(setDarkMode(savedDarkMode === 'true'));
    }
  }, [dispatch]);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('left-sidebar');
      const navbarToggler = document.getElementById('sidebar-toggler');
      
      if (isOpen && sidebar && !sidebar.contains(event.target) && 
          navbarToggler && !navbarToggler.contains(event.target)) {
        dispatch(toggleSidebar(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        {isAuthenticated ? (
          <>
            <Navbar />
            <div className="d-flex position-relative">
              <Sidebar />
              <div 
                className={`content-area flex-grow-1 overflow-auto ${isOpen ? 'ps-330' : ''}`}
                style={{
                  transition: 'padding-left 0.3s ease',
                  maxWidth: '100vw',
                  minHeight: 'calc(100vh - 56px)',
                }}
              >
                <div className="container-fluid py-3">
                  <div className="row justify-content-center">
                    <div className={`${isOpen ? 'col-md-10 col-lg-8 col-xl-6' : 'col-12 col-lg-10 col-xl-8'}`}>
                      <Routes>
                        <Route path="/" element={<Home view="all" />} />
                        <Route path="/today" element={<Home view="today" />} />
                        <Route path="/important" element={<Home view="important" />} />
                        <Route path="/planned" element={<Planned />} />
                        <Route path="/assigned" element={<Planned />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;