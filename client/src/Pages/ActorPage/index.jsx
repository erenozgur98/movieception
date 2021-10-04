import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import ExternalId from '../../components/ExternalId';
import './ActorPage.css'

function ActorPage() {
    const [actor, setActor] = useState({});
    const [actorPictures, setActorPictures] = useState([]);
    const [externalId, setExternalId] = useState();
    const [movieCredits, setMovieCredits] = useState([]);
    const { ActorId } = useParams();

    const history = useHistory()
    const base_url = 'https://image.tmdb.org/t/p/original';
    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/person/${ActorId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`person/${ActorId}/external_ids?api_key=${apiKey}`);
            const requestActorImages = await axios.get(`person/${ActorId}/images?api_key=${apiKey}`)
            const requestMovieCredits = await axios.get(`/person/${ActorId}/combined_credits?api_key=${apiKey}`);
            setActor(request.data);
            setExternalId(requestExternalId.data);
            setActorPictures(requestActorImages.data.profiles);
            setMovieCredits(requestMovieCredits.data.cast);
        }
        fetchData()
        document.title = `${actor?.name}`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ActorId]);

    const redirect = (credits) => {
        if (credits.media_type === 'tv') {
            history.push(`/shows/${credits.id}`)
        } else {
            history.push(`/movies/${credits.id}`)
        }
    };

    // sorting the movie/shows by release year
    movieCredits.sort((a, b) => (a.release_date > b.release_date) ? -1 : ((b.release_date > a.release_date) ? 1 : 0));

    // {movieCredits.filter((filterNull) => (
    //     if (filterNull?.poster_path.split(' ').pop() === null) {
    //         return false; //skip
    //     }
    //     return true;
    // ))}

    // random number between 0 - 5 for banner image
    // const getRandomInt = Math.floor(Math.random() * 5);

    return (
        <div>
            {movieCredits[0]?.backdrop_path ?
                <Banner
                    link={movieCredits[0]?.backdrop_path}
                    title={movieCredits[0]?.title}
                />
                :
                <Banner
                    link={movieCredits[1]?.backdrop_path}
                    title={movieCredits[1]?.title}
                />
            }
            <Container>
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
                                    <a href={`https://www.imdb.com/name/${actor?.imdb_id}/`} target="_blank" rel="noreferrer">
                                        <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
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
                            <div className='movie-credits'>
                                {movieCredits.map((credits) => (
                                    // checking to see if poster path has a value, if not it'll skip
                                    credits?.poster_path ?
                                        <img
                                            // key={credits.id}
                                            onClick={() => redirect(credits)}
                                            src={`${base_url}${credits?.poster_path}`}
                                            alt={credits?.original_name}
                                            className='actor-movie-poster'
                                        />
                                        :
                                        null
                                ))}
                            </div>
                            {/* <MovieCredits actor={actor} /> */}
                        </div>
                        <h4>{actor?.name}'s Images</h4>
                        <div className='actor-pictures'>
                            {actorPictures.map((x) => (
                                <img
                                    key={x.id}
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
                            Oops, something went wrong, go back to <a href='/actors'>actor</a> or <a href='/'>home</a> page
                        </Container>
                    </>
                }
            </Container>
        </div>
    )
}

export default ActorPage
