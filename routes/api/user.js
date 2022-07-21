const router = require('express').Router();
const { User, Favorites, History, WatchList, WatchedEpisodes } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        users.forEach(user => {
            delete user.dataValues.password;
            delete user._previousDataValues.password;
        });

        // TODO: concat favorites, history, watchLists into userData array with corresponding usernames/id's for admin portal later on
        // const favorites = await Favorites.findAll({ where: { username: users.map(user => user.dataValues.username) } });
        // const history = await History.findAll({ where: { username: users.map(user => user.dataValues.username) } });
        // const watchLists = await WatchList.findAll({ where: { username: users.map(user => user.dataValues.username) } });
        // let userData = []


        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        if (req.session.user_id) {
            res.send({ logged_in: true, user_id: req.session.user_id });
        } else {
            res.send({ logged_in: false });
        }
    } catch (err) {
        res.status(400).json(err);
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
        console.log(err);
    };
});

router.post('/signup', async (req, res) => {
    try {
        if (!req.body.role) req.body.role = 'user';

        const email = await User.findOne({ where: { email: req.body.email } });
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user) {
            res.status(400).json({ message: 'That username is taken' });
        } else if (email) {
            res.status(400).json({ message: 'That email is taken' });
        } else {
            const newUser = await User.create(req.body);
            delete user.password; newUser.password;

            req.session.user_id = newUser.id
            req.session.logged_in = true;
            req.session.username = newUser.username;

            res.json(newUser);
        };
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(403).json({ msg: 'Incorrect Username' });
            return;
        };

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return;
        }

        delete user.password

        req.session.user_id = user.id;
        req.session.logged_in = true;
        req.session.username = user.username;
        req.session.email = user.email;

        res.json(user);

    } catch (err) {
        res.status(400).json(err);
    }
});

// GET one user
router.get('/:username', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.username);
        if (!userData) {
            res.status(404).json({ message: 'No user with this username!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});


router.delete('/username', (req, res) => {
    // to be written
})

module.exports = router;