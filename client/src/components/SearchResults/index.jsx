import React from 'react';
import { useParams } from 'react-router-dom';
import requests from '../../components/Requests';
import Row from '../Row';

function SearchResults() {
    const { searchResults } = useParams();

    return (
        <div>
            <Row fetchUrl={`${requests.fetchSearchMulti}${searchResults}`} />
        </div>
    )
}

export default SearchResults;
