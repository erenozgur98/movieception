import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';
import axios from '../../components/Axios';
import "./MoviePage.css"

function MoviePage() {
    const [movie, setMovie] = useState({});
    const { MovieId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneMovie, will be set later
        const fetchData = async () => {
            const request = await axios.get(`/movie/${MovieId}?api_key=${apiKey}`);
            setMovie(request.data)
        }
        fetchData();
    }, [MovieId])

    console.log(movie)

    return (
        <div>
            {/* banner, has movie's backdrop path */}

            {/* actual movie picture */}
            {/* make the movie picture sticky after scroll? will look into that later when styling */}

            {/* under movie picture external id's eg FB link, IG link, twitter link */}

            {/* link to where to watch the movie */}

            {/* movie title */}

            {/* Release date, country, language, genres */}

            {/* movie description */}

            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}

            {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}

            {/* actors, with names */}
            <section className="top-section">
                <div className="background-picture">
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="movie-poster" className='movie-background' />
                </div>
                <div className="poster-picture">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="black-widow" className='movie-poster' />
                    <h2>{movie.original_title}</h2>
                </div>
            </section>
            <section className="bottom-section">
                <div className="movie-overview">
                    <div>
                        <a href={movie?.homepage}>Homepage</a>
                    </div>
                    <div>
                        Release Date: {movie?.release_date}
                    </div>
                    <div>
                        Genres: {movie?.genres.map(x => x.name)}
                    </div>
                    <div>
                        Language: {movie?.original_language}
                    </div>
                    <div>
                        Spoken Languages: {movie?.spoken_languages.map(x => x.english_name)}
                    </div>
                    <div>
                        Runtime: {movie?.runtime} minutes
                    </div>
                    <div>
                        Vote Average: {movie?.vote_average} / 10
                    </div>
                    <div>
                        Budget: {movie?.budget}
                    </div>
                    <div>
                        Revenue: {movie?.revenue}
                    </div>
                    <div>
                        Country: {movie?.production_countries.map(x => x.name)}
                    </div>
                    <div>
                        {/* add logos to companies later */}
                        Production Companies: {movie?.production_companies.map(x => x.name)}
                    </div>
                    <div>
                        {/* maybe add this too? will consider */}
                        {/* {movie?.belongs_to_collection} */}
                    </div>
                    <div>
                        {movie?.tagline}
                    </div>
                    <div>
                        {movie?.overview}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MoviePage
