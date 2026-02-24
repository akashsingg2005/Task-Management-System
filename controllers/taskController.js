const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
exports.createTask = async (req, res) => {
  const { title, description, priority, deadline, assignedTo } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    deadline,
    assignedTo,
    createdBy: req.user._id
  });

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  if (req.user.role === 'admin') {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    return res.json(tasks);
  }

  const tasks = await Task.find({ assignedTo: req.user._id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  Object.assign(task, req.body);
  const updatedTask = await task.save();

  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  await task.deleteOne();
  res.json({ message: 'Task removed' });
};

exports.updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  task.status = req.body.status;
  await task.save();

  res.json(task);
};
