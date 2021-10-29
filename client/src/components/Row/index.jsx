import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import axios from '../Axios';
import moviesGenre from './moviesGenre';
import showsGenre from './showsGenre';
import './Row.css'

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
        console.log(movie)
        if (movie.media_type === 'tv') {
            history.push(`/shows/${movie.id}`);
        } else if (movie.media_type === 'movie') {
            history.push(`/movies/${movie.id}`);
        } else if (movie.media_type === 'person') {
            history.push(`/actors/${movie.id}`);
        } else {
            history.push('/');
        }
    };

    const addToFavorite = (movie) => {
        console.log(movie)
    };

    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>
            <div className='movie-btn'>
                <DropdownButton variant='secondary' title="Movies Genres">
                    {moviesGenre.map(g => (
                        <Dropdown.Item href={g.route}>{g.title}</Dropdown.Item>
                    ))}
                </DropdownButton>
                <DropdownButton variant='secondary' title="Shows Genres">
                    {showsGenre.map(g => (
                        <Dropdown.Item href={g.route}>{g.title}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <div className="row-posters">
                {movies.map((movie) => (
                    movie?.poster_path || movie?.backdrop_path ?
                        <div className="row-map" key={movie?.id}>
                            <img
                                onClick={() => handleClick(movie)}
                                className='row-poster skeleton'
                                src=
                                {
                                    movie?.poster_path ||
                                        movie?.backdrop_path ||
                                        movie?.profile_path ?
                                        `${base_url}${movie?.poster_path ||
                                        movie?.backdrop_path ||
                                        movie?.profile_path}`
                                        :
                                        "https://via.placeholder.com/300"
                                }
                                alt={movie?.name}
                            />
                            <i onClick={() => addToFavorite(movie)} className="fas fa-heart"></i>
                        </div>
                        :
                        null
                ))}
            </div>
            <div className='movie-btn'>
                {/* find a way to add the &page=? to the link instead of here, because whenever you go back the page number is going to be resetted to 1 */}
                {currentPage !== 1 ?
                    <button
                    className='movie-buttons'
                    onClick={() => currentPage <= 1 ? setCurrentPage(currentPage) : setCurrentPage(currentPage - 1)}
                    >
                        Previous Page
                    </button>
                    :
                    null
                }
                Page: {currentPage}
                {currentPage !== 10 ?
                    <button
                        className='movie-buttons'
                        onClick={() => currentPage >= 10 ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1)}
                    >
                        Next Page
                    </button>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default Row;
