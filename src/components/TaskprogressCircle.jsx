import React from 'react';
import { useSelector } from 'react-redux';

const TaskProgressCircle = () => {
  const { tasks } = useSelector(state => state.tasks);
  
  // Calculate completed and pending tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Calculate percentages
  const completedPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // SVG parameters
  const size = 150;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const completedOffset = circumference - (completedPercentage / 100) * circumference;
  
  return (
    <div className="task-progress">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="progress-circle">
        {/* Background circle (red for pending) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgb(173, 107, 107) "  // Red color for pending
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle (green for completed) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#4caf50"  // Green color for completed
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={completedOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}  
        />
        
        {/* Center text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#4caf50"
        >
          {Math.round(completedPercentage)}%
        </text>
      </svg>
      
      <div className="progress-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: "#4caf50" }}></span>
          <span>Done ({completedTasks})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: "rgb(173, 107, 107)" }}></span>
          <span>Pending ({pendingTasks})</span>
        </div>
      </div>
      
      <style jsx>{`
        .task-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1vw;
          border: 1px solid gray;
          // margin-top: 1rem;
        }
        .progress-circle {
          margin-bottom: 1rem;
        }
        .progress-legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default TaskProgressCircle;