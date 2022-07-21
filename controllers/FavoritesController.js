const Favorites = require("../models/Favorites");

module.exports = {
    findAllFavorites: (req, res) => {
        Favorites.findOne({
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

    addMovieToFavorite: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.params.username } });

            if (favoritesArray?.dataValues.showFavorites !== null && favoritesArray?.dataValues.movieFavorites === null) {
                const newMovieFavorite = await Favorites.update(
                    {
                        movieFavorites: [
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
                return res.json(newMovieFavorite)
            } else if (favoritesArray === null || favoritesArray.dataValues?.movieFavorites === null) {
                const newMovieFavorite = await Favorites.create({
                    username: req.params.username,
                    movieFavorites: [
                        {
                            id: req.params.MovieId,
                            title: req.params.Title,
                            poster_path: req.params.PosterPath,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newMovieFavorite);
            } else {
                let movieArray = favoritesArray.dataValues.movieFavorites;
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

                    Favorites.update(
                        { movieFavorites: movieArray },
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

    addShowToFavorite: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.params.username } });

            if (favoritesArray?.dataValues.movieFavorites !== null && favoritesArray.dataValues.showFavorites === null) {
                const newShowFavorite = await Favorites.update(
                    {
                        showFavorites: [
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
            } else if (favoritesArray === null || favoritesArray.dataValues?.showFavorites === null) {
                const newShowFavorite = await Favorites.create({
                    username: req.params.username,
                    showFavorites: [
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
                let showArray = favoritesArray.dataValues.showFavorites;
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

                    Favorites.update(
                        { showFavorites: showArray },
                        { where: { username: req.params.username } }
                    )

                    res.status(200).json({ message: `Successfully deleted ${req.body.title} from your favorites.` })
                }

            }

        } catch (err) {
            console.log(`sflhsafljsafljsafhaslsahsaljfasd ${err}`)
            res.status(500).json(err)
        }
    },

    deleteMovieFromFavorites: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.params.username } });

            const movieArray = favoritesArray.dataValues.movieFavorites;
            const index = movieArray.findIndex(x => x.id === req.params.MovieId);
            movieArray.splice(index, 1);

            Favorites.update(
                { movieFavorites: movieArray },
                { where: { username: req.params.username } }
            );

            res.json(favoritesArray);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteShowFromFavorites: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.params.username } });

            const showArray = favoritesArray.dataValues.showFavorites;
            showArray.findIndex(x => console.log(`id of showArray = ${x.id}`));
            const index = showArray.findIndex(x => x.id === req.params.ShowId);

            if (index !== -1) showArray.splice(index, 1);

            Favorites.update(
                { showFavorites: showArray },
                { where: { username: req.params.username } }
            );

            res.json(favoritesArray);

        } catch (err) {
            res.status(500).json(err)
        }
    }
}
