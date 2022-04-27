import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from '../../components/Axios';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import Skeleton from '@mui/material/Skeleton';
import Credits from '../../components/Credits';
import Buttons from '../../components/Buttons';
import Trailer from '../../components/Trailer';
import Overview from '../../components/Overview';
import ExternalId from '../../components/ExternalId';
import { useTitle } from '../../components/useTitle';
import WatchProviders from '../../components/WatchProviders';
import CircularProgress from '@mui/material/CircularProgress';
import Recommendations from '../../components/Recommendations';
import "./MoviePage.css"

function MoviePage({ user }) {
    const { MovieId } = useParams();
    const [movie, setMovie] = useState({});
    const [videos, setVideos] = useState();
    const [loading, setLoading] = useState(false);
    const [externalId, setExternalId] = useState();
    const [documentTitle, setDocumentTitle] = useTitle();
    const [trailerModal, setTrailerModal] = useState(false);

    useEffect(() => {
        document.title = documentTitle ?? 'True Story';
    }, [documentTitle])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const request = await axios.get(`/movie/${MovieId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestVideos = await axios.get(`/movie/${MovieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
            const requestExternalId = await axios.get(`movie/${MovieId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`);
            setMovie(request.data);
            setExternalId(requestExternalId.data);
            setVideos(requestVideos.data.results);
            setDocumentTitle(request.data?.original_title || request.data?.title || request.data?.name)
            setLoading(false)
        }
        fetchData();
    }, [])

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
                    <Banner link={movie?.backdrop_path} />
                    <StyledMainContainer>
                        <StyledContainer>
                            <StyledLeftSide>
                                <div>
                                    <div>
                                        {!movie?.poster_path ? (
                                            // <CircularProgress />
                                            <Skeleton
                                                width={324}
                                                height={486}
                                                variant='rectangular'
                                                sx={{ bgcolor: 'rgba(133, 132, 132, 0.5)' }}
                                            />
                                        ) : (
                                            <>
                                                <StyledImg
                                                    src={
                                                        `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                                                    }
                                                    alt={movie?.original_title}
                                                />

                                            </>
                                        )}
                                    </div>
                                    <WatchProviders movie={movie} />
                                    <div className='social-media-links'>
                                        <ExternalId
                                            link={movie}
                                            externalId={externalId}
                                            CollectionId={movie?.belongs_to_collection?.id}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {
                                        user?.username &&
                                        <Buttons
                                            user={user}
                                            movie={movie}
                                        />
                                    }
                                </div>
                            </StyledLeftSide>
                            <StyledOverviewDiv>
                                <Overview link={movie} />
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
                                    The cast of {movie?.original_title}
                                </div>
                                <Credits movie={movie} />
                                <Recommendations movie={movie} />
                            </StyledOverviewDiv>
                        </StyledContainer>
                        <Trailer
                            videos={videos}
                            show={trailerModal}
                            handleClose={() => setTrailerModal(false)}
                        />
                    </StyledMainContainer>
                </>
            )
            }
        </div >
    )
}

export default MoviePage
