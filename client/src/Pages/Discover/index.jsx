import React from 'react'
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Discover() {
    return (
        <div className="">
            <Row fetchUrl={requests.fetchTopRated} title='Top Rated' />
            <Row fetchUrl={requests.fetchTrending} title='Trending' />
        </div>
    )
}

export default Discover


