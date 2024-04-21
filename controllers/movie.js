const GenreList = require('../models/GenreList');
const genreList = require('../models/GenreList');
const Movies = require('../models/Movie');
const Videos = require('../models/VideoList');
const paging = require('../utils/paging');

//4. Top trending
exports.trending = (req, res, next) => {
    const movies = Movies.all();
    const newMovies = movies.sort((a, b) => b.popularity - a.popularity);
    const page = req.query.page || 1;
    const results = paging(newMovies, 20, page);
    const total_pages = Math.ceil(newMovies.length / 20);
    res.status(200).json(
        {
            results,
            page,
            total_pages
        }
    );
}
//5. Top rate
exports.top_rate = (req, res, next) => {
    const movies = Movies.all();
    const newMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
    const page = req.query.page || 1;
    const results = paging(newMovies, 20, page);
    const total_pages = Math.ceil(newMovies.length / 20);
    res.status(200).json(
        {
            results,
            page,
            total_pages
        }
    );


}
//6. Search Genre List
exports.getGenre = (req, res, next) => {
    const movies = Movies.all();
    const page = req.query.page || 1;
    const genre = req.query.genre;
    if (!genre) {
        res.status(400).json({ message: "Not found gerne parram" });
    }
    const genreList = GenreList.all();
    const checkGenre = genreList.find(item => item.id === +genre);

    if (!checkGenre) {
        res.status(400).json({ message: "Not found that gerne id" });
    }

    const newMovies = movies.filter(item => item.genre_ids.includes(+genre));
    console.log(newMovies);
    const results = paging(newMovies, 20, page);
    const total_pages = Math.ceil(newMovies.length / 20);
    const genre_name = checkGenre.name;
    res.status(200).json(
        {
            results,
            page,
            total_pages,
            genre_name
        }
    );
}
//7. Post Search Trailer
exports.getTrailer = (req, res, next) => {
    const videos = Videos.all();
    const film_id = req.body.film_id;

    if (!film_id) {
        res.status(400).json({ message: "Not found film_id parram" });
    }

    const checkVideo = videos.find(item => item.id === +film_id);

    if (!checkVideo) {
        res.status(404).json({ message: "Not found video" });
    }

    const video = checkVideo.videos.filter(item => item.official === true)
        .filter(item => item.site === "YouTube")
        .filter(item => item.type !== "Trailer")
    if (!video) {
        video = checkVideo.videos.filter(item => item.official === true)
            .filter(item => item.site === "YouTube")
            .filter(item => item.type !== "Teaser")
    }
    if (video.length > 0) {
        video.sort((a, b) => b.published_at - a.published_at);
    }
    if (!video) {
        res.status(404).json({ message: "Not found video" });
    }

    res.status(200).json({
        results: video[0],
    })
}
//8. Post Search overview or title
exports.getSearch = (req, res, next) => {
    const movies = Movies.all();
    const keyword = req.body.keyword;

    if (!keyword) {
        res.status(400).json({ message: "Not found keyword parram" });
    }

    const movie = movies.filter(item => item.overview.toLowerCase().includes(keyword.toLowerCase())) ||  
                movies.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));

    if (!movie) {
        res.status(404).json({ message: "Not found video" });
    }

    const page = req.query.page || 1;
    const results = paging(movie, 20, page);
    const total_pages = Math.ceil(movie.length / 20);
    res.status(200).json(
        {
            results,
            page,
            total_pages
        }
    );
}

exports.getTivi = (req, res, next) => {
    const movies = Movies.all();
    const newMovies = movies.filter(item=>item.media_type === "tv");
    const page = req.query.page || 1;
    const results = paging(newMovies, 20, page);
    const total_pages = Math.ceil(newMovies.length / 20);
    res.status(200).json(
        {
            results,
            page,
            total_pages
        }
    );
}