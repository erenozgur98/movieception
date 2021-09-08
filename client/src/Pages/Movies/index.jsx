import React from 'react'
import Row from '../../components/Row';
import requests from '../../components/Requests';
import { useState } from 'react';
import './Movies.css';

function Movies() {
    const [currentPage, setCurrentPage] = useState(1);

    console.log(currentPage)

    return (
        <div className='movie'>
            <div>
                <Row fetchUrl={`${requests.fetchTrendingMovies}&page=${currentPage}`} title='Trending Movies' />
            </div>
            <div className='movie-btn'>
                <button className='movie-buttons' onClick={() => currentPage <= 1 ? setCurrentPage(currentPage) : setCurrentPage(currentPage - 1)}>Previous Page</button>
                <button className='movie-buttons' onClick={() => currentPage >= 10 ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1)}>Next Page</button>
            </div>
            {/* <Row fetchUrl={requests.fetchActionMovies} title='Action Movies' /> */}
            {/* <Row fetchUrl={requests.fetchComedyMovies} title='Comedy Movies' /> */}
            {/* <Row fetchUrl={requests.fetchRomanceMovies} title='Romance Movies' /> */}
            {/* <Row fetchUrl={requests.fetchDocumentariesMovies} title='Documentary Movies' /> */}
            {/* <Row fetchUrl={requests.fetchDramaMovies} title='Drama Movies' /> */}
            {/* <Row fetchUrl={requests.fetchAnimationMovies} title='Animation Movies' /> */}
            {/* <Row fetchUrl={requests.fetchCrimeMovies} title='Crime Movies' /> */}
            {/* <Row fetchUrl={requests.fetchFamilyMovies} title='Family Movies' /> */}
            {/* <Row fetchUrl={requests.fetchFantasyMovies} title='Fantasy Movies' /> */}
            {/* <Row fetchUrl={requests.fetchMysteryMovies} title='Mystery Movies' /> */}
            {/* <Row fetchUrl={requests.fetchHorrorMovies} title='Horror Movies' /> */}
            {/* <Row fetchUrl={requests.fetchMusicMovies} title='Music Movies' /> */}
        </div>
    )
};

export default Movies;
