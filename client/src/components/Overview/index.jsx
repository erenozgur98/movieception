import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const Overview = ({ link }) => {
    const StyledChip = styled(Chip)`
        padding: 8px;
        margin: 8px;
    `

    const StyledDivCenter = styled.div`
        text-align: center;
    `

    const StyledDivPadding = styled.div`
        // padding-left: 4rem;
    `

    const StyledBottomSection = styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    `

    const StyledDivInBottomSection = styled.div`
        padding: .2rem .5rem;
    `
    const StyledSpan = styled.span`
        color: #b6894e;
    `

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const date = new Date(link?.release_date || link?.first_air_date || link?.air_date);
    const nextEpisodeDate = new Date(link?.next_episode_to_air?.air_date);
    const lastEpisodeDate = new Date(link?.last_episode_to_air?.air_date);

    return (
        <div>
            {/* Top Section */}
            <h1 style={{ textAlign: 'center' }}>{link?.original_title || link?.name}</h1>

            <StyledDivCenter style={{ fontStyle: "italic", padding: '12px 0px' }}>
                {link?.tagline && <div>{link?.tagline}</div>}
            </StyledDivCenter>

            <StyledDivCenter>
                {link?.genres?.map(x => <StyledChip label={x?.name} color='success' />)}
            </StyledDivCenter>

            <StyledDivPadding style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                {link?.overview && <div>{link?.overview}</div>}
            </StyledDivPadding>

            <div style={{ marginBottom: '2rem' }}>
                {link?.last_episode_to_air &&
                    <StyledDivPadding style={{ textAlign: 'center' }}>
                        Last Episode To Air: <StyledSpan>Season {link?.last_episode_to_air?.season_number} Episode {link?.last_episode_to_air?.episode_number}</StyledSpan> in <StyledSpan>{lastEpisodeDate.toLocaleString('en-US', options)}</StyledSpan>
                    </StyledDivPadding>
                }
                {link?.next_episode_to_air &&
                    <StyledDivPadding style={{ textAlign: 'center' }}>
                        Next Episode To Air: <StyledSpan>Season {link?.next_episode_to_air?.season_number} Episode {link?.next_episode_to_air?.episode_number}</StyledSpan> in <StyledSpan>{nextEpisodeDate.toLocaleString('en-US', options)}</StyledSpan>
                    </StyledDivPadding>
                }
            </div>

            <StyledDivPadding style={{ textAlign: 'center' }}>
                {link?.status && <div>Status: <StyledSpan>{link?.status}</StyledSpan></div>}
            </StyledDivPadding>

            {/* Bottom section */}
            <StyledBottomSection>
                {date &&
                    <StyledDivInBottomSection>
                        Release Date: <StyledSpan>{date.toLocaleString('en-US', options)}</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {link?.original_language === 'en' &&
                    <StyledDivInBottomSection>
                        Language: <StyledSpan>English</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {link?.runtime > 0 &&
                    <StyledDivInBottomSection>
                        Runtime: <StyledSpan>{link?.runtime} minutes</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {link?.budget > 0 &&
                    <StyledDivInBottomSection>
                        Budget: <StyledSpan>{link?.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {link?.revenue > 0 &&
                    <StyledDivInBottomSection>
                        Revenue: <StyledSpan>{link?.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {link?.production_countries &&
                    <StyledDivInBottomSection>
                        Country: <StyledSpan>{link?.production_countries[0]?.name}</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {/* add logos to companies later */}
                {link?.production_companies.length &&
                    <StyledDivInBottomSection>
                        Production Company: <StyledSpan>{link?.production_companies[0]?.name}</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {/* maybe add this too? will consider */}
                {link?.belongs_to_collection &&
                    <StyledDivInBottomSection>
                        Collection: <StyledSpan>{link?.belongs_to_collection?.name}</StyledSpan>
                    </StyledDivInBottomSection>
                }
                {link?.number_of_episodes &&
                    <StyledDivInBottomSection>
                        Total Episodes: <StyledSpan>{link?.number_of_episodes}</StyledSpan>
                    </StyledDivInBottomSection>
                }
            </StyledBottomSection>
        </div>
    )
}

export default Overview;
