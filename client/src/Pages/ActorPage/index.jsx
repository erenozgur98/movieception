import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import MovieCredits from '../../components/MovieCredits';

function ActorPage() {
    const [actor, setActor] = useState({});
    const [externalId, setExternalId] = useState();
    const { ActorId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneActor, will be set later
        const fetchData = async () => {
            const request = await axios.get(`/person/${ActorId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`person/${ActorId}/external_ids?api_key=${apiKey}`);
            setActor(request.data);
            setExternalId(requestExternalId.data);
        }
        fetchData()
    }, [ActorId])

    console.log(actor)

    return (
        <Container>
            {/* banner, has actor's movies? backdrop path */}

            {/* make the actor picture sticky after scroll? will look into that later when styling */}

            {/* under actor picture external id's eg FB link, IG link, twitter link if available */}

            {/* credits -> get movie/shows credits which movie/show the actor played in */}
            {actor.profile_path ?
                <div>
                    <div className="actor-picture">
                        <img src={`https://image.tmdb.org/t/p/w300/${actor?.profile_path}`} alt={actor?.name} className='actor-background' />
                        <h2>{actor?.name}</h2>
                    </div>
                    <div>
                        {/* imdb.png will come here, will fix the looks later */}
                        <a href={`https://www.imdb.com/name/${actor?.imdb_id}/`} target="_blank" rel="noreferrer">
                            <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                            {/* IMDB */}
                        </a>
                    </div>
                    <div>
                        <a
                            href={`https://www.facebook.com/${externalId?.facebook_id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fab fa-facebook-square" style={{ fontSize: "42px" }}></i>
                        </a>
                        <a
                            href={`https://www.instagram.com/${externalId?.facebook_id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fab fa-instagram-square" style={{ fontSize: "42px" }}></i>
                        </a>
                        <a
                            href={`https://www.twitter.com/${externalId?.facebook_id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fab fa-twitter-square" style={{ fontSize: "42px" }}></i>
                        </a>
                    </div>
                    <div>
                        Birthday: {actor?.birthday}
                    </div>
                    <div>
                        Birth Place: {actor?.place_of_birth}
                    </div>
                    <div>
                        Biography: {actor?.biography}
                    </div>
                    <MovieCredits actor={actor} />
                </div>
                :
                <>
                    <div>
                        Oops, something went wrong, go back to <a href='/actors'>actor</a> page
                    </div>
                </>
            }
            {/* /person/{person_id}/images <-- to get images */}
            {/* /person/{person_id}/tagged_images <-- to get tagged images, more on that later */}
            {/* /person/{person_id}/tv_credits <-- to get tv_credits */}
            {/* /person/{person_id}/movie_credits <-- to get movie_credits */}
        </Container>
    )
}

export default ActorPage
