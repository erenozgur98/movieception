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

    const date = new Date(link?.release_date || link?.first_air_date);
    return (
        <div>
            {/* Top Section */}
            <h1 style={{ textAlign: 'center' }}>{link?.original_title || link?.name}</h1>
            <StyledDivCenter style={{ fontStyle: "italic", padding: '12px 0px' }}>
                {link?.tagline && <div>{link?.tagline}</div>}
            </StyledDivCenter>
            <StyledDivCenter>
                {link?.genres?.map(x => <StyledChip label={x?.name} color='warning' />)}
            </StyledDivCenter>
            <StyledDivPadding style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                {link?.overview && <div>{link?.overview}</div>}
            </StyledDivPadding>

            {/* Bottom section */}
            <StyledBottomSection>
                {date && <StyledDivInBottomSection>
                    Release Date: <StyledSpan>{date.toLocaleString('en-US', options)}</StyledSpan>
                </StyledDivInBottomSection>}
                {link?.original_language === 'en' && <StyledDivInBottomSection>
                    Language: <StyledSpan>English</StyledSpan>
                </StyledDivInBottomSection>}
                {link?.runtime && <StyledDivInBottomSection>
                    Runtime: <StyledSpan>{link?.runtime} minutes</StyledSpan>
                </StyledDivInBottomSection>}
                {link?.budget && <StyledDivInBottomSection>
                    Budget: <StyledSpan>{link?.budget.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</StyledSpan>
                </StyledDivInBottomSection>}
                {link?.revenue && <StyledDivInBottomSection>
                    Revenue: <StyledSpan>{link?.revenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</StyledSpan>
                </StyledDivInBottomSection>}
                {link?.production_countries && <StyledDivInBottomSection>
                    Country: <StyledSpan>{link?.production_countries[0]?.name}</StyledSpan>
                </StyledDivInBottomSection>}
                {/* add logos to companies later */}
                {link?.production_companies && <StyledDivInBottomSection>
                    Production Company: <StyledSpan>{link?.production_companies[0]?.name}</StyledSpan>
                </StyledDivInBottomSection>}
                {/* maybe add this too? will consider */}
                {link?.belongs_to_collection && <StyledDivInBottomSection>
                    Collection: <StyledSpan>{link?.belongs_to_collection?.name}</StyledSpan>
                </StyledDivInBottomSection>}
            </StyledBottomSection>
        </div>
    )
}

export default Overview;
