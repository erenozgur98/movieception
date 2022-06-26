const router = require('express').Router();
const favoritesController = require('../../controllers/FavoritesController');

router.route('/:username').get(favoritesController.findAllFavorites);

router.route('/:username/movies/:MovieId/:PosterPath/title/:Title').post(favoritesController.addMovieToFavorite);
router.route('/:username/shows/:ShowId/:PosterPath/title/:Title').post(favoritesController.addShowToFavorite);

// router.route('/movies/:MovieId').delete(favoritesController.deleteMovieFromFavorite);
// router.route('/shows/:ShowId').delete(favoritesController.deleteShowFromFavorite);

module.exports = router;