import React from 'react';

const TaskList = () => {
  const tasks = [
    { id: 1, title: 'Learn React', description: 'Build a front-end', status: 'To Do' },
    { id: 2, title: 'Code Back-end', description: 'Set up APIs', status: 'In Progress' },
  ];

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} ({task.status})
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;