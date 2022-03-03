import React, { useState, useEffect } from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import API from '../../utils/API';

function Profile({ user }) {
    const [value, setValue] = useState('1');
    const [greet, setGreet] = useState()
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const [favoriteShows, setFavoriteShows] = useState([])
    const [movieWatchList, setMovieWatchList] = useState([])
    const [showWatchList, setShowWatchList] = useState([])
    const [watchedMovies, setWatchedMovies] = useState([])
    const [watchedShows, setWatchedShows] = useState([])

    useEffect(() => {
        const date = new Date();
        const hours = date.getHours();

        if (hours < 12) {
            setGreet('Good Morning')
        } else if (hours >= 12 && hours <= 17) {
            setGreet('Good Afternoon')
        } else {
            setGreet('Good Evening')
        }
    }, [])

    useEffect(() => {
        const fetchData = () => {
            if (user?.username) {
                API.getAllFavorites(user.username).then(res => {
                    setFavoriteMovies(res.data?.Movie)
                    setFavoriteShows(res.data?.Show)
                })
                API.getAllWatchList(user.username).then(res => {
                    setMovieWatchList(res.data?.Movie)
                    setShowWatchList(res.data?.Show)
                })
                API.getAllWatched(user.username).then(res => {
                    setWatchedMovies(res.data?.Movie)
                    setWatchedShows(res.data?.Show)
                })
            }
        }
        fetchData()
    }, [user])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <div
                style={{
                    marginTop: '5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                {user?.username && <h1>{greet}, {user?.username}</h1>}
            </div>
            <Box sx={{ backgroundColor: 'gray', marginTop: '4rem' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab style={{ color: 'white' }} label="Favorites" value="1" />
                            <Tab style={{ color: 'white' }} label="Watchlist" value="2" />
                            <Tab style={{ color: 'white' }} label="Watched List" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel style={{ width: '100%' }} value="1">{favoriteMovies?.map(x => <p>{x}</p>)} <br /> {favoriteShows?.map(x => <p>{x}</p>)}</TabPanel>
                    <TabPanel style={{ width: '100%' }} value="2">{movieWatchList?.map(x => <p>{x}</p>)} <br /> {showWatchList?.map(x => <p>{x}</p>)}</TabPanel>
                    <TabPanel style={{ width: '100%' }} value="3">{watchedMovies?.map(x => <p>{x}</p>)} <br /> {watchedShows?.map(x => <p>{x}</p>)}</TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default Profile
