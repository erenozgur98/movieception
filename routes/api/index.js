const router = require('express').Router();
const userRoutes = require('./user');

// User Routes
router.use('/', userRoutes);

module.exports = router;