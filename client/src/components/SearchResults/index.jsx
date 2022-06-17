import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import requests from '../../components/Requests';
import { useTitle } from '../useTitle';
import Row from '../Row';

function SearchResults() {
    const [documentTitle, setDocumentTitle] = useTitle();

    const search = useLocation().search;
    const searchedQuery = new URLSearchParams(search).get('query');

    useEffect(() => {
        document.title = documentTitle ?? 'Movieception'
    }, [documentTitle])

    useEffect(() => {
        setDocumentTitle(searchedQuery)
    }, [searchedQuery])


    return (
        <div>
            <Row fetchUrl={`${requests.fetchSearchMulti}${searchedQuery}`} />
        </div>
    )
}

export default SearchResults;
