const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, getUserLogs } = require('../controllers/userController');
const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.get('/track/:userId', protect, getUserLogs);

module.exports = router;
