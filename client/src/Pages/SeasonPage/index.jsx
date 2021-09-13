import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Overview from '../../components/Overview';
import './SeasonPage.css';
import Episodes from '../../components/Episodes';

const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function SeasonPage() {
    const [show, setShow] = useState({});
    const [credits, setCredits] = useState();
    const { SeasonId } = useParams();
    const { ShowId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const requestCredits = await axios.get(`tv/${ShowId}/season/${SeasonId}/aggregate_credits?api_key=${apiKey}`);
            const request = await axios.get(`/tv/${ShowId}?api_key=${apiKey}`);
            setCredits(requestCredits.data);
            setShow(request.data.seasons[SeasonId]);
        }
        fetchData();
    }, [SeasonId, ShowId]);

    // to get episodes: /tv/{tv_id}/season/{season_number}/episode/{episode_number}
    console.log('show hereeeeee', show)

    return (
        <div>
            {/* show returns name, overview, air_date, episode_count, id, poster_path, season_number */}
            <Container>
                {show.poster_path ?
                    <div>
                        <div className="page-organization">
                            <div>
                                <div className="poster-picture">
                                    <img src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="black-widow" className='movie-poster' />
                                </div>
                            </div>
                            <div className="bottom-section">
                                <Overview link={show} />
                                <Episodes show={show} ShowId={ShowId} SeasonId={SeasonId} />
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

export default SeasonPage;
