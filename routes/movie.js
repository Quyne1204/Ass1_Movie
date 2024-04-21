const path = require('path');

const express = require('express');

const movie = require('../controllers/movie');

const router = express.Router();

router.get('/trending',movie.trending);
router.get('/top-rate',movie.top_rate);
router.get('/discover',movie.getGenre);
router.post('/video',movie.getTrailer);
router.post('/search',movie.getSearch);
router.get('/listMovieTv',movie.getTivi);


module.exports = router;