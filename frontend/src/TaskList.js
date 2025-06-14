import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const handleEdit = (task) => {
    const nextStatus = {
      'To Do': 'In Progress',
      'In Progress': 'Done',
      'Done': 'To Do',
    };
    updateTask(task._id, { status: nextStatus[task.status] });
  };
  
  
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
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
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