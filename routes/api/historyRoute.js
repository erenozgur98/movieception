const router = require('express').Router();
const historyController = require('../../controllers/historyController');

router.route('/:username/watched').get(historyController.findAllHistory);

router.route('/:username/watched/movies/:MovieId/:PosterPath/title/:Title').post(historyController.addMovieToHistory);
router.route('/:username/watched/shows/:ShowId/:PosterPath/title/:Title').post(historyController.addShowToHistory);

router.route('/:username/watched/movies/:MovieId').delete(historyController.deleteMovieFromHistory);
router.route('/:username/watched/shows/:ShowId').delete(historyController.deleteShowFromHistory);

module.exports = router;