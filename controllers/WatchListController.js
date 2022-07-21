const WatchList = require("../models/WatchList");

module.exports = {
    findAllWatchList: (req, res) => {
        WatchList.findOne({
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

    addMovieToWatchList: async (req, res) => {
        try {
            const watchListArray = await WatchList.findOne({ where: { username: req.params.username } });

            if (watchListArray?.dataValues.showWatchList !== null && watchListArray?.dataValues.movieWatchList === null) {
                const newMovieWatchList = await WatchList.update(
                    {
                        movieWatchList: [
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
                return res.json(newMovieWatchList)
            } else if (watchListArray === null || watchListArray.dataValues?.movieWatchList === null) {
                const newMovieWatchList = await WatchList.create({
                    username: req.params.username,
                    movieWatchList: [
                        {
                            id: req.params.MovieId,
                            title: req.params.Title,
                            poster_path: req.params.PosterPath,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newMovieWatchList);
            } else {
                let movieArray = watchListArray.dataValues.movieWatchList;
                if (movieArray?.some(e => e.id === req.params.MovieId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newFavoriteMovie = {
                        id: req.params.MovieId,
                        title: req.params.Title,
                        poster_path: req.params.PosterPath,
                        created_at: new Date()
                    };

                    movieArray.push(newFavoriteMovie);

                    WatchList.update(
                        { movieWatchList: movieArray },
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

    addShowToWatchList: async (req, res) => {
        try {
            const watchListArray = await WatchList.findOne({ where: { username: req.params.username } });

            if (watchListArray?.dataValues.movieWatchList !== null && watchListArray.dataValues.showWatchList === null) {
                const newShowFavorite = await WatchList.update(
                    {
                        showWatchList: [
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
            } else if (watchListArray === null || watchListArray.dataValues?.showWatchList === null) {
                const newShowFavorite = await WatchList.create({
                    username: req.params.username,
                    showWatchList: [
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
                let showArray = watchListArray.dataValues.showWatchList;
                if (showArray?.some(e => e.id === req.params.ShowId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newFavoriteShow = {
                        id: req.params.ShowId,
                        title: req.params.Title,
                        poster_path: req.params.PosterPath,
                        created_at: new Date()
                    };

                    showArray.push(newFavoriteShow);

                    WatchList.update(
                        { showWatchList: showArray },
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

    deleteMovieFromWatchList: async (req, res) => {
        try {
            const watchListArray = await WatchList.findOne({ where: { username: req.params.username } });

            const movieArray = watchListArray.dataValues.movieWatchList;
            const index = movieArray.findIndex(x => x.id === req.params.MovieId);
            movieArray.splice(index, 1);

            WatchList.update(
                { movieWatchList: movieArray },
                { where: { username: req.params.username } }
            );

            res.json(watchListArray);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteShowFromWatchList: async (req, res) => {
        try {
            const watchListArray = await WatchList.findOne({ where: { username: req.params.username } });

            const showArray = watchListArray.dataValues.showWatchList;
            const index = showArray.findIndex(x => x.id === req.params.ShowId);
            showArray.splice(index, 1);

            WatchList.update(
                { showWatchList: showArray },
                { where: { username: req.params.username } }
            );

            res.json(watchListArray);

        } catch (err) {
            res.status(500).json(err)
        }
    }
}
