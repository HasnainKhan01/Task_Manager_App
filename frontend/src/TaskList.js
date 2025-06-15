import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [deletingTasks, setDeletingTasks] = React.useState({});

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
  
  
  return (
    <div className="container mt-4">
      <h3>Task List</h3>
      {Array.isArray(tasks) && tasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong>: {task.description} ({task.status})
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(task)}
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