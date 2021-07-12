const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

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
        const userData = await User.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user', async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userData = await User.findByPk(req.session.user_id);
            const userInfo = {
                role: userData.dataValues.role,
                username: userData.dataValues.username,
                email: userData.dataValues.email,
                logged_in: true
            };
            res.json(userInfo);
        } else {
            res.status(403).json({ message: 'Something went wrong getting the user, could mean that you are not logged in/signedup yet ' });
        }
    } catch (err) {
        console.log('********************line 38 catch err', err);
    };
});

router.post('/login', async (req, res) => {
    console.log(req.body.username, req.session)
    try {
        const user = req.body.username;

        if (!user) return res.status(403).json({ message: 'Incorrect Username' });

        // const validPassword = await bcrypt.compare(
        //     req.body.password,
        //     user.password
        // );

        // if (!validPassword) return res.status(401).json({ message: 'Incorrect Password' });

        const userData = JSON.parse(JSON.stringify(user));

        req.session.user_id = userData._id;
        req.session.logged_in = true;
        req.session.username = userData.username;

        res.json({ user: user });

    } catch (err) {
        console.log('------------------------------------Line 69', err);
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.user_id = newUser._id;
        console.log('session userid', req.session.user_id);
        req.session.logged_in = true;
        req.session.username = newUser.username;

        console.log('newuser', newUser);
        res.json(newUser);
    } catch (err) {
        console.log('***************************** Line 75', err);
        res.status(404).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {

    } catch (err) {

    }
});

module.exports = router;
