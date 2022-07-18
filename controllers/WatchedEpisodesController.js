const WatchedEpisodes = require('../models/WatchedEpisodes');

module.exports = {
    findAllEpisodes: (req, res) => {
        WatchedEpisodes.findOne({
            where: {
                username: req.params.username
            }
        })
            .then(episodes => {
                res.json(episodes)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    addEpisodeToWatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.params.username } })

            if (episodeArray?.dataValues.watchedEpisodes !== null) {
                const newEpisodeArray = await WatchedEpisodes.update(
                    {
                        watchedEpisodes: [
                            {
                                id: req.params.EpisodeId,
                                title: req.params.Title,
                                poster_path: req.params.PosterPath
                            }
                        ]
                    },
                    { where: { username: req.params.username } }
                )

                return res.json(newEpisodeArray)

            } else if (episodeArray === null || episodeArray.dataValues?.watchedEpisodes === null) {
                let newEpisodeArray = await WatchedEpisodes.create({
                    username: req.params.uaername,
                    watchedEpisodes: [
                        {
                            id: req.params.EpisodeId,
                            title: req.params.Title,
                            poster_path: req.params.PosterPath
                        }
                    ]
                })

                return res.json(newEpisodeArray)

            } else {
                let newEpisodeArray = episodeArray.dataValues.watchedEpisodes
                if (newEpisodeArray?.some(e => e.id === req.params.EpisodeId)) {
                    return res.status(400).json({ message: 'This episode is already in your watched episodes list!' })
                } else {
                    const newEpisode = {
                        id: req.params.EpisodeId,
                        title: req.params.Title,
                        poster_path: req.params.PosterPath
                    }

                    newEpisodeArray.push(newEpisode)

                    WatchedEpisodes.update(
                        { watchedEpisodes: newEpisodeArray },
                        { where: { username: req.params.username } }
                    )
                }
            }

        } catch (err) {
            res.status(500).json(err)
        }
    },

    removeEpisodeFromWatched: async (req, res) => {

    }
}