const router = require('express').Router();
const userRoutes = require('./user');
const favoriteRoutes = require('./favorite');

// User Routes
router.use('/users', userRoutes);

// Favorite Routes
router.use('/favorite', favoriteRoutes);

// Next routes will be in here

module.exports = router;