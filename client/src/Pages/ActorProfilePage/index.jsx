import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';

function ActorProfilePage() {
    const [actor, setActor] = useState({});
    const { ActorId } = useParams();

    useEffect(() => {
        // API.getOneActor, will be set later
    }, [ActorId])

    return (
        <Container>
            {/* banner, has actor's movies? backdrop path */}

            {/* actual actor picture */}
            {/* make the actor picture sticky after scroll? will look into that later when styling */}

            {/* under actor picture external id's eg FB link, IG link, twitter link if available */}

            {/* actor name */}

            {/* age born: day,yr,place */}

            {/* actor biography */}

            {/* credits -> get movie/shows credits which movie/show the actor played in */}
            <div className="background-picture">
                <img src="https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg" alt="robert downey jr" className='movie-background' />
            </div>
            <div>
                <p>
                    birthday: 1965-04-04
                    deathday: null
                    gender: 2 ( male )
                    imdb_id: nm0000375
                    known_for_department: acting
                    name: robert downey Jr
                    place_of_birth: manhattan, newyork, usa
                    popularity: 19,675
                </p>
                <p>
                    Robert John Downey Jr. (born April 4, 1965) is an American actor and producer. Downey made his screen debut in 1970, at the age of five, when he appeared in his father's film Pound, and has worked consistently in film and television ever since. He received two Academy Award nominations for his roles in films Chaplin (1992) and Tropic Thunder (2008).\n\nDowney Jr. is most known for his role in the Marvel Cinematic Universe as Tony Stark/Iron Man. He has appeared as the character in Iron Man (2008), The Incredible Hulk (2008), Iron Man 2 (2010), The Avengers (2012), Iron Man 3 (2013), Avengers: Age of Ultron (2015), Captain America: Civil War (2016), Spider-Man: Homecoming (2017), Avengers: Infinity War (2018), and Avengers: Endgame (2019).
                </p>
            </div>
            {/* /person/{person_id}/images <-- to get images */}
            {/* /person/{person_id}/tagged_images <-- to get tagged images, more on that later */}
            {/* /person/{person_id}/tv_credits <-- to get tv_credits */}
            {/* /person/{person_id}/movie_credits <-- to get movie_credits */}
            


        </Container>
    )
}

export default ActorProfilePage
