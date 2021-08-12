const router = require('express').Router();
const userRoutes = require('./user');

// User Routes
router.use('/users', userRoutes);

// Next routes will be in here

module.exports = router;