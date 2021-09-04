import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import ExternalId from '../../components/ExternalId';
import MovieCredits from '../../components/MovieCredits';
import './ActorPage.css'

function ActorPage() {
    const [actor, setActor] = useState({});
    const [actorPictures, setActorPictures] = useState([]);
    const [externalId, setExternalId] = useState();
    const { ActorId } = useParams();

    const base_url = 'https://image.tmdb.org/t/p/original/';
    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneActor, will be set later
        const fetchData = async () => {
            const request = await axios.get(`/person/${ActorId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`person/${ActorId}/external_ids?api_key=${apiKey}`);
            const requestActorImages = await axios.get(`person/${ActorId}/images?api_key=${apiKey}`)
            setActor(request.data);
            setExternalId(requestExternalId.data);
            setActorPictures(requestActorImages.data.profiles)
        }
        fetchData()
    }, [ActorId])

    console.log(actor)
    console.log(externalId)

    return (
        <div>
            {/* for now, todo: add algorithm to randomize backdrop_path for actor's movies */}
            {actor?.profile_path ?
                <Banner link={"/5BMwFwNzSidVYArn561acqtktxv.jpg"} />
            :
            null}
            <Container>
                {/* banner, has actor's movies? backdrop path */}
                {/* make the actor picture sticky after scroll? will look into that later when styling */}
                {/* under actor picture external id's eg FB link, IG link, twitter link if available */}
                {/* credits -> get movie/shows credits which movie/show the actor played in */}
                {actor.profile_path ?
                    <div>
                        <div className='page-organization'>
                            <div>
                                <div className="actor-picture">
                                    <img src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} alt={actor?.name} className='actor-background' />
                                </div>
                                <div className='social-media-links'>
                                    <ExternalId externalId={externalId} />
                                </div>
                            </div>
                            <div className='bottom-section'>
                                <h2>{actor?.name}</h2>
                                <div>
                                    {/* imdb.png will come here, will fix the looks later */}
                                    <a href={`https://www.imdb.com/name/${actor?.imdb_id}/`} target="_blank" rel="noreferrer">
                                        <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                                        {/* IMDB */}
                                    </a>
                                </div>
                                <div>
                                    {actor?.birthday ?
                                        <div>
                                            Born {actor?.birthday} in {actor?.place_of_birth}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div className='truncate'>
                                    {actor?.biography ?
                                        <div>
                                            {actor?.biography}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Known For</h4>
                            <MovieCredits actor={actor} />
                        </div>
                        <h4>{actor?.name}'s Images</h4>
                        <div className='actor-pictures'>
                            {actorPictures.map((x) => (
                                <img
                                    src={`${base_url}${x.file_path}`}
                                    alt={x?.width}
                                    className='actor-images'
                                />
                            ))}
                        </div>
                    </div>
                    :
                    <>
                        <Container style={{ textAlign: 'center', paddingTop: '70px' }}>
                            Oops, something went wrong, go back to <a href='/actors'>actor</a> page
                        </Container>
                    </>
                }
                {/* /person/{person_id}/images <-- to get images */}
                {/* /person/{person_id}/tagged_images <-- to get tagged images, more on that later */}
            </Container>
        </div>
    )
}

export default ActorPage
