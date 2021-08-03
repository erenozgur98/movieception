import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './Row.css'
import Details from '../Details';

const base_url = 'https://image.tmdb.org/t/p/original/'; // change original to w200

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        console.log(movie);
    };

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className='row-poster'
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.name}
                    />
                        // <Details movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Row
