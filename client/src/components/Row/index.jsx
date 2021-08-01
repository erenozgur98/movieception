import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './Row.css'

const base_url = 'https://image.tmdb.org/t/p/original/'; // change original to w200

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => (
                    <img 
                        key={movie.id}
                        className='row-poster'
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Row
