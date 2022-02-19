import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios'
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
import '../MoviePage/MoviePage.css';
import Overview from '../../components/Overview';
import Recommendations from '../../components/Recommendations';
import Seasons from '../../components/Seasons';
import API from '../../utils/API';
import styled from 'styled-components';
import Trailer from '../../components/Trailer';
import { useTitle } from '../../components/useTitle';

function ShowPage({ user }) {
    const [, setLoading] = useState(false);
    const [show, setShow] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerModal, setTrailerModal] = useState(false);
    const [documentTitle, setDocumentTitle] = useTitle();
    const [favorites, setFavorites] = useState([]);
    const [watched, setWatched] = useState([]);
    const { ShowId } = useParams();

    useEffect(() => {
        document.title = documentTitle ?? 'True Story';
    }, [documentTitle])

    useEffect(() => {
        // API.getOneMovie, will be set later
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(`/tv/${ShowId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestExternalId = await axios.get(`tv/${ShowId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestVideos = await axios.get(`tv/${ShowId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
            // const seasons = await axios.get(`/tv/${ShowId}/season`)
            setShow(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
            setLoading(false);
            setDocumentTitle(request.data?.title || request.data?.name || request.data?.original_title)
        }
        fetchData();
    }, [ShowId]);

    useEffect(() => {
        API.getAllFavorites(user?.username)
            .then(res => setFavorites(res.data?.showFavorites))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        API.getAllWatched(user?.username)
            .then(res => {
                setWatched(res?.data[0]?.watchedShows)
            })
    }, [])

    const addToFavorite = (show) => {
        API.addShowToFavorite(user?.username, show?.id).then(res => {
            // add snackbar
            if (res.status === 200) {
                console.log('Successfull');
                setFavorites(res?.showFavorites);
            } else {
                console.log('Soemthing went wrong');
            }
        })
    }

    const removeFromFavorites = (show) => {
        API.removeShowFromFavorites(user?.username, show?.id).then(res => {
            // add snackbar
            if (res.status === 200) {
                console.log('Successfull');
            } else {
                console.log('Something went wrong');
            }
        })
    }

    const addToWatchedList = (movie) => {
        API.addShowToWatched(user?.username, movie?.id)
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
            <Banner link={show?.backdrop_path} />
            <StyledMainContainer>
                {/* make the show picture sticky after scroll? will look into that later when styling */}
                {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}
                {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}
                <StyledContainer>
                    <StyledLeftSide>
                        <div>
                            <div>
                                <StyledImg
                                    src={
                                        `https://image.tmdb.org/t/p/original${show?.poster_path}`
                                    }
                                    alt={show?.original_title}
                                />
                            </div>
                            <WatchProviders show={show} />
                            <div className="social-media-links">
                                <ExternalId externalId={externalId} link={show} />
                            </div>
                        </div>
                        <div className="buttons">
                            {user?.username && <div className='favorite-btn'>
                                {favorites?.includes(show.id) ?
                                    (
                                        <button
                                            onClick={() => removeFromFavorites(show)}
                                            className='btn btn-warning'
                                        >
                                            Remove From Favorites
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToFavorite(show)}
                                            className='btn btn-warning'
                                        >
                                            Add To Favorites
                                        </button>
                                    )
                                }
                            </div>}
                            {user?.username && <div className='favorite-btn'>
                                {watched?.includes(show.id) ?
                                    (
                                        <button
                                            onClick={() => removeFromWatchedList(show)}
                                            className='btn btn-danger'
                                        >
                                            Remove From Watched List
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            onClick={() => addToWatchedList(show)}
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
                        <Overview link={show} />
                        <Seasons show={show} />
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
                            The cast of {show?.original_title || show?.name}
                        </div>
                        <Credits show={show} />
                        <Recommendations show={show} />
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

export default ShowPage
