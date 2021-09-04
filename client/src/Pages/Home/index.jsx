import React from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import './Home.css';

function Home() {
    return (
        <div className='homepage'>
            <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
            <HomeShow fetchUrl={requests.fetchTrendingShows} />
        </div>
    )
}

export default Home;

