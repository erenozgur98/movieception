import React, { useRef } from 'react'

// TODOs:
// Search bar to search for movies or tv shows
// Drop down / something similar for the genres so people can sort the listings ( discover, movies, shows )
// Home will have random show or a movie(s) (3 in a row maybe) underneath the search bar( behind the search bar put the Barney picture )
// Make a logo

// let baseUrl = 'https://api.themoviedb.org/3/';
// let apiKey = 'af737f76cdba5b7435e17cc94568c07d';
// let TV = 'scrubs';
// let MOVIE = 'Avengers'
// let TVurl = `${baseUrl}search/tv/?api_key=${apiKey}&query=${TV}`;
// let MOVIEurl = `${baseUrl}search/movie/?api_key=${apiKey}&query=${MOVIE}`;
// let IMGurl = `${baseUrl}configuration?api_key=${apiKey}`

// // to get to the poster sizes use IMGurl

// // to use images use => secure base url(can get from IMGurl) + poster size (eg w500 (width 500)) + poster_path (from the url itself) ==> https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg

// fetch(TVurl)
//     .then(res => res.json())
//     .then(data => console.log(data))

function Home() {
    const searchedItem = useRef();

    // let MOVIE = 'Avengers'
    let baseUrl = 'https://api.themoviedb.org/3/';
    let apiKey = 'af737f76cdba5b7435e17cc94568c07d';
    let URL = `${baseUrl}search/movie/?api_key=${apiKey}&query=${searchedItem}`;

    const handleSubmit = async () => {
        fetch(URL)
            .then(res => res.json())
            .then(data => console.log(data));
    }


    return (
        <div>
            <h1 className='text-center'>True Story</h1>
            <div className="input-group">
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" ref={searchedItem} />
                    <label className="form-label" htmlFor="form1">Search</label>
                </div>
                <button type="button" className="btn btn-primary" onSubmit={handleSubmit}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    )
}

export default Home
