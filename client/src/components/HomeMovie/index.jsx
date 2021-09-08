import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './HomeMovie.css'

function HomeMovie({ fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(20);

    const history = useHistory();
    const base_url = 'https://image.tmdb.org/t/p/w300/';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`${fetchUrl}&page=${currentPage}`)
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl, currentPage]);

    const handleClick = () => {
        history.push(`/movies/${currentMovies[count].id}`);
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <div className='home'>
            <div>#{count + 1} of Top 10 Movies</div>
            <div className='home-movie'>
                <div onClick={() => count >= 1 ? setCount(count - 1) : setCount(count)}><i className="arrow fas fa-angle-left"></i></div>
                <img
                    onClick={handleClick}
                    className='home-movie-poster'
                    src={currentMovies[count]?.poster_path ?
                        `${base_url}${currentMovies[count]?.poster_path}`
                        :
                        "https://via.placeholder.com/300"
                    }
                    alt={currentMovies[count]?.name}
                />
                {/* less than 9 because 0 is the starting index */}
                <div onClick={() => count < 9 ? setCount(count + 1) : setCount(count)}><i className="arrow fas fa-angle-right"></i></div>
            </div>
        </div>
    );
};

export default HomeMovie;
