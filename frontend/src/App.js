import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (error.response?.status === 401) {
        setToken('');
        localStorage.removeItem('token');
      }
    }
  }, [token, setTasks, setToken]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token, fetchTasks]);

  const addTask = useCallback(async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, [token]);

  const updateTask = useCallback(async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, [token]);

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }, [token]);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <h1>Task Manager</h1>
        {token && <button onClick={logout}>Logout</button>}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              token ? (
                <>
                  <TaskForm addTask={addTask} />
                  <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;