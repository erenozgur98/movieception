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
import Overview from '../../components/Overview';
import Recommendations from '../../components/Recommendations';
import Seasons from '../../components/Seasons';

function ShowPage() {
    const [, setLoading] = useState(false);
    const [show, setShow] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerUrl, setTrailerUrl] = useState('');
    const { ShowId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneMovie, will be set later
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(`/tv/${ShowId}?api_key=${apiKey}`);
            const requestExternalId = await axios.get(`tv/${ShowId}/external_ids?api_key=${apiKey}`);
            const requestVideos = await axios.get(`tv/${ShowId}/videos?api_key=${apiKey}`);
            // const seasons = await axios.get(`/tv/${ShowId}/season`)
            setShow(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
            setLoading(false);
        }
        fetchData();
        document.title = `${show?.title || show?.name}`;
    }, [ShowId]);

    const playTrailer = () => {
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

    console.log(show)

    return (
        <div>
            {show?.poster_path ?
                <Banner link={show?.backdrop_path} title={show?.original_name} />
                :
                null}
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
                                <Overview link={show} />
                                <button className='btn btn-danger' onClick={playTrailer}>Play Trailer</button>
                                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                            </div>
                        </div>
                        <WatchProviders show={show} />
                        <div>The cast of {show.name}:</div>
                        <Credits show={show} />
                        <Seasons show={show} />
                        <Recommendations show={show} />
                    </div>
                    :
                    <>
                        <Container style={{ textAlign: 'center', paddingTop: '70px' }}>
                            Oops, something went wrong, go back to <a href='/shows'>show</a> or <a href='/'>home</a> page
                        </Container>
                    </>
                }
            </Container>
        </div>
    )
}

export default ShowPage
