import React from 'react';
import Row from '../../components/Row';
import requests from '../../components/Requests';

function Movies() {

    document.title = 'Movies';

    return (
        <div className='movie'>
            {/* <Row fetchUrl={requests.fetchTrendingMovies} title={'Trending Movies'} /> */}
            <Row fetchUrl={requests.fetchPopularMovies} title={'Popular Movies'} />
            {/* <Row fetchUrl={`${requests.fetchMovies}&with_genres=18`} title={title} /> */}
        </div>
    )
};

export default Movies;
