import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
// import { Container } from 'react-bootstrap';
import './Row.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);
    const [, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(5);

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            setLoading(false);
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies)

    const handleClick = (movie) => {
        if (movie.media_type === 'tv') {
            history.push(`/shows/${movie.id}`)
        } else if(movie.media_type === 'movie') {
            history.push(`/movies/${movie.id}`)
        } else {
            history.push(`/actors/${movie.id}`)
        }
    };

    const addToFavorite = (movie) => {
        console.log(movie)
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    console.log(currentMovies);

    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => (
                    <div className="row-map" key={movie?.id}>
                        <img
                            onClick={() => handleClick(movie)}
                            className='row-poster'
                            src={
                                movie?.poster_path || movie?.backdrop_path || movie?.profile_path ?
                                    `${base_url}${movie?.poster_path || movie?.backdrop_path || movie?.profile_path}`
                                    :
                                    "https://via.placeholder.com/300"
                            }
                            alt={movie?.name}
                        />
                        <i onClick={() => addToFavorite(movie)} className="fas fa-heart"></i>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Row;
