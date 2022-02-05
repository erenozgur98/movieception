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
        padding-left: 4rem;
    `

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{link?.original_title || link?.name}</h1>
            <StyledDivCenter style={{ fontStyle: "italic", padding: '12px 0px' }}>
                {link?.tagline && <div>{link?.tagline}</div>}
            </StyledDivCenter>
            <StyledDivCenter>{link?.genres?.map(x => <StyledChip label={x?.name} color='warning' />)}</StyledDivCenter>
            <StyledDivPadding style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                {link?.overview && <div>{link?.overview}</div>}
            </StyledDivPadding>
            <StyledDivPadding>
                {(link?.release_date || link?.first_air_date) && (
                    <div>
                        Release Date: {link?.release_date || link?.first_air_date}
                    </div>
                )}
            </StyledDivPadding>
            <StyledDivPadding>
                {link?.original_language === 'en' &&
                    <div>
                        Language: English
                    </div>
                }
            </StyledDivPadding>
            <StyledDivPadding>
                {link?.runtime &&
                    <div>
                        Runtime: {link?.runtime} minutes
                    </div>
                }
            </StyledDivPadding>
            <StyledDivPadding>
                {link?.budget &&
                    <div>
                        Budget: ${link?.budget}
                    </div>
                }
            </StyledDivPadding>
            <StyledDivPadding>
                {link?.revenue &&
                    <div>
                        Revenue: ${link?.revenue}
                    </div>
                }
            </StyledDivPadding>
            <StyledDivPadding>
                {link?.production_countries &&
                    <div>
                        Country: {link?.production_countries[0]?.name}
                    </div>
                }
            </StyledDivPadding>
            <StyledDivPadding>
                {/* add logos to companies later */}
                {link?.production_companies &&
                    <div>
                        Production Company: {link?.production_companies[0]?.name}
                    </div>
                }
            </StyledDivPadding>
            <StyledDivPadding>
                {/* maybe add this too? will consider */}
                {link?.belongs_to_collection &&
                    <div>
                        Collection: {link?.belongs_to_collection?.name}
                    </div>
                }
            </StyledDivPadding>
        </div>
    )
}

export default Overview;
