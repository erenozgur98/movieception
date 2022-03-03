import React, { useState } from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import Banner from '../../components/Banner';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import SearchForm from '../../components/SearchForm';
import './Home.css';

function Home({ user }) {
    const [movie, setMovie] = useState([]);
    const [greet, setGreet] = useState()
    const history = useHistory();

    useEffect(() => {
        const hours = new Date().getHours();

        if (hours < 12 && hours > 6) {
            setGreet('Good Morning')
        } else if (hours >= 12 && hours <= 17) {
            setGreet('Good Afternoon')
        } else if (hours > 17) {
            setGreet('Good Evening')
        } else {
            setGreet('Good Night')
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


    return (
        <div>
            <Banner
                link={movie?.backdrop_path}
            />
            <Container className='banner-text-container'>
                <h1>
                    {user.username && `${greet}, ${user.username}!`} <br /> {`Welcome back!`}
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
            </Container>
            <Container className='homepage'>
                <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
                <HomeShow fetchUrl={requests.fetchTrendingShows} />
            </Container>
        </div>
    )
}

export default Home;

