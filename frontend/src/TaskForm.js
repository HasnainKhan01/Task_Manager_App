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
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>
            <div>
                <label>Title:</label>
                <input type="text" value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter task title"
                />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter task description"
                />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;