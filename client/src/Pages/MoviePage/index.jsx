import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
import YouTube from 'react-youtube';
import "./MoviePage.css"
import Overview from '../../components/Overview';
import Recommendations from '../../components/Recommendations';
import API from '../../utils/API';
import styled from 'styled-components';

function MoviePage({ user }) {
    const [movie, setMovie] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerUrl, setTrailerUrl] = useState('');
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

    const playTrailer = () => {
        const trailerVideos = videos.filter(e => e.type === 'Trailer')
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            setTrailerUrl(trailerVideos[0]?.key);
        }
    };

    const opts = {
        heigth: '390',
        width: '100%',
        // playerVars: {
        //     autoplay: 1,
        // }
    };

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 22rem;
    `

    const StyledContainer = styled(Container)`
        display: flex;
    `

    const StyledImg = styled.img`
        max-width: 324px;
        padding-bottom: 1rem;
        border-radius: 32px;
    `

    const StyledOverviewDiv = styled.div`
        padding-left: 2rem;
        margin-top: 10rem;
    `

    return (
        <div>
            <Banner link={movie?.backdrop_path} />
            <StyledMainContainer>
                <StyledContainer>
                    <div>
                        <div>
                            <StyledImg
                                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                                alt={movie?.original_title}
                            />
                        </div>
                        <div className='social-media-links'>
                            <ExternalId externalId={externalId} link={movie} />
                        </div>
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
                                        onClick={() => removeFromWatchedList(movie)} className='btn btn-danger'
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
                                        Add To Watched List
                                    </button>
                                )
                            }
                        </div>}
                    </div>
                    <StyledOverviewDiv>
                        <Overview link={movie} />
                    </StyledOverviewDiv>
                    {/* <button style={{ color: 'green' }} onClick={addToWatchedList}>Add To Watched List</button> */}
                </StyledContainer>
            </StyledMainContainer>
            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}
            {/* <Container>
                {movie.poster_path ?
                    <div>
                        <div className='page-organization'>
                            <div>
                                <div className="poster-picture">
                                    <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt={movie?.original_title} className='movie-poster' />
                                </div>
                                <div className='social-media-links'>
                                    <ExternalId externalId={externalId} />
                                </div>
                                {user?.username && <div className='favorite-btn'>
                                    {favorites?.includes(movie.id) ?
                                        (
                                            <button onClick={() => removeFromFavorites(movie)} className='btn btn-warning'>Remove From Favorites</button>
                                        )
                                        :
                                        (
                                            <button onClick={() => addToFavorite(movie)} className='btn btn-warning'>Add To Favorites</button>
                                        )
                                    }
                                </div>}
                            </div>
                            <div className="bottom-section">
                                <Overview link={movie} />
                                <button className='btn btn-danger' onClick={playTrailer}>Play Trailer</button>
                                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                            </div>
                        </div>
                        <WatchProviders movie={movie} />
                        <div>The cast of {movie?.original_title}:</div>
                        <Credits movie={movie} />
                        <Recommendations movie={movie} />
                    </div>
                    :
                    <>
                        <Container style={{ textAlign: 'center', paddingTop: '70px' }}>
                            Oops, something went wrong, go back to <a href='/movies'>movie</a> or <a href='/'>home</a> page
                        </Container>
                    </>
                }
            </Container> */}
        </div>
    )
}

export default MoviePage
