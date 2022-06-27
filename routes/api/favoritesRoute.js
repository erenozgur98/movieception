const router = require('express').Router();
const favoritesController = require('../../controllers/FavoritesController');

router.route('/:username').get(favoritesController.findAllFavorites);

router.route('/:username/movies/:MovieId/:PosterPath/title/:Title').post(favoritesController.addMovieToFavorite);
router.route('/:username/shows/:ShowId/:PosterPath/title/:Title').post(favoritesController.addShowToFavorite);

router.route('/:username/movies/:MovieId').delete(favoritesController.deleteMovieFromFavorites);
router.route('/:username/shows/:ShowId').delete(favoritesController.deleteShowFromFavorites);

module.exports = router;