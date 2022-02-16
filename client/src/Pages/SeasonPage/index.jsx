import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Overview from '../../components/Overview';
import './SeasonPage.css';
import Episodes from '../../components/Episodes';
import Credits from '../../components/Credits';

const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function SeasonPage() {
    const [show, setShow] = useState({});
    const [credits, setCredits] = useState();
    const { SeasonId } = useParams();
    const { ShowId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const requestCredits = await axios.get(`tv/${ShowId}/season/${SeasonId}/credits?api_key=${apiKey}`);
            const request = await axios.get(`/tv/${ShowId}?api_key=${apiKey}`);
            setCredits(requestCredits.data);
            console.log(request.data)
            setShow(request.data.seasons[SeasonId - 1]);
        }
        fetchData();
        document.title = `${show?.original_title || show?.title || show?.name}`;
    }, [SeasonId, ShowId]);

    return (
        <div>
            {show?.poster_path ?
                <Banner link={show?.poster_path} title={show?.name} />
                :
                null
            }
            <Container>
                {show?.poster_path ?
                    <div>
                        <div className="page-organization">
                            <div>
                                <div className="poster-picture">
                                    <img src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="black-widow" className='movie-poster' />
                                </div>
                            </div>
                            <div className="bottom-section">
                                <Overview link={show} />
                                <Credits credits={credits} />
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
