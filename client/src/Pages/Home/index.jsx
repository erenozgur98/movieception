import React, { useState, useEffect } from 'react'
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import Banner from '../../components/Banner';
import LoopIcon from '@mui/icons-material/Loop';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import NowAiring from '../../components/NowAiring'
import HomeMovie from '../../components/HomeMovie';
import NowPlaying from '../../components/NowPlaying';
import SearchForm from '../../components/SearchForm';
import RandomModal from '../../components/RandomModal';
import CircularProgress from '@mui/material/CircularProgress';
import './Home.css';

function Home({ user, setUser }) {
    const [movie, setMovie] = useState([]);
    const [greet, setGreet] = useState();
    const [randomModal, setRandomModal] = useState(false);
    const [loading, setLoading] = useState(false);

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
            setLoading(true)
            const request = await axios.get(requests.fetchTrending);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
            setLoading(false)
        }
        fetchData();
        document.title = 'Home';
    }, [])

    const redirect = () => {
        if (movie.media_type === 'tv') {
            window.location.assign(`/shows/${movie.id}`)
        } else {
            window.location.assign(`/movies/${movie.id}`)
        }
    }

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Banner
                        link={movie?.backdrop_path}
                    />
                    <Container className='banner-text-container'>
                        <h1 className='home-main-text'>
                            {user.username && `${greet}, ${user.username}!`}
                            {!user.username && `${greet}, welcome to Movieception!`}
                        </h1>
                        <h2>
                            What is Movieception?
                            <br />
                            Movieception is a website that has been made to track/find tons of movies and tv shows!
                        </h2>
                        <SearchForm />
                        {(movie?.title || movie?.name) &&
                            <div className="header-banner-title">
                                <div>
                                    Background Image From:
                                </div>
                                <div
                                    onClick={redirect}
                                    className='title-span'
                                >
                                    {movie?.title || movie?.name}
                                </div>
                            </div>}
                        <div className="home-random-btn">
                            <button
                                onClick={() => setRandomModal(true)}
                                className='btn btn-success home-btn'
                            >
                                Random
                                <LoopIcon />
                            </button>
                        </div>
                    </Container>
                    <Container className='home-homepage'>
                        {/* commented out for now, might not implement it */}
                        {/* <div className='homepage-items'>
                            <NowPlaying />
                            <NowAiring />
                        </div> */}
                        <h1 className='homepage-divider-title'>Top 10 This Week</h1>
                        <div className='homepage-items'>
                            <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
                            <HomeShow fetchUrl={requests.fetchTrendingShows} />
                        </div>
                    </Container>
                    <RandomModal
                        show={randomModal}
                        handleClose={() => setRandomModal(false)}
                    />
                </>
            )}
        </div>
    )
}

export default Home;

