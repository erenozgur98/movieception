const router = require('express').Router();

const getUser = require('../../controllers/userController');

router.use('/', getUser)

module.exports = router;