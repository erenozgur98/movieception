const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/signup')
    .get(userController.findAll)
    .post(userController.create);

router
    .route('/login')
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;
