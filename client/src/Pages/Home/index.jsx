import React, { useState } from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import Banner from '../../components/Banner';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import styled from 'styled-components';
import './Home.css';

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

    // const StyledDiv = styled.div`
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     background-image: url(https://image.tmdb.org/t/p/original${movie?.backdrop_path});
    //     background-size: cover;
    //     background-position: 50% 10%;
    //     transition: all 1s;
    // `

    return (
        <div className='mainDiv'>
            {/* <StyledDiv> */}
                <Banner link={movie?.backdrop_path} title={movie?.title || movie?.name} movie={movie} />
            {/* </StyledDiv> */}
            <Container className='homepage'>
                <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
                <HomeShow fetchUrl={requests.fetchTrendingShows} />
            </Container>
        </div>
    )
}

export default Home;

