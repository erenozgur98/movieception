import React, { useState, useEffect } from 'react';
import Row from '../../components/Row';
import requests from '../../components/Requests';
import { useLocation } from 'react-router-dom';

function Shows() {
    const [genre, setGenre] = useState('all');
    const [fetchUrl, setFetchUrl] = useState();
    const [title, setTitle] = useState('');

    const urlGenre = useLocation().search
    const selectedGenre = new URLSearchParams(urlGenre).get('genre');

    document.title = 'TV Shows'

    useEffect(() => {
        const fetchData = async () => {
            setGenre(selectedGenre);
            if (genre === 'action') {
                setFetchUrl(requests.fetchActionShows);
                setTitle('Action Shows')
            } else if (genre === 'comedy') {
                setFetchUrl(requests.fetchComedyShows);
                setTitle('Comedy Shows')
            } else if (genre === 'netflix') {
                setFetchUrl(requests.fetchNetflixOriginals);
                setTitle('Netflix Originals')
            } else if (genre === 'romance') {
                setFetchUrl(requests.fetchRomanceShows);
                setTitle('Romance Shows')
            } else if (genre === 'documentary') {
                setFetchUrl(requests.fetchDocumentaryShows);
                setTitle('Documentary Shows')
            } else if (genre === 'drama') {
                setFetchUrl(requests.fetchDramaShows);
                setTitle('Drama Shows')
            } else if (genre === 'animation') {
                setFetchUrl(requests.fetchAnimationShows);
                setTitle('Animation Shows')
            } else if (genre === 'family') {
                setFetchUrl(requests.fetchFamilyShows);
                setTitle('Family Shows')
            } else if (genre === 'fantasy') {
                setFetchUrl(requests.fetchFantasyShows);
                setTitle('Fantasy Shows')
            } else if (genre === 'mystery') {
                setFetchUrl(requests.fetchMysteryShows);
                setTitle('Mystery Shows')
            } else if (genre === 'thriller') {
                setFetchUrl(requests.fetchThrillerShows);
                setTitle('Thriller Shows')
            } else if (genre === 'talk') {
                setFetchUrl(requests.fetchTalkShows);
                setTitle('Talk Shows')
            } else if (genre === 'reality') {
                setFetchUrl(requests.fetchRealityShows);
                setTitle('Reality Shows')
            } else {
                setFetchUrl(requests.fetchTrendingShows);
                setTitle('Trending Shows')
            }
        }
        fetchData();
    }, [selectedGenre, genre])

    return (
        <div className='show'>
            <Row fetchUrl={fetchUrl} title={title} />
        </div>
    )
}

export default Shows
