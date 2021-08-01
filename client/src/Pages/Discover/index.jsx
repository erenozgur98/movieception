import React from 'react'
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Discover() {
    return (
        <div className="">
            <Row fetchUrl={requests.fetchTopRated} title='Top Rated Movies' />
            <Row fetchUrl={requests.fetchTrendingMovies} title='Trending Movies' />
            <Row fetchUrl={requests.fetchTrendingShows} title='Trending Shows' />
        </div>
    )
}

export default Discover


