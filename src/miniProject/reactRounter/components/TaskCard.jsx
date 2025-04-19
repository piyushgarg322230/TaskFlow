// src/components/TaskCard.jsx
import { FaCalendarDay, FaCheckCircle, FaExclamationTriangle, FaFlag } from 'react-icons/fa';

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const priorityIcons = {
  high: <FaFlag className="text-red-500" />,
  medium: <FaFlag className="text-yellow-500" />,
  low: <FaFlag className="text-green-500" />
};

const TaskCard = ({ task, onToggleComplete }) => {
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = !task.completed && task.dueDate < today;
  const isToday = task.dueDate === today && !task.completed;

  const getDateDisplay = () => {
    if (task.completed) {
      return (
        <span className="flex items-center gap-2 text-sm text-green-600">
          <FaCheckCircle className="text-green-500" />
          {task.completedAt ? `Completed (${new Date(task.completedAt).toLocaleDateString()})` : 'Completed'}
        </span>
      );
    } else if (isOverdue) {
      return (
        <span className="flex items-center gap-2 text-sm text-red-600">
          <FaExclamationTriangle className="text-red-500" />
          Overdue ({new Date(task.dueDate).toLocaleDateString()})
        </span>
      );
    } else if (isToday) {
      return (
        <span className="flex items-center gap-2 text-sm text-blue-600">
          <FaCalendarDay className="text-blue-500" />
          Today
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendarDay className="text-gray-500" />
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      );
    }
  };

  return (
    <div className="task-card group">
      <div 
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.completed && (
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="task-content">
        <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`tag ${task.list === 'work' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
            {task.list.charAt(0).toUpperCase() + task.list.slice(1)}
          </span>
          {getDateDisplay()}
          {task.priority && !task.completed && (
            <span className={`priority-tag ${priorityColors[task.priority]}`}>
              {priorityIcons[task.priority]}
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;