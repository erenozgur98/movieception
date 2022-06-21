import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack'
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import API from '../../utils/API'
import './icons.css'

function HistoryIcon({ user, movie }) {
    const [active, setActive] = useState(false)
    const [watchedMovie, setWatchedMovie] = useState([])
    const [watchedShow, setWatchedShow] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    const isMovie = window.location.href.includes('movies')
    const isShow = window.location.href.includes('shows')

    useEffect(() => {
        if (user.username) {
            API.getAllWatched(user.username)
                .then(res => {
                    setWatchedMovie(res.data.Movie)
                    setWatchedShow(res.data.Show)
                })
        }
    }, [])

    useEffect(() => {
        if (user.username) {
            if (watchedMovie.find(y => y.includes(movie.id.toString()))) {
                setActive(true)
            } else if (watchedShow.find(y => y.includes(movie.id.toString()))) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
    }, [watchedMovie, watchedShow])

    const handleChange = () => {
        if (user?.username) {
            if (active) {
                if (movie.media_type === 'tv') {
                    API.removeShowFromWatched(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watched history!', {
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
                    API.removeMovieFromWatched(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watched history!', {
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
                    API.removeMovieFromWatched(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watched history!', {
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
                    API.removeShowFromWatched(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watched history!', {
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
                    API.addShowToWatched(user.username, movie.id, movie.poster_path, movie.original_name)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watched history!', {
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
                    API.addMovieToWatched(user.username, movie.id, movie.poster_path, movie.original_title)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watched history!', {
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
                    API.addMovieToWatched(user.username, movie.id, movie.poster_path, movie.original_title)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watched history!', {
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
                    API.addShowToWatched(user.username, movie.id, movie.poster_path, movie.original_name)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watched history!', {
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
            <div className="history-icon">
                <Tooltip
                    title={
                        active
                            ? 'Remove From Watched History'
                            : 'Add To Watched History'
                    }
                >
                    <div>
                        {active ? (
                            <AccessTimeFilledIcon
                                style={{ fill: 'green' }}
                                onClick={handleChange}
                            />
                        ) : (
                            <AccessTimeIcon
                                onClick={handleChange}
                            />
                        )}
                    </div>
                </Tooltip>
            </div>
        </>
    )
}

export default HistoryIcon;
