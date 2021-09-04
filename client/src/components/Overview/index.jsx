import React from 'react'

function Overview({ link }) {
    return (
        <div>
            <h2>{link?.original_title || link?.name}</h2>
            <div>
                <a href={`https://www.imdb.com/title/${link?.imdb_id}/`} target="_blank" rel="noreferrer">
                    <i className="fab fa-imdb" style={{ fontSize: "42px" }}></i>
                </a>
            </div>
            <div className="movie-overview">
                <a href={link?.homepage} target="_blank" rel="noreferrer">Homepage</a>
            </div>
            <div>
                {link?.release_date || link?.first_air_date ?
                    <div>
                        Release Date: {link?.release_date}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {/* Genres: {link?.genres.map(x => x.name)} */}
            </div>
            <div>
                {link?.original_language === 'en' ?
                    <div>
                        Language: English
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.runtime ?
                    <div>
                        Runtime: {link?.runtime} minutes
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.vote_average ?
                    <div>
                        Vote Average: {link?.vote_average} / 10
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.budget ?
                    <div>
                        Budget: ${link?.budget}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.revenue ?
                    <div>
                        Revenue: ${link?.revenue}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.production_countries ?
                    <div>
                        Country: {link?.production_countries[0]?.name}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {/* add logos to companies later */}
                {link?.production_companies ?
                    <div>
                        Production Company: {link?.production_companies[0]?.name}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {/* maybe add this too? will consider */}
                {link?.belongs_to_collection ?
                    <div>
                        Collection: {link?.belongs_to_collection?.name}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.tagline ?
                    <div>
                        {link?.tagline}
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {link?.overview ?
                    <div>
                        {link?.overview}
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Overview;
