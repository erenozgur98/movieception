import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';

function ShowPage() {
    const [show, setShow] = useState({});
    const { ShowId } = useParams();

    useEffect(() => {
        // API.getOneShow, will be set later
    }, [ShowId])

    return (
        <Container>
            {/* banner, has show's backdrop path */}

            {/* actual show picture */}
            {/* make the show picture sticky after scroll? will look into that later when styling */}

            {/* under show picture external id's eg FB link, IG link, twitter link */}

            {/* link to where to watch the show */}

            {/* show title */}

            {/* Release date, country, language, genres */}

            {/* show description */}

            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}

            {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}

            {/* actors, with names */}
        </Container>
    )
}

export default ShowPage
