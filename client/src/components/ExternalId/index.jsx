import React from 'react';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import './ExternalId.css';

function ExternalId({ externalId, link }) {
    const StyledDiv = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `

    return (
        <StyledDiv>
            <div>
                {link?.vote_average &&
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i class="fas fa-star fa-2x" />
                        <span style={{ fontSize: '1.8rem', paddingLeft: '0.4rem' }}>{link?.vote_average}</span>
                        <span style={{ paddingLeft: '0.4rem', fontSize: '1.2rem' }}>/ 10</span>
                    </div>
                }
            </div>
            <div className="homepage">
                {link?.homepage &&
                    <Chip
                        label='Homepage'
                        color='primary'
                        onClick={() => window.open(link?.homepage, '_blank')}
                    />
                }
            </div>
            <div>
                {link?.imdb_id &&
                    <a
                        href={`https://www.imdb.com/title/${link?.imdb_id}/`}
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
        </StyledDiv>
    )
}

export default ExternalId
