import React, { useEffect, useState } from 'react'
import API from '../../utils/API';
import axios from '../Axios';
import './Row.css'
import HeartIcon from '../Icons/heart';
import HistoryIcon from '../Icons/history';
import WatchListIcon from '../Icons/watchList';
import { base_url } from '../../utils/helper';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { Pagination, CircularProgress } from '@mui/material';

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});

    const isMovie = window.location.href.includes('movies')
    const isShow = window.location.href.includes('shows')
    const url = window.location.href.split('?')[0]

    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page');

    const StyledPagination = styled(Pagination)(({ theme }) => ({
        '& .MuiPagination-ul': {
            backgroundColor: '#fff',
            padding: '0.3rem',
            borderRadius: '1rem'
        }
    }));

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
            if (page) setCurrentPage(page);
            const request = await axios.get(`${fetchUrl}&page=${currentPage}`);
            setMovies(request?.data?.results);
            setLoading(false);
        }
        fetchData();
    }, [fetchUrl, currentPage, page]);

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

    const handleChange = event => {
        window.location.assign(`${url}?page=${event.target.textContent}`)
    }

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
                    <div className='pagination'>
                        <StyledPagination
                            count={50}
                            color='primary'
                            shape="rounded"
                            hidePrevButton
                            hideNextButton
                            onChange={handleChange}
                            page={JSON.parse(currentPage)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Row;
