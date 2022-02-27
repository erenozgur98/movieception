import React, { useState, useEffect } from "react";
import axios from '../Axios'

function Collections({ CollectionId }) {
    const [collection, setCollection] = useState([])

    const fetchCollectionById = `/collection/${CollectionId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchCollectionById)
            setCollection(request.data)
        }
        fetchData()
    }, [])


    return (
        <></>
    )
}

export default Collections;
