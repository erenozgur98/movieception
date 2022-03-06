import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
import "./MoviePage.css"
import Overview from '../../components/Overview';
import Recommendations from '../../components/Recommendations';
import API from '../../utils/API';
import styled from 'styled-components';
import Trailer from '../../components/Trailer';
import { useTitle } from '../../components/useTitle';
import Collections from '../../components/Collections';
import { useSnackbar } from 'notistack';

function MoviePage({ user }) {
    const [movie, setMovie] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerModal, setTrailerModal] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [watched, setWatched] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const [documentTitle, setDocumentTitle] = useTitle();
    const { MovieId } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        document.title = documentTitle ?? 'True Story';
    }, [documentTitle])

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/movie/${MovieId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestExternalId = await axios.get(`movie/${MovieId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestVideos = await axios.get(`/movie/${MovieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
            setMovie(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
            setDocumentTitle(request.data?.original_title || request.data?.title || request.data?.name)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = () => {
            if (user?.username) {
                API.getAllFavorites(user?.username)
                    .then(res => setFavorites(res.data?.Movie))
                    .catch(err => console.log(err))
            }
        }
        fetchData()
    }, [user])

    useEffect(() => {
        const fetchData = () => {
            if (user?.username) {
                API.getAllWatchList(user?.username)
                    .then(res => {
                        setWatchList(res.data?.Movie)
                    })
            }
        }
        fetchData()
    }, [user])

    useEffect(() => {
        const fetchData = () => {
            if (user?.username) {
                API.getAllWatched(user?.username)
                    .then(res => {
                        setWatched(res.data?.Movie)
                    })
            }
        }
        fetchData()
    }, [user])

    const addToFavorite = (movie) => {
        API.addMovieToFavorite(user?.username, movie?.id).then(res => {
            if (res.status === 200) {
                enqueueSnackbar('The Movie has been successfully added to your favorites', {
                    variant: 'success'
                })
                setFavorites(res.data)
            } else {
                console.log('Soemthing went wrong')
            }
        })
    }

    const removeFromFavorites = (movie) => {
        API.removeMovieFromFavorites(user?.username, movie?.id).then(res => {
            if (res.status === 200) {
                enqueueSnackbar('The Movie has been successfully removed from your favorites', {
                    variant: 'success'
                })
                setFavorites(res.data);
            } else {
                console.log('Something went wrong')
            }
        })
    }

    const addToWatchList = (movie) => {
        API.addMovieToWatchList(user?.username, movie?.id).then(res => {
            if (res.status === 200) {
                enqueueSnackbar('The Movie has been successfully added to your watch list', {
                    variant: 'success'
                })
                setWatchList(res.data)
            } else {
                console.log('Soemthing went wrong')
            }
        })
    }

    const removeFromWatchList = (movie) => {
        API.removeMovieFromWatchList(user?.username, movie?.id).then(res => {
            if (res.status === 200) {
                enqueueSnackbar('The Movie has been successfully removed from your watch list', {
                    variant: 'success'
                })
                setWatchList(res.data);
            } else {
                console.log('Something went wrong')
            }
        })
    }

    const addToWatchedHistory = (movie) => {
        API.addMovieToWatched(user?.username, movie?.id)
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar('The Movie has been successfully added to your watched history', {
                        variant: 'success'
                    })
                    setWatched(res.data)
                } else {
                    console.log('Something went wrong')
                }
            })
    }

    const removeFromWatchedHistory = (movie) => {
        API.removeMovieFromWatched(user?.username, movie?.id).then(res => {
            if (res.status === 200) {
                enqueueSnackbar('The Movie has been successfully removed from your watched history', {
                    variant: 'success'
                })
                setWatched(res.data)
            } else {
                console.log('Something went wrong')
            }
        })
    }

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 25rem;
        @media (max-width: 1048px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `

    const StyledContainer = styled(Container)`
        display: flex;
        @media (max-width: 1048px) {
            flex-direction: column;
        }
    `

    const StyledImg = styled.img`
        max-width: 324px;
        margin-bottom: 1rem;
        border-radius: 3rem;
    `

    const StyledOverviewDiv = styled.div`
        padding-left: 2rem;
        margin-top: 10rem;
        @media (max-width: 1048px) {
            margin-top: 0;
            padding-left: 0;
        }
    `

    const StyledLeftSide = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
    `

    return (
        <div>
            <Banner link={movie?.backdrop_path} />
            <StyledMainContainer>
                <StyledContainer>
                    <StyledLeftSide>
                        <div>
                            <div>
                                <StyledImg
                                    src={
                                        `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                                    }
                                    alt={movie?.original_title}
                                />
                            </div>
                            <WatchProviders movie={movie} />
                            <div className='social-media-links'>
                                <ExternalId externalId={externalId} link={movie} />
                            </div>
                        </div>
                        <div className="buttons">
                            {user?.username && <div className='favorite-btn'>
                                {favorites?.includes(movie.id) ?
                                    (
                                        <button
                                            onClick={() => removeFromFavorites(movie)}
                                            className='btn btn-success'
                                        >
                                            Remove From Favorites
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToFavorite(movie)}
                                            className='btn btn-success'
                                        >
                                            Add To Favorites
                                        </button>
                                    )
                                }
                            </div>}
                            {user?.username && <div className='favorite-btn'>
                                {watchList?.includes(movie.id) ?
                                    (
                                        <button
                                            onClick={() => removeFromWatchList(movie)}
                                            className='btn btn-warning'
                                        >
                                            Remove From Watch List
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToWatchList(movie)}
                                            className='btn btn-warning'
                                        >
                                            Add To Watch List
                                        </button>
                                    )
                                }
                            </div>}
                            {user?.username && <div className='favorite-btn'>
                                {watched?.includes(movie.id) ?
                                    (
                                        <button
                                            onClick={() => removeFromWatchedHistory(movie)}
                                            className='btn btn-danger'
                                        >
                                            Remove From Watched History
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToWatchedHistory(movie)}
                                            className='btn btn-danger'
                                        >
                                            Add to Watched History
                                        </button>
                                    )
                                }
                            </div>}
                        </div>
                    </StyledLeftSide>
                    <StyledOverviewDiv>
                        <Overview link={movie} />
                        <div
                            style={{ textAlign: 'center', marginTop: '2rem' }}
                        >
                            <button
                                onClick={() => setTrailerModal(true)}
                                className='btn btn-success'
                            >
                                Watch Trailer
                            </button>
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '2rem',
                                textDecoration: 'underline',
                                fontSize: '1.3rem'
                            }}
                        >
                            The cast of {movie?.original_title}
                        </div>
                        <Credits movie={movie} />
                        <Collections CollectionId={movie?.belongs_to_collection?.id} />
                        <Recommendations movie={movie} />
                    </StyledOverviewDiv>
                </StyledContainer>
                <Trailer
                    videos={videos}
                    show={trailerModal}
                    handleClose={() => setTrailerModal(false)}
                />
            </StyledMainContainer>
        </div>
    )
}

export default MoviePage
