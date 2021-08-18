import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './Row.css'
import Details from '../Details';
import { Container } from 'react-bootstrap';

const base_url = 'https://image.tmdb.org/t/p/original/'; // change original to w200 or w300

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setCurrentMovie(movie)
        console.log(currentMovie);
    };

    const handleClose = () => {
        setCurrentMovie(null)
        console.log(currentMovie)
    };

    const addToFavorite = (movie) => {
        console.log(movie)
    };

    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => (
                    <div>
                        <img
                            key={movie?.id}
                            onClick={() => handleClick(movie)}
                            className='row-poster'
                            src={
                                movie?.poster_path ?
                                    `${base_url}${movie?.poster_path}`
                                    :
                                    "https://via.placeholder.com/300"
                            }
                            alt={movie?.name}
                        />
                        <i onClick={() => addToFavorite(movie)} class="fas fa-heart"></i>
                    </div>
                ))}
            </div>
            <div className="row-description">
                {currentMovie && <Details key={currentMovie.id} movie={currentMovie} handleClose={handleClose} />}
            </div>
        </div>
    );
};

export default Row;
