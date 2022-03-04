import React, { useState, useEffect } from 'react'
import API from '../../utils/API';

function Profile({ user }) {
    const [greet, setGreet] = useState();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteShows, setFavoriteShows] = useState([]);
    const [movieWatchList, setMovieWatchList] = useState([]);
    const [showWatchList, setShowWatchList] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchedShows, setWatchedShows] = useState([]);

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
            1{favoriteMovies?.map(x => <p>{x}</p>)} <br /> {favoriteShows?.map(x => <p>{x}</p>)}
            2{movieWatchList?.map(x => <p>{x}</p>)} <br /> {showWatchList?.map(x => <p>{x}</p>)}
            3{watchedMovies?.map(x => <p>{x}</p>)} <br /> {watchedShows?.map(x => <p>{x}</p>)}
        </>
    )
}

export default Profile
