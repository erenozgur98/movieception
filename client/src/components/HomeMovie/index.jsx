import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './HomeMovie.css'

function HomeMovie({ fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(0);

    const history = useHistory();
    const base_url = 'https://image.tmdb.org/t/p/w300/';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = () => {
        history.push(`/movies/${movies[count].id}`);
    };

    return (
        <div className='home-movie'>
            {/* <div
                className='home-movie-background'
                style={{ backgroundImage: `url(${base_url}${movies[count]?.backdrop_path})` }}
            > */}
                <img
                    onClick={handleClick}
                    className='home-movie-poster'
                    src={movies[count]?.poster_path ?
                        `${base_url}${movies[count]?.poster_path}`
                        :
                        "https://via.placeholder.com/300"
                    }
                    alt={movies[count]?.name}
                />
                <div onClick={() => setCount(count + 1)}>ARROW +</div>
                <div onClick={() => setCount(count - 1)}>ARROW -</div>
            {/* </div> */}
        </div>
    );
};

export default HomeMovie;
