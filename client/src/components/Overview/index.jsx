import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const Overview = ({ link }) => {
    const StyledChip = styled(Chip)`
        padding: 8px;
        margin: 8px;
    `

    return (
        <div>
            <h1>{link?.original_title || link?.name}</h1>
            <div style={{ fontStyle: "italic", padding: '12px 0px' }}>
                {link?.tagline &&
                    <div>
                        {link?.tagline}
                    </div>
                }
            </div>
            <div>{link?.genres?.map(x => <StyledChip label={x?.name} color='warning' />)}</div>
            <div>
                {link?.imdb_id &&
                    <a href={`https://www.imdb.com/title/${link?.imdb_id}/`} target="_blank" rel="noreferrer">
                        <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                    </a>
                }
            </div>
            <div className="movie-overview">
                {link?.homepage &&
                    <Chip label='Homepage' color='primary' onClick={() => window.open(link?.homepage, '_blank')} />
                }
            </div>
            <div>
                {(link?.release_date || link?.first_air_date) && (
                    <div>
                        Release Date: {link?.release_date || link?.first_air_date}
                    </div>
                )}
            </div>
            <div>
                {link?.original_language === 'en' &&
                    <div>
                        Language: English
                    </div>
                }
            </div>
            <div>
                {link?.runtime &&
                    <div>
                        Runtime: {link?.runtime} minutes
                    </div>
                }
            </div>
            <div>
                {link?.vote_average &&
                    <div>
                        Vote Average: {link?.vote_average} / 10
                    </div>
                }
            </div>
            <div>
                {link?.budget &&
                    <div>
                        Budget: ${link?.budget}
                    </div>
                }
            </div>
            <div>
                {link?.revenue &&
                    <div>
                        Revenue: ${link?.revenue}
                    </div>
                }
            </div>
            <div>
                {link?.production_countries &&
                    <div>
                        Country: {link?.production_countries[0]?.name}
                    </div>
                }
            </div>
            <div>
                {/* add logos to companies later */}
                {link?.production_companies &&
                    <div>
                        Production Company: {link?.production_companies[0]?.name}
                    </div>
                }
            </div>
            <div>
                {/* maybe add this too? will consider */}
                {link?.belongs_to_collection &&
                    <div>
                        Collection: {link?.belongs_to_collection?.name}
                    </div>
                }
            </div>
            <div>
                {link?.overview &&
                    <div>
                        {link?.overview}
                    </div>
                }
            </div>
        </div>
    )
}

export default Overview;
