const router = require('express').Router();
const userRoutes = require('./user');

// User Routes
router.use('/user', userRoutes);

module.exports = router;