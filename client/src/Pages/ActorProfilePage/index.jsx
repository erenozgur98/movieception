import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';

function ActorProfilePage() {
    const [actor, setActor] = useState({});
    const { ActorId } = useParams();

    useEffect(() => {
        // API.getOneActor, will be set later
    }, [ActorId])

    return (
        <Container>
            {/* banner, has actor's backdrop path */}

            {/* actual actor picture */}
            {/* make the actor picture sticky after scroll? will look into that later when styling */}

            {/* under actor picture external id's eg FB link, IG link, twitter link */}

            {/* link to where to watch the actor */}

            {/* actor title */}

            {/* Release date, country, language, genres */}

            {/* actor description */}

            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}

            {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}

            {/* actors, with names */}
        </Container>
    )
}

export default ActorProfilePage
