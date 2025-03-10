import React from 'react';
import { useSelector } from 'react-redux';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import RightSidebar from '../components/RightSidebar'; // Assuming you have this component

const Home = ({ view }) => {
  const { rightSidebarOpen } = useSelector(state => state.sidebar);
  const { darkMode } = useSelector(state => state.theme);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className={`${rightSidebarOpen ? 'col-md-8 col-lg-9' : 'col-12'}`}>
          <div className="p-3">
            <h2 className={`mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
              {view === 'all' ? 'All Tasks' : 
               view === 'today' ? 'Today\'s Tasks' : 
               view === 'important' ? 'Important Tasks' : 'Tasks'}
            </h2>
            <TaskInput />
            <TaskList view={view} />
          </div>
        </div>
        
        {rightSidebarOpen && (
          <div className="col-md-4 col-lg-3 border-start">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;