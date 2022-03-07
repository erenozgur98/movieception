import React, { useEffect, useState } from 'react'
import Heart from 'react-heart';
import API from '../../utils/API';
import axios from '../Axios';
import { useSnackbar } from 'notistack'
import './Row.css'

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([]);
    const [, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});
    const [active, setActive] = useState(false);
    const [favoriteKey, setFavoriteKey] = useState();
    const { enqueueSnackbar } = useSnackbar();

    const isMovie = window.location.href.includes('movies')
    const isShow = window.location.href.includes('shows')

    useEffect(() => {
        API.loggedIn()
            .then(result => {
                setUser(result.data)
            })
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

    const addToFavorite = (movie) => {
        setActive(!active);
        // setActive(favoriteKey === movie.id && !active);
        if (user.username) {
            // API.add
        } else {
            enqueueSnackbar('You are not logged in!', {
                variant: 'warning'
            })
        }
        console.log(movie.id)
    };

    return (
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
                        <div className='icon-container'>
                            <Heart
                                key={key}
                                isActive={user?.username ? active : false}
                                animationScale={2}
                                animationDuration={0.10000}
                                inactiveColor={'white'}
                                className='icon'
                                onClick={() => {
                                    setFavoriteKey(key)
                                    addToFavorite(movie)
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='movie-btn'>
                {/* find a way to add the &page=? to the link instead of here, because whenever you go back the page number is going to be resetted to 1 */}
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
            </div>
        </div>
    );
};

export default Row;
