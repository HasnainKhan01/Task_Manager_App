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
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} ({task.status})
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;