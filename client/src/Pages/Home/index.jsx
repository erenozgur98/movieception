import React, { useState } from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import Banner from '../../components/Banner';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './Home.css';

function Home() {
    const [movie, setMovie] = useState([]);
    const history = useHistory();

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
                <h1>True Story</h1>
                <h5>
                    What is True Story?
                    <br />
                    True Story is a website has been made to track/find tons of movies and tv shows
                </h5>
                {(movie?.title || movie?.name) &&
                    <h2 className="header-banner-title">
                        Background Image From: {movie?.title || movie?.name}
                    </h2>
                }
                {(movie?.title || movie?.name) &&
                    <button className='header-banner-btn' onClick={redirect}>Go To {movie?.title || movie?.name}</button>
                }
            </Container>
            <Container className='homepage'>
                <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
                <HomeShow fetchUrl={requests.fetchTrendingShows} />
            </Container>
        </div>
    )
}

export default Home;

