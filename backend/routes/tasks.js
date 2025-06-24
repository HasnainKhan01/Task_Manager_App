const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
  try {
    console.log('GET tasks, User ID:', req.user.id);
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error('GET tasks error:', err); 
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, [
  body('title').trim().escape().notEmpty().withMessage('Title required'),
  body('description').trim().escape(),
  body('status').isIn(['To Do', 'In Progress', 'Done']).withMessage('Invalid status')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
  try {
    console.log('POST task, User ID:', req.user.id, 'Body:', req.body);
  const task = new Task({
    title: req.body.title,
    description: req.body.description || '',
    status: req.body.status,
    user: req.user.id, 
  });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('POST task error:', err); 
    res.status(400).json({ message: err.message || 'Failed to create task' });
  }
});

router.put('/:id', auth, [
  body('title').optional().trim().escape(),
  body('description').optional().trim().escape(),
  body('status').optional().isIn(['To Do', 'In Progress', 'Done']).withMessage('Invalid status')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
  try {
    console.log('PUT task ID:', req.params.id, 'User ID:', req.user.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error('PUT task error:', err); 
    res.status(400).json({ message: err.message || 'Failed to update task' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting task ID:', req.params.id, 'User ID:', req.user.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('DELETE task error:', err); // Debug
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;