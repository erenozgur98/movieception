import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios'
import Banner from '../../components/Banner';
import Credits from '../../components/Credits';
import ExternalId from '../../components/ExternalId';
import WatchProviders from '../../components/WatchProviders';
import '../MoviePage/MoviePage.css';
import Overview from '../../components/Overview';
import Recommendations from '../../components/Recommendations';
import Seasons from '../../components/Seasons';
import styled from 'styled-components';
import Trailer from '../../components/Trailer';
import { useTitle } from '../../components/useTitle';
import Buttons from '../../components/Buttons';
import CircularProgress from '@mui/material/CircularProgress';

function ShowPage({ user }) {
    const [show, setShow] = useState({});
    const [externalId, setExternalId] = useState();
    const [videos, setVideos] = useState();
    const [trailerModal, setTrailerModal] = useState(false);
    const [documentTitle, setDocumentTitle] = useTitle();
    const [loading, setLoading] = useState(false);
    const { ShowId } = useParams();

    useEffect(() => {
        document.title = documentTitle ?? 'Movieception';
    }, [documentTitle])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const request = await axios.get(`/tv/${ShowId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestExternalId = await axios.get(`tv/${ShowId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestVideos = await axios.get(`tv/${ShowId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
            setShow(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
            setDocumentTitle(request.data?.title || request.data?.name || request.data?.original_title)
            setLoading(false);
        }
        if (ShowId) {
            fetchData();
        }
    }, [ShowId]);

    const StyledMainContainer = styled(Container)`
        position: relative;
        bottom: 25rem;
        @media (max-width: 1048px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `

    const StyledContainer = styled(Container)`
        display: flex;
        @media (max-width: 1048px) {
            flex-direction: column;
        }
    `

    const StyledImg = styled.img`
        max-width: 324px;
        margin-bottom: 1rem;
        border-radius: 3rem;
    `

    const StyledOverviewDiv = styled.div`
        padding-left: 2rem;
        margin-top: 10rem;
        @media (max-width: 1048px) {
            margin-top: 0;
            padding-left: 0;
        }
    `
    const StyledLeftSide = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
    `

    return (
        <div>
            {loading ? (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10rem'
                }}>
                    <CircularProgress size={70} />
                </div>
            ) : (
                <>
                    <Banner link={show?.backdrop_path} />
                    <StyledMainContainer>
                        <StyledContainer>
                            <StyledLeftSide>
                                <div>
                                    <div>
                                        <StyledImg
                                            src={
                                                `https://image.tmdb.org/t/p/original${show?.poster_path}`
                                            }
                                            alt={show?.original_title}
                                        />
                                    </div>
                                    <WatchProviders show={show} />
                                    <div className="social-media-links">
                                        <ExternalId
                                            link={show}
                                            externalId={externalId}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {
                                        user?.username &&
                                        <Buttons
                                            user={user}
                                            movie={show}
                                        />
                                    }
                                </div>
                            </StyledLeftSide>
                            <StyledOverviewDiv>
                                <Overview link={show} />
                                <Seasons show={show} />
                                <div
                                    style={{ textAlign: 'center', marginTop: '2rem' }}
                                >
                                    <button
                                        onClick={() => setTrailerModal(true)}
                                        className='btn btn-success'
                                    >
                                        Watch Trailer
                                    </button>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '2rem',
                                        textDecoration: 'underline',
                                        fontSize: '1.3rem'
                                    }}
                                >
                                    The cast of {show?.original_title || show?.name}
                                </div>
                                <Credits show={show} />
                                <Recommendations show={show} />
                            </StyledOverviewDiv>
                        </StyledContainer>
                        <Trailer
                            videos={videos}
                            show={trailerModal}
                            handleClose={() => setTrailerModal(false)}
                        />
                    </StyledMainContainer>
                </>
            )}
        </div>
    )
}

export default ShowPage
