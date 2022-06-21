import React, { useEffect, useState } from 'react'
import API from '../../utils/API';
import axios from '../Axios';
import './Row.css'
import HeartIcon from '../Icons/heart';
import HistoryIcon from '../Icons/history';
import WatchListIcon from '../Icons/watchList';
import CircularProgress from '@mui/material/CircularProgress';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});

    const isMovie = window.location.href.includes('movies')
    const isShow = window.location.href.includes('shows')

    useEffect(() => {
        if (!user.username) {
            API.loggedIn()
                .then(result => {
                    setUser(result.data)
                })
        }
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(`${fetchUrl}&page=${currentPage}`);
            setMovies(request?.data?.results);
            setLoading(false);
        }
        fetchData();
    }, [fetchUrl, currentPage]);

    const handleClick = (movie) => {
        if (movie.media_type === 'tv') {
            window.location.assign(`/shows/${movie.id}`);
        } else if (movie.media_type === 'movie') {
            window.location.assign(`/movies/${movie.id}`);
        } else if (movie.media_type === 'person') {
            window.location.assign(`/actors/${movie.id}`);
        }

        if (isMovie) {
            window.location.assign(`/movies/${movie.id}`)
        } else if (isShow) {
            window.location.assign(`/shows/${movie.id}`)
        }
    };

    return (
        <>
            {loading ? (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10rem'
                }}>
                    <CircularProgress size={70} />
                </div>
            ) : (
                <div className='row'>
                    <h2 className='row-title'>{title}</h2>
                    <div
                        className="row-posters"
                    >
                        {movies.map((movie, key) => (
                            (movie?.poster_path || movie?.backdrop_path || movie?.profile_path) &&
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
                                {movie.media_type === 'person' ? (
                                    <div>
                                        {movie.name}
                                    </div>
                                ) : (
                                    <div className='icon-container'>
                                        <HistoryIcon
                                            movie={movie}
                                            user={user}
                                        />
                                        <HeartIcon
                                            movie={movie}
                                            user={user}
                                        />
                                        <WatchListIcon
                                            movie={movie}
                                            user={user}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Will be implemented later */}
                    {/* find a way to add the &page=? to the link instead of here, because whenever you go back the page number is going to be resetted to 1 */}
                    {/* <div className='movie-btn'>
                {currentPage !== 1 &&
                    <button
                        className='movie-buttons'
                        onClick={() => currentPage <= 1 ? setCurrentPage(currentPage) : setCurrentPage(currentPage - 1)}
                    >
                        Previous Page
                    </button>
                }
                Page: {currentPage}
                {currentPage !== 10 &&
                    <button
                        className='movie-buttons'
                        onClick={() => currentPage >= 10 ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1)}
                    >
                        Next Page
                    </button>
                }
            </div> */}
                </div>
            )}
        </>
    );
};

export default Row;
