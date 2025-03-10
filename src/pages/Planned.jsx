import React from 'react';
import { useSelector } from 'react-redux';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import RightSidebar from '../components/RightSidebar';

const Planned = () => {
  const { darkMode } = useSelector(state => state.theme);
  const { isOpen } = useSelector(state => state.sidebar);
  
  // Always show right sidebar on Planned page
  const mainContentClass = isOpen ? 'col-md-9' : 'col-md-12';

  return (
    <div className="container-fluid p-0">
      <div className="row g-0" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className={`${mainContentClass} p-3`}>
          <div className={`p-3 rounded ${darkMode ? 'bg-dark' : 'bg-light'}`}>
            <h4 className="mb-3">Planned Tasks</h4>
            <TaskInput />
            <TaskList view="all" />
          </div>
        </div>
        
        <div className="col-md-3 p-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Planned;