import React, { useEffect, useState } from 'react';
import Row from '../../components/Row';
import requests from '../../components/Requests';
import { useLocation } from 'react-router-dom';

function Movies() {
    const [genre, setGenre] = useState('all');
    const [fetchUrl, setFetchUrl] = useState();

    const urlGenre = useLocation().search
    const selectedGenre = new URLSearchParams(urlGenre).get('genre');

    useEffect(() => {
        setGenre(selectedGenre);
    }, [selectedGenre])

    return (
        <div className='movie'>
            <Row fetchUrl={requests.fetchTrendingMovies} title={'Trending Movies'} />
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
