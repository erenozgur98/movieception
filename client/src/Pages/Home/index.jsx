import React, { useState, useEffect } from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import Banner from '../../components/Banner';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import SearchForm from '../../components/SearchForm';
import NowPlaying from '../../components/NowPlaying'
import NowAiring from '../../components/NowAiring'
import RandomModal from '../../components/RandomModal';
import LoopIcon from '@mui/icons-material/Loop';
import './Home.css';

function Home({ user, setUser }) {
    const [movie, setMovie] = useState([]);
    const [greet, setGreet] = useState();
    const [randomModal, setRandomModal] = useState(false);
    const history = useHistory();

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
            const request = await axios.get(requests.fetchTrending);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
        }
        fetchData();
        document.title = 'Home';
    }, [])

    const redirect = () => {
        if (movie.media_type === 'tv') {
            history.push(`/shows/${movie.id}`)
        } else {
            history.push(`/movies/${movie.id}`)
        }
    }

    const randomMovie = () => {

    }

    const randomShow = () => {

    }


    return (
        <div>
            <Banner
                link={movie?.backdrop_path}
            />
            <Container className='banner-text-container'>
                <h1>
                    {user.username && `${greet}, ${user.username}!`}
                    {!user.username && `${greet}, welcome to True Story!`}
                </h1>
                <h2>
                    What is True Story?
                    <br />
                    True Story is a website has been made to track/find tons of movies and tv shows!
                </h2>
                <SearchForm />
                {(movie?.title || movie?.name) &&
                    <h2 className="header-banner-title">
                        Background Image From:
                        <span
                            onClick={redirect}
                            className='title-span'
                        >
                            {movie?.title || movie?.name}
                        </span>
                    </h2>}
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
            <Container className='homepage'>
                <div className='homepage-items'>
                    <NowPlaying />
                    <NowAiring />
                </div>
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
        </div>
    )
}

export default Home;

