import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';

function MoviePage() {
    const [movie, setMovie] = useState({});
    const { MovieId } = useParams();

    useEffect(() => {
        // API.getOneMovie, will be set later
    }, [MovieId])

    return (
        <Container>
            {/* banner, has movie's backdrop path */}

            {/* actual movie picture */}
            {/* make the movie picture sticky after scroll? will look into that later when styling */}

            {/* under movie picture external id's eg FB link, IG link, twitter link */}

            {/* link to where to watch the movie */}

            {/* movie title */}

            {/* Release date, country, language, genres */}

            {/* movie description */}

            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}

            {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}

            {/* actors, with names */}
        </Container>
    )
}

export default MoviePage
