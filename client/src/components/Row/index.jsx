import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './Row.css'
import Details from '../Details';

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
        if (!currentMovie) {
            setCurrentMovie([])
        } else {
            setCurrentMovie(movie)
        }
        console.log(currentMovie)
    };

    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => (
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
                ))}
            </div>
            <div className="row-description">
                {currentMovie && <Details key={currentMovie.id} movie={currentMovie} />}
            </div>
        </div>
    );
};

export default Row;
