import React, { useEffect, useState } from 'react';
import Row from '../../components/Row';
import requests from '../../components/Requests';
import { useLocation } from 'react-router-dom';

function Movies() {
    const [genre, setGenre] = useState('all');
    const [fetchUrl, setFetchUrl] = useState();
    const [title, setTitle] = useState('');

    const urlGenre = useLocation().search
    const selectedGenre = new URLSearchParams(urlGenre).get('genre');

    document.title = 'Movies';

    useEffect(() => {
        const fetchData = async () => {
            setGenre(selectedGenre);
            if (genre === 'action') {
                setFetchUrl(requests.fetchActionMovies);
                setTitle('Action Movies')
            } else if (genre === 'comedy') {
                setFetchUrl(requests.fetchComedyMovies);
                setTitle('Comedy Movies')
            } else if (genre === 'horror') {
                setFetchUrl(requests.fetchHorrorMovies);
                setTitle('Horror Movies')
            } else if (genre === 'romance') {
                setFetchUrl(requests.fetchRomanceMovies);
                setTitle('Romance Movies')
            } else if (genre === 'documentary') {
                setFetchUrl(requests.fetchDocumentaryMovies);
                setTitle('Documentary Movies')
            } else if (genre === 'drama') {
                setFetchUrl(requests.fetchDramaMovies);
                setTitle('Drama Movies')
            } else if (genre === 'adventure') {
                setFetchUrl(requests.fetchAdventureMovies)
                setTitle('Adventure Movies')
            } else if (genre === 'animation') {
                setFetchUrl(requests.fetchAnimationMovies);
                setTitle('Animation Movies')
            } else if (genre === 'family') {
                setFetchUrl(requests.fetchFamilyMovies);
                setTitle('Family Movies')
            } else if (genre === 'fantasy') {
                setFetchUrl(requests.fetchFantasyMovies);
                setTitle('Fantasy Movies')
            } else if (genre === 'mystery') {
                setFetchUrl(requests.fetchMysteryMovies);
                setTitle('Mystery Movies')
            } else if (genre === 'thriller') {
                setFetchUrl(requests.fetchThrillerMovies);
                setTitle('Thriller Movies')
            } else if (genre === 'crime') {
                setFetchUrl(requests.fetchCrimeMovies)
                setTitle('Crime Movies')
            } else if (genre === 'history') {
                setFetchUrl(requests.fetchHistoryMovies)
                setTitle('History Movies')
            } else {
                setFetchUrl(requests.fetchTrendingMovies);
                setTitle('Trending Movies')
            }
        }
        fetchData();
    }, [selectedGenre, genre])

    return (
        <div className='movie'>
            {/* <Row fetchUrl={fetchUrl} title={title} /> */}
            <Row fetchUrl={requests.fetchPopularMovies} title={title} />
            {/* <Row fetchUrl={`${requests.fetchMovies}&with_genres=18`} title={title} /> */}
        </div>
    )
};

export default Movies;
