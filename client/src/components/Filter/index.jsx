import React, { useEffect } from "react"
import filterBtns from "./filterBtns"
import { Chip } from '@mui/material'
import styled from 'styled-components'

function Filter({ movies, setFilteredResults, activeGenre, setActiveGenre }) {
    useEffect(() => {
        if (activeGenre === 0) {
            setFilteredResults(movies);
            return
        }
        const filtered = movies.filter(movie => movie.genre_ids.includes(activeGenre))
        setFilteredResults(filtered)
    }, [activeGenre])

    const StyledDiv = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 1rem;
    `

    return (
        <StyledDiv
        >
            {filterBtns.map(btn => (
                <Chip
                    label={btn.name}
                    id={btn.id}
                    variant='outlined'
                    onClick={() => setActiveGenre(btn.id)}
                />
            ))}
        </StyledDiv>
    )
}

export default Filter;
