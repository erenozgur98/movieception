import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
import YouTube from 'react-youtube';
import "./MoviePage.css"

function MoviePage() {
    const [movie, setMovie] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerUrl, setTrailerUrl] = useState('');
    const { MovieId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneMovie, will be set later
        const fetchData = async () => {
            const request = await axios.get(`/movie/${MovieId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`movie/${MovieId}/external_ids?api_key=${apiKey}`);
            const requestVideos = await axios.get(`/movie/${MovieId}/videos?api_key=${apiKey}`)
            setMovie(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
        }
        fetchData();
    }, [MovieId])

    const addToFavorite = (movie) => {
        // just need the movie id to add to favorites, will work later.
        console.log(movie);
    }

    const playTrailer = () => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            setTrailerUrl(videos[0]?.key);
        }
    };

    const opts = {
        heigth: '390',
        width: '100%',
    };

    console.log(movie)

    return (
        <div>
            <Banner link={movie?.backdrop_path} title={movie?.original_title} />
            <Container>
                {/* banner, has movie's backdrop path */}
                {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}
                {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}
                {movie.poster_path ?
                    <div>
                        <div className='page-organization'>
                            <div>
                                <div className="poster-picture">
                                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie?.original_title} className='movie-poster' />
                                </div>
                                <div className='social-media-links'>
                                    <ExternalId externalId={externalId} />
                                </div>
                                <div className='favorite-btn'>
                                    <button onClick={() => addToFavorite(movie)} className='btn btn-warning'>Add To Favorite</button>
                                </div>
                            </div>
                            <div className="bottom-section">
                                <h2>{movie?.original_title}</h2>
                                <div>
                                    {/* imdb.png will come here, will fix the looks later */}
                                    <a href={`https://www.imdb.com/title/${movie?.imdb_id}/`} target="_blank" rel="noreferrer">
                                        <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                                        {/* IMDB */}
                                    </a>
                                </div>
                                <div className="movie-overview">
                                    <a href={movie?.homepage} target="_blank" rel="noreferrer">Homepage</a>
                                </div>
                                <div>
                                    {movie?.release_date ?
                                        <div>
                                            Release Date: {movie?.release_date}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {/* Genres: {movie?.genres.map(x => x.name)} */}
                                </div>
                                <div>
                                    {movie?.original_language === 'en' ?
                                        <div>
                                            Language: English
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {movie?.runtime ?
                                        <div>
                                            Runtime: {movie?.runtime} minutes
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {movie?.vote_average ?
                                        <div>
                                            Vote Average: {movie?.vote_average} / 10
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {movie?.budget ?
                                        <div>
                                            Budget: ${movie?.budget}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {movie?.revenue ?
                                        <div>
                                            Revenue: ${movie?.revenue}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    Country: {movie?.production_countries[0]?.name}
                                </div>
                                <div>
                                    {/* add logos to companies later */}
                                    Production Company: {movie?.production_companies[0]?.name}
                                </div>
                                <div>
                                    {/* maybe add this too? will consider */}
                                    {movie?.belongs_to_collection ?
                                        <div>
                                            Collection: {movie?.belongs_to_collection?.name}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {movie?.tagline ?
                                        <div>
                                            {movie?.tagline}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    {movie?.overview ?
                                        <div>
                                            {movie?.overview}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <button className='btn btn-danger' onClick={playTrailer}>Play Trailer</button>
                                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                            </div>
                        </div>
                        <WatchProviders movie={movie} />
                        <div>
                            <h4>Cast</h4>
                            <Credits movie={movie} />
                        </div>
                    </div>
                    :
                    <>
                        <Container>
                            Oops, something went wrong, go back to <a href='/movies'>movie</a> page
                        </Container>
                    </>
                }
            </Container>
        </div>
    )
}

export default MoviePage
