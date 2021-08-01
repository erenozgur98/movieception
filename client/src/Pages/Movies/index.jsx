import React, { useEffect } from 'react'
import API from '../../utils/API'

function Movies() {

    useEffect(() => {
        API.searchMovie()
            .then(res => console.log(res.data))
    }, [])

    return (
        // TODO do the mapping you are going to do to the Discover page here too
        // only change the genre for the movies only
        <div>
            
        </div>
    )
}

export default Movies
