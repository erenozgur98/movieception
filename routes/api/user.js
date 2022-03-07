const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

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
            res.json(userInfo)
        } else {
            res.status(403).json({ message: 'Something went wrong getting the user, could mean that you are not logged in/signed up yet' });
        }
    } catch (err) {
        console.log(err)
    };
});

////////// FAVORITES //////////

// Get all favorites
router.get('/:username/favorites', (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (user.movieFavorites && user.showFavorites !== null) {
                const favorites = {
                    Movie: user.movieFavorites,
                    Show: user.showFavorites
                }
                res.json(favorites)
            } else {
                res.json([])
            }
        })
        .catch(err => {
            res.status(500).sendStatus(`Error ${err}`)
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
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.movieFavorites)
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
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.showFavorites)
            }
        }
    )
});

// remove a movie from user's list of favorites
router.delete('/:username/favorite/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            movieFavorites: { $in: [req.params.MovieId] }
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.movieFavorites)
            }
        })
});

// remove a show from user's list of favorites
router.delete('/:username/favorite/shows/:ShowId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            showFavorites: { $in: [req.params.ShowId] }
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.showFavorites)
            }
        })
});


////////// WATCHED LIST //////////

// Get all watched
router.get('/:username/watched', (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (user.watchedMovies && user.watchedShows !== null) {
                const watched = {
                    Movie: user.watchedMovies,
                    Show: user.watchedShows
                }
                res.json(watched)
            } else {
                res.json([])
            }
        })
        .catch(err => {
            res.status(500).sendStatus(`Error ${err}`)
        })
})

router.post('/:username/watched/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $push: {
            watchedMovies: req.params.MovieId
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send(`Error: ${err}`)
            } else {
                res.json(updatedUser.watchedMovies)
            }
        })
});

router.post('/:username/watched/shows/:ShowId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $push: {
            watchedShows: req.params.ShowId
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send(`Error: ${err}`)
            } else {
                res.json(updatedUser.watchedShows)
            }
        })
});

router.delete('/:username/watched/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            watchedMovies: { $in: [req.params.MovieId] }
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.watchedMovies)
            }
        })
});

router.delete('/:username/watched/shows/:ShowId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            watchedShows: { $in: [req.params.ShowId] }
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.watchedShows)
            }
        })
});


////////// WATCHLIST //////////

router.get('/:username/watchlist', (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (user.watchedMovies && user.watchedShows !== null) {
                const watchList = {
                    Movie: user.movieWatchList,
                    Show: user.showWatchList
                }
                res.json(watchList)
            } else {
                res.json([])
            }
        })
        .catch(err => {
            console.log('askjhasdkjhads', err)
            res.status(500).sendStatus(`Error ${err}`)
        })
})

router.post('/:username/watchlist/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $push: {
            movieWatchList: req.params.MovieId
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send(`Error: ${err}`)
            } else {
                res.json(updatedUser.movieWatchList)
            }
        })
})

router.post('/:username/watchlist/shows/:ShowId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $push: {
            showWatchList: req.params.ShowId
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send(`Error: ${err}`)
            } else {
                res.json(updatedUser.showWatchList)
            }
        })
})

router.delete('/:username/watchlist/movies/:MovieId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            movieWatchList: { $in: [req.params.MovieId] }
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.movieWatchList)
            }
        })
});


router.delete('/:username/watchlist/shows/:ShowId', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username
    }, {
        $pull: {
            showWatchList: { $in: [req.params.ShowId] }
        }
    }, {
        new: true
    },
        function (err, updatedUser) {
            if (err) {
                res.status(500).send('Error: ' + err)
            } else {
                res.json(updatedUser.showWatchList)
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
        res.status(404).json({ err });
    }
});

router.post('/logout', async (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
