import React from 'react'
import People from '../../components/People';
import requests from '../../components/Requests';

function Actors() {

    return (
        <div className='movie'>
            <People fetchUrl={requests.fetchActors} title='Popular Actors' />
        </div>
    )
};

export default Actors;
