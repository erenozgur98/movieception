const router = require('express').Router();
const Favorite = require('../../models/Favorite');

// Getting movie - show information to be added to favorites, by movieId
router.post('/', async (req, res) => {
    await Favorite.find({"movieId": req.body.movieId})
        .then((err, favorite) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ Message: "Success", favorite: favorite.length })
        })
});

// Added to Favorite
router.post('/added', async (req, res) => {
    await Favorite.find({"movieId": req.body.movieId, "userId": req.body.userId})
        .then((err, favorite) => {
            if (err) return res.status(400).send(err)
            
            let result = false;
            if (favorite.length !== 0) {
                result = true
            };

            res.status(200).json({ message: "Success" })
        })
});

module.exports = router;