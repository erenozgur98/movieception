const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// commented out for now, for some reason it replaces api/users/user <-- to be checked later

// router.get('/:id', async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.params.id);
//         if (!userData) {
//             res.status(404).json({ message: 'No user with this id!' });
//             return;
//         }
//         res.status(200).json(userData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// get user
router.get('/user', async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userInfo = {
                _id: req.session.user_id,
                email: req.session.email,
                username: req.session.username,
                logged_in: true
            };
            res.json(userInfo);
        } else {
            res.status(403).json({ message: 'Something went wrong getting the user, could mean that you are not logged in/signedup yet' });
        }
    } catch (err) {
        console.log('1278361246129371294571237129371297', err)
    };
});


////////// FAVORITES //////////

// Get all favorites
router.get('/:username/favorites' , (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).sendStatus(`Error ${err}`)
        })
})

// get one specific user by username
router.get('/:username', (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            res.json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Error: ' + err)
        })
});

// add a movie to user's list of favorites
router.post('/:username/favorite/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $push: {
            movieFavorites: req.params.MovieId
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                console.log(err)
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser)
            }
        }
    )
});

// add a show to user's list of favorites
router.post('/:username/favorite/shows/:ShowId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $push: {
            showFavorites: req.params.ShowId
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                console.log(err)
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser)
            }
        }
    )
});

// remove a movie from user's list of favorites
router.put('/:username/favorite/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            movieFavorites: { $in: [ req.params.MovieId ] }
        }
    },
    function (err, updatedUser) {
        if (err) {
            console.log(err)
            res.status(500).send('Error: ' + err)
        } else {
            res.json(updatedUser)
        }
    })
});

// remove a show from user's list of favorites
router.delete('/:username/favorite/shows/:ShowId', (req, res) => {
    User.findOneAndDelete({
        username: req.params.username
    }, {
        $pull: {
            movieFavorites: { $in: [ req.params.MovieId ] }
        }
    },
    function (err, updatedUser) {
        if (err) {
            console.log(err)
            res.status(500).send('Error: ' + err)
        } else {
            res.json(updatedUser)
        }
    })
});


////////// LOGIN - SIGNUP - LOGOUT //////////

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) return res.status(403).json({ message: 'Incorrect username' });

        // checking to see if the passwords match
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) return res.status(401).json({ message: 'Incorrect Password' });

        // this is not working
        delete user.password

        req.session.user_id = user.id;
        req.session.logged_in = true;
        req.session.username = user.username;
        req.session.email = user.email;

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        // this is not working
        delete newUser.password;

        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        req.session.username = newUser.username;

        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

router.post('/logout', async (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        console.log('Now logging out');
    } else {
        res.status(404).end();
    }
});

module.exports = router;
