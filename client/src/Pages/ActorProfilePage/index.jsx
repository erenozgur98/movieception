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
            {/* banner, has actor's movies? backdrop path */}

            {/* actual actor picture */}
            {/* make the actor picture sticky after scroll? will look into that later when styling */}

            {/* under actor picture external id's eg FB link, IG link, twitter link if available */}

            {/* actor name */}

            {/* age born: day,yr,place */}

            {/* actor biography */}

            {/* credits -> get movie/shows credits which movie/show the actor played in */}
        </Container>
    )
}

export default ActorProfilePage
