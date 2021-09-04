import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios'
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
import YouTube from 'react-youtube';
import '../MoviePage/MoviePage.css';

function ShowPage() {
    const [show, setShow] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerUrl, setTrailerUrl] = useState('');
    const { ShowId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneMovie, will be set later
        const fetchData = async () => {
            const request = await axios.get(`/tv/${ShowId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`tv/${ShowId}/external_ids?api_key=${apiKey}`);
            const requestVideos = await axios.get(`tv/${ShowId}/videos?api_key=${apiKey}`);
            setShow(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
        }
        fetchData();
    }, [ShowId]);

    const playTrailer = (show) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            setTrailerUrl(videos[0]?.key);
        }
    };

    const opts = {
        heigth: '390',
        width: '100%',
    };

    console.log(videos);

    return (
        <div>
            <Banner link={show?.backdrop_path} title={show?.original_name} />
            <Container>
                {/* make the show picture sticky after scroll? will look into that later when styling */}
                {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}
                {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}
                {show.poster_path ?
                    <div>
                        <div className="page-organization">
                            <div>
                                <div className="poster-picture">
                                    <img src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="black-widow" className='movie-poster' />
                                </div>
                                <div className="social-media-links">
                                    <ExternalId externalId={externalId} />
                                </div>
                            </div>
                            <div className="bottom-section">
                                <h2>{show?.original_name}</h2>
                                <div className="movie-overview">
                                    <div>
                                        {/* imdb.png will come here, will fix the looks later */}
                                        <a href={`https://www.imdb.com/title/${externalId?.imdb_id}/`} target="_blank" rel="noreferrer">
                                            <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                                            {/* IMDB */}
                                        </a>
                                    </div>
                                    <div>
                                        <a href={show?.homepage} target="_blank" rel="noreferrer">Homepage</a>
                                    </div>
                                    <div>
                                        {show?.first_air_date ?
                                            <div>
                                                First Air Date: {show?.first_air_date}
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        {show?.last_air_date ?
                                            <div>
                                                Last Air Date: {show?.last_air_date}
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        {show?.number_of_seasons ?
                                            <div>
                                                Seasons: {show?.number_of_seasons}
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        {show?.number_of_episodes ?
                                            <div>
                                                Episodes: {show?.number_of_episodes}
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        {/* Genres: {show?.genres.map(x => x.name)} */}
                                    </div>
                                    <div>
                                        {show?.original_language === 'en' ?
                                            <div>
                                                Language: English
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        {/* the [0] is doesn't seem to be working, added todo */}
                                        {/* Runtime: {show?.episode_run_time[0]} minutes */}
                                    </div>
                                    <div>
                                        {show?.vote_average ?
                                            <div>
                                                Vote Average: {show?.vote_average} / 10
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        Country: {show?.production_countries[0]?.name}
                                    </div>
                                    <div>
                                        {/* add logos to companies later */}
                                        Production Company: {show?.production_companies[0]?.name}
                                    </div>
                                    <div>
                                        Created by: {show?.created_by[0]?.name}
                                    </div>
                                    <div>
                                        Status: {show?.status}
                                    </div>
                                    <div>
                                        {show?.tagline}
                                    </div>
                                    <div>
                                        {show?.overview}
                                    </div>
                                </div>
                                {show ?
                                    <button className='btn btn-danger' onClick={() => playTrailer(show)}>Play Trailer</button>
                                    :
                                    null
                                }
                                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                            </div>
                        </div>
                        <WatchProviders show={show} />
                        <Credits show={show} />
                    </div>
                    :
                    <>
                        <Container>
                            Oops, something went wrong, go back to <a href='/shows'>show</a> page
                        </Container>
                    </>
                }
            </Container>
        </div>
    )
}

export default ShowPage
