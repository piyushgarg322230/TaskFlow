import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import FabButton from './components/FabButton';
import Profile from './components/Profile';
import { addStartDoc, localUser,dataBaseKey,fetchUserTasks, completeTask } from './authService'; // Adjust the import path as necessary
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfile, setIsProfile] = useState(false);


  useEffect(() => {
    loadTasks();  
  }, []);
  
  const loadTasks = async () => {
    const fetchedTasks = await fetchUserTasks();
    setTasks(fetchedTasks);
  };

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
    addStartDoc(localUser.uid, taskWithId,dataBaseKey.tasks,taskWithId.id); // Add this line to save the task in Firestore
    // setTasks([...tasks, taskWithId]);
    loadTasks(); // Reload tasks from Firestore
    setIsModalOpen(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        completeTask(taskId, !task.completed); // Update Firestore
        // return {
        //   ...task,
        //   completed: !task.completed,
        //   completedAt: !task.completed ? new Date().toISOString() : null
        // };
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

    switch (activeView) {
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
        setIsProfile={setIsProfile}
      />

      {!isProfile && (
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
      )}

      <FabButton onClick={() => setIsModalOpen(true)} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addTask}
      />

      {isProfile && (
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>

          <Profile
            isOpen={isProfile}
            onClose={() => {
              setIsProfile(false);
              setActiveView('today'); // ya koi bhi default view jahan wapas jaana ho
            }}
          />
        </div>

      )}
    </div>
  );
}

export default App;