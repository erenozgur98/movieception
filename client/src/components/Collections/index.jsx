import React, { useState, useEffect } from "react";
import axios from '../Axios';
import Banner from "../Banner";
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import './Collections.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Collections() {
    const [collection, setCollection] = useState([])
    const { CollectionId } = useParams();

    const fetchCollectionById = `/collection/${CollectionId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchCollectionById)
            setCollection(request.data)
        }
        fetchData()
    }, [])

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };

    return (
        <div>
            <Banner link={collection?.backdrop_path} />
            <div className='collection-main'>
                <Container className='collection-container'>
                    <img
                        className='collection-image'
                        src={
                            `${base_url}${collection?.poster_path}`
                        }
                        alt={collection?.name}
                    />
                    <div>
                        <h3>{collection?.name}</h3>
                    </div>
                    <div>
                        {collection?.overview}
                    </div>
                    <div className='collection-map'>
                        {collection?.parts?.map(collection => (
                            <div className='collection-posters'>
                                <img
                                    alt={collection.title}
                                    className='collection-poster'
                                    onClick={() => window.location.assign(`/movies/${collection?.id}`)}
                                    src={`${base_url}${collection.poster_path}`}
                                />
                                <div className='collection-overviews'>
                                    <p>
                                        {collection?.original_title || collection?.title}
                                    </p>
                                    <div>
                                        {new Date(collection?.release_date).toLocaleString('en-US', options)}
                                    </div>
                                    <div>
                                        Vote Average: {collection?.vote_average}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Collections;
