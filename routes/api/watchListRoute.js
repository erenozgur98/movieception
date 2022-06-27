const router = require('express').Router();
const watchListController = require('../../controllers/watchListController');

router.route('/:username').get(watchListController.findAllWatchList);

router.route('/:username/movies/:MovieId/:PosterPath/title/:Title').post(watchListController.addMovieToWatchList);
router.route('/:username/shows/:ShowId/:PosterPath/title/:Title').post(watchListController.addShowToWatchList);

router.route('/:username/movies/:MovieId').delete(watchListController.deleteMovieFromWatchList);
router.route('/:username/shows/:ShowId').delete(watchListController.deleteShowFromWatchList);

module.exports = router;