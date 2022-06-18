import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import './ExternalId.css';

function ExternalId({ externalId, link, CollectionId }) {
    const StyledDiv = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `

    // setting imdb link either name or title depending on pathname
    const search = useLocation();
    const imdbNameOrTitle = search?.pathname.includes('actors');

    return (
        <StyledDiv>
            <div style={{ marginBottom: '1rem' }}>Social Links</div>
            <div>
                {link?.vote_average > 0 &&
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i class="fas fa-star fa-2x" />
                        <span style={{ fontSize: '1.8rem', paddingLeft: '0.4rem' }}>{link?.vote_average}</span>
                        <span style={{ paddingLeft: '0.4rem', fontSize: '1.2rem' }}>/ 10</span>
                    </div>
                }
            </div>
            <div>
                {externalId?.imdb_id &&
                    <a
                        href={`https://www.imdb.com/${imdbNameOrTitle ? 'name' : 'title'}/${externalId?.imdb_id}/`}
                        target="_blank"
                        rel="noreferrer"
                        className='links'
                    >
                        <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                    </a>
                }
                {externalId?.facebook_id &&
                    <a
                        href={`https://www.facebook.com/${externalId?.facebook_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className='links'
                    >
                        <i className="fab fa-facebook-square" style={{ fontSize: "42px" }}></i>
                    </a>
                }
                {externalId?.instagram_id &&
                    <a
                        href={`https://www.instagram.com/${externalId?.instagram_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className='links'
                    >
                        <i className="fab fa-instagram-square" style={{ fontSize: "42px" }}></i>
                    </a>
                }
                {externalId?.twitter_id &&
                    <a
                        href={`https://www.twitter.com/${externalId?.twitter_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className='links'
                    >
                        <i className="fab fa-twitter-square" style={{ fontSize: "42px" }}></i>
                    </a>
                }
            </div>
            <div className="homepage">
                {link?.homepage &&
                    <button
                        onClick={() => window.open(link?.homepage, '_blank')}
                        className='btn btn-primary'
                    >
                        Homepage
                    </button>
                }
            </div>
            <div className='collection'>
                {CollectionId &&
                    <button
                        className='btn btn-secondary'
                        onClick={() => window.location.assign(`/movies/${link.id}/collections/${CollectionId}`)}
                    >
                        Go To Collection
                    </button>
                }
            </div>
        </StyledDiv>
    )
}

export default ExternalId
