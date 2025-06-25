import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [deletingTasks, setDeletingTasks] = useState({});
  const [sortOrder, setSortOrder] = useState('default');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTasktoDelete] = useState(null);


  const handleEdit = (task) => {
    const nextStatus = {
      'To Do': 'In Progress',
      'In Progress': 'Done',
      'Done': 'To Do',
    };
    updateTask(task._id, { status: nextStatus[task.status] });
  };

  const handleDeleteClick = (id) => {
    setTasktoDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setDeletingTasks(prev => ({ ...prev, [taskToDelete]: true }));
    try {
      await deleteTask(taskToDelete);
    } catch (error) {
      alert('Failed to delete task. Please try again.');
    } finally {
      setDeletingTasks(prev => ({ ...prev, [taskToDelete]: false }));
      setShowConfirm(false);
      setTasktoDelete(null);
    }
    };

    const handleCancelDelete = () => {
      setShowConfirm(false);
      setTasktoDelete(null);
    };
  

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'default') return 0; // Original order
    const statusOrder = { 'To Do': 1, 'In Progress': 2, 'Done': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const filteredTasks = filterStatus === 'all'
    ? sortedTasks
    : sortedTasks.filter(task => task.status === filterStatus);
  
  
  return (
    <div className="container mt-4">
      <h3>Task List</h3>

      {/* Filter and Sort Controls */}
      <div className="d-flex mb-3">
        <div className="me-3">
          <label className="me-2">Filter:</label>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="form-select d-inline-block w-auto"
          >
            <option value="all">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label className="me-2">Sort:</label>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="form-select d-inline-block w-auto"
          >
            <option value="default">Default</option>
            <option value="status">By Status</option>
          </select>
        </div>
      </div>

      {Array.isArray(filteredTasks) && filteredTasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map(task => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong>: {task.description} ({task.status})
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(task)}
                  disabled={deletingTasks[task._id]}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteClick(task._id)}
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

      <Modal show={showConfirm} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={deletingTasks[taskToDelete]}
          >
            {deletingTasks[taskToDelete] ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;