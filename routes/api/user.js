const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/user')
    .get(userController.findById)
    .post(userController.findById);


router.route('/users')
    .get(userController.findAll)
    .post(userController.create);

router.route('/login')
    .post(userController.findById)
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

router.route('/signup')
    .get(userController.findAll)
    .post(userController.create);

module.exports = router;
