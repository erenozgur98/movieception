const router = require('express').Router();

const getUser = require('../../controllers/userController');
const createUser = require('../../controllers/userController');

router.use('/', getUser)
router.post('/create', createUser)

module.exports = router;