// src/components/TaskModal.jsx
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [list, setList] = useState('personal');
  const [important, setImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    onSave({
      title,
      description,
      dueDate,
      list,
      important
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate(new Date().toISOString().split('T')[0]);
    setList('personal');
    setImportant(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Add New Task</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="taskTitle">Task Title</label>
              <input
                type="text"
                id="taskTitle"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Description</label>
              <textarea
                id="taskDescription"
                className="form-control"
                rows="3"
                placeholder="Enter description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDueDate">Due Date</label>
              <input
                type="date"
                id="taskDueDate"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskList">List</label>
              <select
                id="taskList"
                className="form-control"
                value={list}
                onChange={(e) => setList(e.target.value)}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  id="taskImportant"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                /> Mark as important
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskModal;