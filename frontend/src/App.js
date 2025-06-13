import { useState } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React', description: 'Build a front-end', status: 'To Do' },
    { id: 2, title: 'Code Back-end', description: 'Set up APIs', status: 'In Progress' },
  ]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;