import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) return;
        addTask({ id: Date.now(), title, description, status });
        setTitle(''); 
        setDescription(''); 
        setStatus('To Do');
    };

    return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Add Task</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status:</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;