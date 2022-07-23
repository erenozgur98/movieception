import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import requests from '../../components/Requests';
import Row from '../Row';

function SearchResults() {

    const search = useLocation().search;
    const searchedQuery = new URLSearchParams(search).get('query');

    useEffect(() => {
        document.title = 'Search Results - Movieception'
    }, [])


    return (
        <div>
            <Row fetchUrl={`${requests.fetchSearchMulti}${searchedQuery}`} />
        </div>
    )
}

export default SearchResults;
