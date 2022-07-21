const History = require("../models/History");

module.exports = {
    findAllHistory: (req, res) => {
        History.findOne({
            where: {
                username: req.params.username
            }
        })
            .then(favorites => {
                res.json(favorites)
            })
            .catch(err => {
                console.log(err)
            })
    },

    addMovieToHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.params.username } });

            if (historyArray?.dataValues.showHistory !== null && historyArray?.dataValues.movieFavorites === null) {
                const newMovieHistory = await History.update(
                    {
                        movieHistory: [
                            {
                                id: req.params.MovieId,
                                title: req.params.Title,
                                poster_path: req.params.PosterPath,
                                created_at: new Date()
                            }
                        ]
                    },
                    { where: { username: req.params.username } }
                );
                return res.json(newMovieHistory)
            } else if (historyArray === null || historyArray.dataValues?.movieHistory === null) {
                const newMovieHistory = await History.create({
                    username: req.params.username,
                    movieHistory: [
                        {
                            id: req.params.MovieId,
                            title: req.params.Title,
                            poster_path: req.params.PosterPath,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newMovieHistory);
            } else {
                let movieArray = historyArray.dataValues.movieHistory;
                if (movieArray?.some(e => e.id === req.params.MovieId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newMovieHistory = {
                        id: req.params.MovieId,
                        title: req.params.Title,
                        poster_path: req.params.PosterPath,
                        created_at: new Date()
                    };

                    movieArray.push(newMovieHistory);

                    History.update(
                        { movieHistory: movieArray },
                        { where: { username: req.params.username } }
                    )

                    res.json(movieArray)
                }

            }

        } catch (err) {
            console.log(`sflhsafljsafljsafhaslsahsaljfasd ${err}`)
            res.status(500).json(err)
        }

    },

    addShowToHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.params.username } });

            if (historyArray?.dataValues.movieHistory !== null && historyArray.dataValues.showHistory === null) {
                const newShowFavorite = await History.update(
                    {
                        showHistory: [
                            {
                                id: req.params.ShowId,
                                title: req.params.Title,
                                poster_path: req.params.PosterPath,
                                created_at: new Date()
                            }
                        ]
                    },
                    { where: { username: req.params.username } }
                );
                return res.json(newShowFavorite)
            } else if (historyArray === null || historyArray.dataValues?.showHistory === null) {
                const newShowFavorite = await History.create({
                    username: req.params.username,
                    showHistory: [
                        {
                            id: req.params.ShowId,
                            title: req.params.Title,
                            poster_path: req.params.PosterPath,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newShowFavorite);
            } else {
                let showArray = historyArray.dataValues.showHistory;
                if (showArray?.some(e => e.id === req.params.ShowId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newShowHistory = {
                        id: req.params.ShowId,
                        title: req.params.Title,
                        poster_path: req.params.PosterPath,
                        created_at: new Date()
                    };

                    showArray.push(newShowHistory);

                    History.update(
                        { showHistory: showArray },
                        { where: { username: req.params.username } }
                    )

                    res.json(showArray)
                }

            }

        } catch (err) {
            console.log(`sflhsafljsafljsafhaslsahsaljfasd ${err}`)
            res.status(500).json(err)
        }
    },

    deleteMovieFromHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.params.username } });

            const movieArray = historyArray.dataValues.movieHistory;
            const index = movieArray.findIndex(x => x.id === req.params.MovieId);
            movieArray.splice(index, 1);

            History.update(
                { movieHistory: movieArray },
                { where: { username: req.params.username } }
            );

            res.json(historyArray);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteShowFromHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.params.username } });

            const showArray = historyArray.dataValues.showHistory;
            const index = showArray.findIndex(x => x.id === req.params.ShowId);
            showArray.splice(index, 1);

            History.update(
                { showHistory: showArray },
                { where: { username: req.params.username } }
            );

            res.json(historyArray);

        } catch (err) {
            res.status(500).json(err)
        }
    }
}
