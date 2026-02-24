const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus
} = require('../controllers/taskController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// ================= CREATE & GET =================

router.route('/')
  .post(protect, adminOnly, createTask)  // Only admin can create
  .get(protect, getTasks);               // Both admin & employee can view

// ================= FULL UPDATE & DELETE (ADMIN ONLY) =================

router.route('/:id')
  .put(protect, adminOnly, updateTask)   // Admin full update
  .delete(protect, adminOnly, deleteTask); // Admin delete

// ================= STATUS UPDATE (EMPLOYEE + ADMIN) =================

router.patch('/:id/status', protect, updateTaskStatus);

module.exports = router;