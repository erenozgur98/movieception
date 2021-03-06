import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';

function EpisodePage() {
    const [show, setShow] = useState([]);
    const [episode, setEpisode] = useState({});
    const [credits, setCredits] = useState();
    const { ShowId } = useParams();
    const { SeasonId } = useParams();
    const { EpisodeId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const requestEpisode = await axios.get(`/tv/${ShowId}/season/${SeasonId}/episode/${EpisodeId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const request = await axios.get(`/tv/${ShowId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestCredits = await axios.get(`tv/${ShowId}/season/${SeasonId}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
            setEpisode(requestEpisode.data);
            setCredits(requestCredits.data);
            // subtracting 1 because array starts from 0 but seasons start from 1
            setShow(request.data.seasons[SeasonId - 1]);
        }
        fetchData();
    }, [ShowId, SeasonId, EpisodeId]);

    return (
        <div>
            {/* add button to add to watched list */}
            {episode ?
                <Banner link={episode?.still_path} title={episode?.name} />
                :
                null
            }
            <Container>
                {episode?.still_path ?
                    <div>
                        <div className="page-organization">
                            <div>
                                <div className="poster-picture">
                                    <img src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="black-widow" className='movie-poster' />
                                </div>
                            </div>
                            <div className="bottom-section">
                                <h2>{episode?.season_number}x{episode?.episode_number} {episode?.name}</h2>
                                <div>
                                    {episode?.overview ?
                                        <div>{episode?.overview}</div>
                                        :
                                        null
                                    }
                                </div>
                                <h3>This episodes cast: </h3>
                                <Credits credits={credits} />
                            </div>
                        </div>
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

export default EpisodePage
