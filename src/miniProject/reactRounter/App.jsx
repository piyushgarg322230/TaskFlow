import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import FabButton from './components/FabButton';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [
      {
        id: 1,
        title: "Complete project proposal",
        description: "Include budget and timeline",
        dueDate: new Date().toISOString().split('T')[0],
        list: "work",
        priority: "high",
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Team sync meeting",
        description: "Discuss Q2 goals",
        dueDate: new Date().toISOString().split('T')[0],
        list: "work",
        priority: "medium",
        completed: true,
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "Renew gym membership",
        description: "Check for discounts",
        dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        list: "personal",
        priority: "low",
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTasks([...tasks, taskWithId]);
    setIsModalOpen(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  const filteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    let filtered = tasks;
    
    // Apply search filter if query exists
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    switch(activeView) {
      case 'today':
        return {
          today: filtered.filter(task => task.dueDate === today && !task.completed),
          overdue: filtered.filter(task => task.dueDate < today && !task.completed)
        };
      case 'upcoming':
        return {
          upcoming: filtered.filter(task => task.dueDate > today && !task.completed)
        };
      case 'completed':
        return {
          completed: filtered.filter(task => task.completed)
        };
      case 'overdue':
        return {
          overdue: filtered.filter(task => task.dueDate < today && !task.completed)
        };
      default:
        return {};
    }
  };

  const taskCounts = {
    today: tasks.filter(task => task.dueDate === new Date().toISOString().split('T')[0] && !task.completed).length,
    upcoming: tasks.filter(task => task.dueDate > new Date().toISOString().split('T')[0] && !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
    overdue: tasks.filter(task => task.dueDate < new Date().toISOString().split('T')[0] && !task.completed).length
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        taskCounts={taskCounts}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="task-header">
          <div className="header-left">
            <h1>
              {activeView === 'today' && "Today's Tasks"}
              {activeView === 'upcoming' && "Upcoming Tasks"}
              {activeView === 'completed' && "Completed Tasks"}
              {activeView === 'overdue' && "Overdue Tasks"}
            </h1>
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button className="add-task" onClick={() => setIsModalOpen(true)}>
            <i className="fas fa-plus"></i>
            Add Task
          </button>
        </div>

        <TaskList 
          tasks={filteredTasks()} 
          activeView={activeView}
          onToggleComplete={toggleTaskCompletion}
        />
      </div>

      <FabButton onClick={() => setIsModalOpen(true)} />
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addTask}
      />
    </div>
  );
}

export default App;