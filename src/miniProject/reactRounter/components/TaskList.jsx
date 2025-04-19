// src/components/TaskList.jsx
import TaskCard from './TaskCard';

const TaskList = ({ tasks, activeView, onToggleComplete }) => {
  return (
    <div className="task-lists-container">
      {activeView === 'today' && (
        <>
          {tasks.today?.length > 0 && (
            <div className="task-list-section">
              <h2 className="section-title">
                <i className="fas fa-sun"></i>
                Today
              </h2>
              <div className="task-list">
                {tasks.today.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onToggleComplete={onToggleComplete}
                  />
                ))}
              </div>
            </div>
          )}
          
          {tasks.overdue?.length > 0 && (
            <div className="task-list-section">
              <h2 className="section-title">
                <i className="fas fa-exclamation-triangle"></i>
                Overdue
              </h2>
              <div className="task-list">
                {tasks.overdue.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onToggleComplete={onToggleComplete}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {activeView === 'upcoming' && tasks.upcoming?.length > 0 && (
        <div className="task-list-section">
          <h2 className="section-title">
            <i className="fas fa-calendar-alt"></i>
            Upcoming
          </h2>
          <div className="task-list">
            {tasks.upcoming.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
      
      {activeView === 'completed' && tasks.completed?.length > 0 && (
        <div className="task-list-section">
          <h2 className="section-title">
            <i className="fas fa-check-circle"></i>
            Completed
          </h2>
          <div className="task-list">
            {tasks.completed.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
      
      {activeView === 'overdue' && tasks.overdue?.length > 0 && (
        <div className="task-list-section">
          <h2 className="section-title">
            <i className="fas fa-exclamation-triangle"></i>
            Overdue
          </h2>
          <div className="task-list">
            {tasks.overdue.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
      
      {((activeView === 'today' && !tasks.today?.length && !tasks.overdue?.length) ||
        (activeView === 'upcoming' && !tasks.upcoming?.length) ||
        (activeView === 'completed' && !tasks.completed?.length) ||
        (activeView === 'overdue' && !tasks.overdue?.length)) && (
        <div className="empty-state">
          <p>No tasks found in this view</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;