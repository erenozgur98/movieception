import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './Row.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);
    const [, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(`${fetchUrl}&page=${currentPage}`);
            setMovies(request.data.results);
            setLoading(false);
        }
        fetchData();
    }, [fetchUrl, currentPage]);

    const handleClick = (movie) => {
        if (movie.media_type === 'tv') {
            history.push(`/shows/${movie.id}`)
        } else if (movie.media_type === 'movie') {
            history.push(`/movies/${movie.id}`)
        } else {
            history.push(`/actors/${movie.id}`)
        }
    };

    const changeToMovieOrShow = (name) => {
        if (name === 'movie') {
            history.push('/discover/movies');
        } else {
            history.push('/discover/shows');
        }
    }

    const addToFavorite = (movie) => {
        console.log(movie)
    };

    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>
            <div className='movie-btn'>
                <button className='movie-buttons' onClick={() => changeToMovieOrShow('movie')}>Movies Only</button>
                <button className='movie-buttons' onClick={() => changeToMovieOrShow('show')}>Shows Only</button>
            </div>
            <div className="row-posters">
                {movies.map((movie) => (
                    <div className="row-map" key={movie?.id}>
                        <img
                            onClick={() => handleClick(movie)}
                            className='row-poster skeleton'
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
            <div className='movie-btn'>
                {/* find a way to add the &page=? to the link instead of here, because whenever you go back the page number is going to be resetted to 1 */}
                You are at page: {currentPage}
                {currentPage !== 1 ?
                    <button className='movie-buttons' onClick={() => currentPage <= 1 ? setCurrentPage(currentPage) : setCurrentPage(currentPage - 1)}>Previous Page</button>
                    :
                    null
                }
                {currentPage !== 10 ?
                    <button className='movie-buttons' onClick={() => currentPage >= 10 ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1)}>Next Page</button>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default Row;
