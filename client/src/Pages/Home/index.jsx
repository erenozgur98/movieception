import React from 'react'
import HomeMovie from '../../components/HomeMovie';
import HomeShow from '../../components/HomeShow';
import requests from '../../components/Requests';
import Banner from '../../components/Banner';
import image from '../../images/barney-stinson-1.jpg'
import './Home.css';

function Home() {
    return (
        <div className='homepage'>
            <Banner link={image} />
            <HomeMovie fetchUrl={requests.fetchTrendingMovies} />
            <HomeShow fetchUrl={requests.fetchTrendingShows} />
        </div>
    )
}

export default Home;

