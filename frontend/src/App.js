import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to load tasks');
      if (error.response?.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        setUsername('');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchUsername = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error.response?.data || error);
      setUsername('');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTasks();
      fetchUsername();
    } else {
      setUsername('');
    }
  }, [token, fetchTasks, fetchUsername]);

  const addTask = useCallback(async (newTask) => {
    try {
      console.log('Adding task:', newTask, 'Token:', token);
      const response = await axios.post(`${API_URL}/api/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => [...prevTasks, response.data]);
      setError('');
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to add task');
    }
  }, [token]);

  const updateTask = useCallback(async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
      setError('');
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to update task');
    }
  }, [token]);

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.filter(task => task._id !== id);
        console.log('Deleted task ID:', id, 'Updated tasks:', updatedTasks);
        return updatedTasks;
      });
      setError('');
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  }, [token]);

  const logout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Task Manager {username && `(${username})`}
            </a>
            <div className="navbar-nav ms-auto">
              {token && (
                <button className="btn btn-outline-danger" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                token ? (
                  <>
                    <TaskForm addTask={addTask} />
                    {loading ? (
                      <p className="text-center mt-3">Loading tasks...</p>
                    ) : (
                      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                    )}
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;