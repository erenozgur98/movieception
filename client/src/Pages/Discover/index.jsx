import React from 'react'
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Discover() {
    document.title = 'Discover';
    
    return (
        <div className="discover">
            <Row fetchUrl={requests.fetchTrending} />
        </div>
    )
};

export default Discover;


