import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack'
import Tooltip from '@mui/material/Tooltip';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import API from '../../utils/API'
import './icons.css'


function WatchList({ user, movie }) {
    const [active, setActive] = useState(false)
    const [movieWatchList, setMovieWatchList] = useState([])
    const [showWatchList, setShowWatchList] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    const isMovie = window.location.href.includes('movies')
    const isShow = window.location.href.includes('shows')

    useEffect(() => {
        if (user.username) {
            API.getAllWatchList(user.username)
                .then(res => {
                    setMovieWatchList(res.data.movieWatchList)
                    setShowWatchList(res.data.showWatchList)
                })
        }
    }, [])

    useEffect(() => {
        if (user.username) {
            if (movieWatchList.some(y => y.id === movie.id.toString())) {
                setActive(true)
            } else if (showWatchList.some(y => y.id === movie.id.toString())) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
    }, [movieWatchList, showWatchList])

    const handleChange = () => {
        if (user?.username) {
            if (active) {
                if (movie.media_type === 'tv') {
                    API.removeShowFromWatchList(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watch list!', {
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
                    API.removeMovieFromWatchList(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watch list!', {
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
                    API.removeMovieFromWatchList(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watch list!', {
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
                    API.removeShowFromWatchList(user.username, movie.id)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(false)
                                enqueueSnackbar('Successfully removed from your watch list!', {
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
                    API.addShowToWatchList(user.username, movie.id, movie.poster_path, movie.original_name)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watch list!', {
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
                    API.addMovieToWatchList(user.username, movie.id, movie.poster_path, movie.original_title)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watch list!', {
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
                    API.addMovieToWatchList(user.username, movie.id, movie.poster_path, movie.original_title)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watch list!', {
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
                    API.addShowToWatchList(user.username, movie.id, movie.poster_path, movie.original_name)
                        .then(res => {
                            if (res.status === 200) {
                                setActive(true)
                                enqueueSnackbar('Successfully added to your watch list!', {
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
            <div className="watch-icon">
                <Tooltip
                    title={
                        active
                            ? 'Remove From Watch List'
                            : 'Add To Watch List'
                    }
                >
                    <div>
                        {active ? (
                            <PlaylistAddCheckRoundedIcon
                                style={{ fill: 'yellow' }}
                                onClick={handleChange}
                            />
                        ) : (
                            <PlaylistAddRoundedIcon
                                onClick={handleChange}
                            />
                        )}
                    </div>
                </Tooltip>
            </div>
        </>
    )
}

export default WatchList;
