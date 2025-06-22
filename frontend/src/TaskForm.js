import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [errors, setErrors] = useState({ title: '', description: '', status: '' });

    const validStatuses = ['To Do', 'In Progress', 'Done'];

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { title: '', description: '', status: '' };
        let isValid = true;

        if (!title.trim()) {
          newErrors.title = 'Title is required';
          isValid = false;
        }

        if (!description.trim()) {
          newErrors.description = 'Description is required';
          isValid = false;
        }

        if (!validStatuses.includes(status)) {
          newErrors.status = 'Invalid status';
          isValid = false;
        }

        setErrors(newErrors);
        if (!isValid) return;

        addTask({ title, description, status });
        setTitle(''); 
        setDescription(''); 
        setStatus('To Do');
    };

    return (
    <div className="card mb-4">
      <div className="card-body">
        <h3>Add Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className={`form-select ${errors.status ? 'is-invalid' : ''}`}
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;