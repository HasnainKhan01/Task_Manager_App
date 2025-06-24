import React, { useState } from 'react';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [deletingTasks, setDeletingTasks] = React.useState({});
  const [sortOrder, setSortOrder] = useState('default');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleEdit = (task) => {
    const nextStatus = {
      'To Do': 'In Progress',
      'In Progress': 'Done',
      'Done': 'To Do',
    };
    updateTask(task._id, { status: nextStatus[task.status] });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setDeletingTasks(prev => ({ ...prev, [id]: true }));
    try {
      await deleteTask(id);
    } catch (error) {
      alert('Failed to delete task. Please try again.');
    } finally {
      setDeletingTasks(prev => ({ ...prev, [id]: false }));
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'default') return 0; // Original order
    const statusOrder = { 'To Do': 1, 'In Progress': 2, 'Done': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const filteredTasks = filterStatus === 'all'
    ? sortedTasks
    : sortedTasks.filter(task => task.status === filterStatus);
  
  
  return (
    <div className="container mt-4">
      <h3>Task List</h3>
      <div className="mb-3 d-flex justify-content-between">
        <div>
          <label htmlFor="filterStatus" className="form-label me-2">Filter:</label>
          <select
            id="filterStatus"
            className="form-select d-inline-block"
            style={{ width: 'auto' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder" className="form-label me-2">Sort:</label>
          <select
            id="sortOrder"
            className="form-select d-inline-block"
            style={{ width: 'auto' }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="status">By Status</option>
          </select>
        </div>
      </div>
      {Array.isArray(filteredTasks) && filteredTasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map(task => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong>: {task.description} ({task.status})
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(task)}
                  disabled={deletingTasks[task._id]}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(task._id)}
                  disabled={deletingTasks[task._id]}
                >
                  {deletingTasks[task._id] ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;