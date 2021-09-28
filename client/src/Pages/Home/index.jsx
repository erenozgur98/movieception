import React, { useState } from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import Banner from '../../components/Banner';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import './Home.css';
import { useEffect } from 'react';

function Home() {
    const [movie, setMovie] = useState([]);

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

    return (
        <div>
            <Banner link={movie?.backdrop_path} title={movie?.title || movie?.name} movie={movie} />
            <Container className='homepage'>
                <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
                <HomeShow fetchUrl={requests.fetchTrendingShows} />
            </Container>
        </div>
    )
}

export default Home;

