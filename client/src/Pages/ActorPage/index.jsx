import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import Banner from '../../components/Banner';
import ExternalId from '../../components/ExternalId';
import MovieCredits from '../../components/MovieCredits';
import './ActorPage.css'
import styled from 'styled-components';
import { useTitle } from '../../components/useTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { base_url } from '../../utils/helper';

function ActorPage() {
    const [actor, setActor] = useState({});
    const [actorPictures, setActorPictures] = useState([]);
    const [externalId, setExternalId] = useState();
    const [movieCredits, setMovieCredits] = useState([]);
    const [randomInt,] = useState(Math.floor(Math.random() * 10))
    const [documentTitle, setDocumentTitle] = useTitle();
    const [loading, setLoading] = useState(false);
    const [truncate, setTruncate] = useState(true);
    const { ActorId } = useParams();

    useEffect(() => {
        document.title = documentTitle ?? 'Movieception'
    }, [documentTitle])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const request = await axios.get(`/person/${ActorId}?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestExternalId = await axios.get(`person/${ActorId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`);
            const requestActorImages = await axios.get(`person/${ActorId}/images?api_key=${process.env.REACT_APP_API_KEY}`)
            const requestMovieCredits = await axios.get(`/person/${ActorId}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`);
            setActor(request.data);
            setExternalId(requestExternalId.data);
            setActorPictures(requestActorImages.data.profiles);
            setMovieCredits(requestMovieCredits.data.cast);
            setDocumentTitle(request.data?.name)
            setLoading(false)
        }
        fetchData()
    }, [ActorId]);

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
        flex-direction: column;
        
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
    const StyledSpan = styled.span`
        color: #b6894e;
    `

    const slicedPictures = actorPictures.slice(0, 10);
    const date = new Date(actor?.birthday);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };

    movieCredits.sort((a, b) => (a.release_date > b.release_date) ? -1 : ((b.release_date > a.release_date) ? 1 : 0))

    return (
        <>
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
                <div>
                    {movieCredits[randomInt]?.backdrop_path ?
                        <Banner link={movieCredits[randomInt]?.backdrop_path} title={movieCredits[randomInt]?.title} />
                        :
                        <Banner link={movieCredits[randomInt + 1]?.backdrop_path} title={movieCredits[randomInt + 1]?.title} />
                    }
                    <StyledMainContainer>
                        <StyledContainer>
                            <div className='page-organization'>
                                <div>
                                    <StyledImg
                                        src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`}
                                        alt={actor?.name}
                                    />
                                    <div className='social-media-links'>
                                        <ExternalId externalId={externalId} link={actor} />
                                    </div>
                                </div>
                                <StyledOverviewDiv>
                                    <div className="overview">
                                        <h2>{actor?.name}</h2>
                                        <div>
                                            {actor?.birthday &&
                                                <div>
                                                    Born <StyledSpan>{date.toLocaleString('en-US', options)}</StyledSpan> in <StyledSpan>{actor?.place_of_birth}</StyledSpan>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='biography'>
                                        {/* at least 382 is required for the overview to have truncate class added into */}
                                        {actor.biography?.length > 382 ? (
                                            <>
                                                <div className={`${truncate && 'truncate'}`}>
                                                    {actor?.biography}
                                                </div>
                                                <div className='actor-button' onClick={() => setTruncate(!truncate)}>Read {truncate ? 'More' : 'Less'}</div>
                                            </>
                                        ) : (
                                            <div>{actor?.biography}</div>
                                        )
                                        }
                                    </div>
                                    <div>
                                        <h4 style={{ textAlign: 'center' }}>Known For</h4>
                                        <MovieCredits actor={actor} />
                                    </div>
                                    <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>{actor?.name}'s Images</h4>
                                    <div className='actor-pictures'>
                                        {slicedPictures.map((x) => (
                                            x?.file_path &&
                                            <img
                                                key={x.id}
                                                src={`${base_url}${x.file_path}`}
                                                alt={x?.width}
                                                className='actor-images'
                                            />
                                        ))}
                                    </div>
                                </StyledOverviewDiv>
                            </div>
                        </StyledContainer>
                    </StyledMainContainer>
                </div>
            )}
        </>
    )
}

export default ActorPage
