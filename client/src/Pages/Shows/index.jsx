import React from 'react';
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Shows() {

    document.title = 'TV Shows'

    return (
        <div className='show'>
            <Row fetchUrl={requests.fetchTrendingShows} title={'Popular Shows'} />
        </div>
    )
}

export default Shows
