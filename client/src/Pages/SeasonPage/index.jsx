import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import Overview from '../../components/Overview';
import './SeasonPage.css';
import Episodes from '../../components/Episodes';
import Credits from '../../components/Credits';
import styled from 'styled-components';

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

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 22rem;
        @media (max-width: 1048px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `

    const StyledImg = styled.img`
        max-width: 324px;
        margin-bottom: 1rem;
        border-radius: 3rem;
    `

    return (
        <div>
            {show?.poster_path ?
                <Banner link={show?.poster_path} title={show?.name} />
                :
                null
            }
            <StyledMainContainer>
                {show?.poster_path &&
                    <div>
                        <div className="page-organization">
                            <div>
                                <div className="poster-picture">
                                    <StyledImg src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="black-widow" className='movie-poster' />
                                </div>
                            </div>
                            <div className="bottom-section">
                                <Overview link={show} />
                                <Credits credits={credits} />
                            </div>
                        </div>
                        <div>
                            <Episodes show={show} ShowId={ShowId} SeasonId={SeasonId} />
                        </div>
                    </div>
                }
            </StyledMainContainer>
        </div>
    )
}

export default SeasonPage;
