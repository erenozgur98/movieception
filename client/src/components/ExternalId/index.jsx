import React from 'react';
import './ExternalId.css';

function ExternalId({ externalId }) {
    return (
        <div>
            {externalId?.facebook_id ?
                <a
                    href={`https://www.facebook.com/${externalId?.facebook_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className='links'
                >
                    <i className="fab fa-facebook-square" style={{ fontSize: "32px" }}></i>
                </a>
                :
                null
            }
            {externalId?.instagram_id ?
                <a
                    href={`https://www.instagram.com/${externalId?.instagram_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className='links'
                >
                    <i className="fab fa-instagram-square" style={{ fontSize: "32px" }}></i>
                </a>
                :
                null
            }
            {externalId?.twitter_id ?
                <a
                    href={`https://www.twitter.com/${externalId?.twitter_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className='links'
                >
                    <i className="fab fa-twitter-square" style={{ fontSize: "32px" }}></i>
                </a>
                :
                null
            }
        </div>
    )
}

export default ExternalId
