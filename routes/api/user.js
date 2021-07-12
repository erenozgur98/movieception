const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {

    } catch (err) {
        
    }
});

router.get('/user', async (req, res) => {
    try {

    } catch (err) {

    }
});

router.post('/login', async (req, res) => {
    try {

    } catch (err) {

    }
});

router.post('/signup', async (req, res) => {
    try {
        const email = await User.findOne({ where: { email: req.body.email }});
        const user = await User.findOne({ where: { username: req.body.username}});

        if (email) return res.status(400).json({ message: 'That email is taken' });
        if (user) return res.status(400).json({ message: 'That username is taken' });

        const newUser = await User.create(req.body);
        delete newUser.password;

        req.session.user_id = newUser._id;
        req.session.logged_in = true;
        req.session.username = newUser.username;

        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {

    } catch (err) {

    }
});

module.exports = router;
