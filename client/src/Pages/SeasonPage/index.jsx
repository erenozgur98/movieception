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
import { useTitle } from '../../components/useTitle';

function SeasonPage({ user }) {
    const [show, setShow] = useState({});
    const [credits, setCredits] = useState();
    const [documentTitle, setDocumentTitle] = useTitle();
    const { SeasonId } = useParams();
    const { ShowId } = useParams();

    useEffect(() => {
        document.title = documentTitle ?? 'True Story';
    }, [documentTitle])

    useEffect(() => {
        const fetchData = async () => {
            const requestCredits = await axios.get(`tv/${ShowId}/season/${SeasonId}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
            const request = await axios.get(`/tv/${ShowId}?api_key=${process.env.REACT_APP_API_KEY}`);
            setCredits(requestCredits?.data);
            setShow(request.data.seasons[SeasonId - 1]);
            setDocumentTitle(show?.original_title || show?.title || show?.name)
        }
        fetchData();
    }, [SeasonId, ShowId]);

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 25rem;
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
                            <div className="bottom-section" style={{ marginTop: '15rem' }}>
                                <Overview link={show} />
                                {/* <Credits credits={credits} /> */}
                            </div>
                        </div>
                        <div>
                            <Episodes show={show} ShowId={ShowId} SeasonId={SeasonId} user={user} />
                        </div>
                    </div>
                }
            </StyledMainContainer>
        </div>
    )
}

export default SeasonPage;
