import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
// import YouTube from 'react-youtube';
import "./MoviePage.css"
import Overview from '../../components/Overview';
import Recommendations from '../../components/Recommendations';
import API from '../../utils/API';
import styled from 'styled-components';
import Trailer from '../../components/Trailer';

function MoviePage({ user }) {
    const [movie, setMovie] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerModal, setTrailerModal] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [watched, setWatched] = useState([]);
    const { MovieId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/movie/${MovieId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`movie/${MovieId}/external_ids?api_key=${apiKey}`);
            const requestVideos = await axios.get(`/movie/${MovieId}/videos?api_key=${apiKey}`)
            setMovie(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
        }
        fetchData();
        document.title = `${movie?.original_title || movie?.title || movie?.name}`;
    }, [MovieId])

    useEffect(() => {
        API.getAllFavorites(user?.username)
            .then(res => setFavorites(res.data?.movieFavorites))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        API.getAllWatched(user?.username)
            .then(res => {
                setWatched(res?.data[0]?.watchedMovies)
            })
    }, [])

    const addToFavorite = (movie) => {
        API.addMovieToFavorite(user?.username, movie?.id).then(res => {
            // add snackbar
            console.log(res)
            if (res.status === 200) {
                console.log('Successfull');
                setFavorites(res?.data?.movieFavorites)
            } else {
                console.log('Soemthing went wrong')
            }
        })
    }

    const removeFromFavorites = (movie) => {
        API.removeMovieFromFavorites(user?.username, movie?.id).then(res => {
            // add snackbar
            console.log(res)
            if (res.status === 200) {
                console.log('Successfull')
                setFavorites(res?.data?.movieFavorites);
            } else {
                console.log('Something went wrong')
            }
        })
    }

    const addToWatchedList = (movie) => {
        API.addMovieToWatched(user?.username, movie?.id)
            .then(res => {
                console.log(res)
            })
    }

    const removeFromWatchedList = (movie) => {
        API.removeMovieFromWatched(user?.username, movie?.id).then(res => {
            // add snackbar
            console.log(res)
            if (res.status === 200) {
                console.log('Successfull')
                setWatched(res?.data?.watchedMovies)
            } else {
                console.log('Something went wrong')
            }
        })
    }

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 22rem;
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
                                            className='btn btn-warning'
                                        >
                                            Remove From Favorites
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToFavorite(movie)}
                                            className='btn btn-warning'
                                        >
                                            Add To Favorites
                                        </button>
                                    )
                                }
                            </div>}
                            {user?.username && <div className='favorite-btn'>
                                {watched?.includes(movie.id) ?
                                    (
                                        <button
                                            onClick={() => removeFromWatchedList(movie)} 
                                            className='btn btn-danger'
                                        >
                                            Remove From Watched List
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToWatchedList(movie)}
                                            className='btn btn-danger'
                                        >
                                            Add to Watched List
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
