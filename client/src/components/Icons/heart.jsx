import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack'
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import API from '../../utils/API'
import './icons.css'

function HeartIcon({ user, movie }) {
    const [active, setActive] = useState(false)
    const [movieFavorite, setMovieFavorite] = useState([])
    const [showFavorite, setShowFavorite] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    const isMovie = window.location.href.includes('movies')
    const isShow = window.location.href.includes('shows')

    useEffect(() => {
        if (user.username) {
            API.getAllFavorites(user.username)
                .then(res => {
                    setMovieFavorite(res.data.Movie)
                    setShowFavorite(res.data.Show)
                })
        }
    }, [])

    useEffect(() => {
        if (user?.username) {
            if (movieFavorite.find(x => x.includes(movie.id.toString()))) {
                setActive(true)
            } else if (showFavorite.find(x => x.includes(movie.id.toString()))) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
    }, [movieFavorite, showFavorite])

    const addToFavorite = () => {
        if (user?.username) {
            if (active) {
                if (movie.media_type === 'tv') {
                    API.removeShowFromFavorites(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your favorites!', {
                                    variant: 'success'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                } else if (movie.media_type === 'movie') {
                    API.removeMovieFromFavorites(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                }

                if (isMovie) {
                    API.removeMovieFromFavorites(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                } else if (isShow) {
                    API.removeShowFromFavorites(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                }
            } else {
                if (movie.media_type === 'tv') {
                    API.addShowToFavorite(user.username, movie.id, movie.poster_path, movie.original_name)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                } else if (movie.media_type === 'movie') {
                    API.addMovieToFavorite(user.username, movie.id, movie.poster_path, movie.original_title)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                }

                if (isMovie) {
                    API.addMovieToFavorite(user.username, movie.id, movie.poster_path, movie.original_title)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                } else if (isShow) {
                    API.addShowToFavorite(user.username, movie.id, movie.poster_path, movie.original_name)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your favorites!', {
                                    variant: 'success'
                                })
                            } else {
                                enqueueSnackbar('Something went wrong, please try again later', {
                                    variant: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    return
                }
            }
        } else {
            enqueueSnackbar('You are not logged in!', {
                variant: 'warning'
            })
        }
    }

    return (
        <>
            <div className='heart-icon'>
                <Tooltip
                    title={
                        active
                            ? 'Remove From Favorites'
                            : 'Add To Favorites'
                    }
                >
                    <div className='heart-icon-animate'>
                        {active ? (
                            <FavoriteIcon
                                style={{ fill: 'red' }}
                                onClick={addToFavorite}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                onClick={addToFavorite}
                            />
                        )}
                    </div>
                </Tooltip>
            </div>
        </>
    )
}

export default HeartIcon;
