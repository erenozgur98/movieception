import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import styled from 'styled-components';
import Lists from '../../components/Lists';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import Banner from '../../components/Banner';
import requests from '../../components/Requests';
import CircularProgress from '@mui/material/CircularProgress';
import NotLoggedIn from '../../components/NotLoggedIn';

function Profile({ user }) {
    const [greet, setGreet] = useState();
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteShows, setFavoriteShows] = useState([]);
    const [movieWatchList, setMovieWatchList] = useState([]);
    const [showWatchList, setShowWatchList] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchedShows, setWatchedShows] = useState([]);
    const [randomInt,] = useState(Math.floor(Math.random() * 20));

    useEffect(() => {
        const hours = new Date().getHours();

        if (hours < 12 && hours > 6) {
            setGreet('Good Morning')
        } else if (hours >= 12 && hours <= 17) {
            setGreet('Good Afternoon')
        } else {
            setGreet('Good Evening')
        }

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(requests.fetchTrending);
            setTrending(request?.data?.results);
            setLoading(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = () => {
            if (user?.username) {
                setLoading(true);
                API.getAllFavorites(user.username).then(res => {
                    setFavoriteMovies(res.data?.movieFavorites)
                    setFavoriteShows(res.data?.showFavorites)
                })
                API.getAllWatchList(user.username).then(res => {
                    setMovieWatchList(res.data?.movieWatchList)
                    setShowWatchList(res.data?.showWatchList)
                })
                API.getAllWatched(user.username).then(res => {
                    setWatchedMovies(res.data?.movieHistory)
                    setWatchedShows(res.data?.showHistory)
                })
                setLoading(false);
            }
        }
        fetchData()
    }, [user])

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 20rem;
        text-align: center;
    `


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
                <>
                    {user.username ? (
                        <>
                            <Banner link={trending[randomInt]?.backdrop_path} />
                            <StyledMainContainer>
                                <h1>{greet}, {user?.username}</h1>
                                <Lists
                                    favoriteMovies={favoriteMovies}
                                    setFavoriteMovies={setFavoriteMovies}
                                    favoriteShows={favoriteShows}
                                    setFavoriteShows={setFavoriteShows}
                                    movieWatchList={movieWatchList}
                                    setMovieWatchList={setMovieWatchList}
                                    showWatchList={showWatchList}
                                    setShowWatchList={setShowWatchList}
                                    watchedMovies={watchedMovies}
                                    setWatchedMovies={setWatchedMovies}
                                    watchedShows={watchedShows}
                                    setWatchedShows={setWatchedShows}
                                    user={user}
                                />
                            </StyledMainContainer>
                        </>
                    ) : (
                        <NotLoggedIn />
                    )}
                </>
            )}
        </>
    )
}

export default Profile