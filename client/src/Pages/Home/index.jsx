import React, { useState } from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
// import Banner from '../../components/Banner';
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
            {/* <Banner link={movie?.backdrop_path} title={movie?.title || movie?.name} movie={movie} /> */}
            <header
                className='header-banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                    backgroundPosition: '50% 10%',
                    // opacity: '0.521'
                    // backgroundPosition: 'center center'
                }}
            >
                <div className='header-banner-button-container'>
                    {movie?.title ?
                        <h2 className="header-banner-title">
                            Image from: {movie?.title}
                        </h2>
                        :
                        null
                    }
                </div>
                {movie ?
                    <div className='header-banner-button-container'>
                        <button className='header-banner-btn' onClick={redirect}>Go To {movie?.title || movie?.name}</button>
                    </div>
                    :
                    null
                }
                <div className={movie ? "header-banner--fadeBottom-2" : "header-banner--fadeBottom"}></div>
            </header>
            <Container className='homepage'>
                <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
                <HomeShow fetchUrl={requests.fetchTrendingShows} />
            </Container>
        </div>
    )
}

export default Home;

