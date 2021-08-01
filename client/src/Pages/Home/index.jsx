import React, { Component, useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Container } from 'react-bootstrap'
import Details from '../../components/Details';
import MovieDetail from '../../components/MovieDetail';
import SearchForm from '../../components/SearchForm';
// import { toast } from 'react-toastify';
import API from '../../utils/API';

function Home({ user }) {
    const [result, setResult] = useState([]);
    const [randomMovie, setRandomMovie] = useState({});
    const [randomShow, setRandomShow] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (user) setCurrentUser(user.username)
    }, [user]);

    const search = useRef();

    // const randomNumbers = Math.floor(100000 + Math.random() * 9000000);

    const handleSearch = () => {
        API.search(search.current.value)
            .then(res => setResult(res.data.Search))
    }

    const handleSearchEnter = (e) => {
        if (e.charCode === 13) {
            API.search(search.current.value)
                .then(res => setResult(res.data.Search))
        }
    };

    const handleRandomMovie = () => {
        // API.searchMovieId(`tt${randomNumbers}`)
        API.searchMovieId(`tt0145487`)
            // .then(res => setRandomMovie(res.data))
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
        setResult([]);
        setRandomShow([]);
    };

    const handleRandomShow = () => {
        API.searchShowId(`tt0145487`)
            .then(res => {
                console.log(res.data)
                console.log(res)
            })
        // .then(res => setRandomShow(res.data))
        setResult([]);
        setRandomMovie([]);
    };

    const clear = () => {
        setResult([])
    };

    return (
        <div className='bg'>
            <Container className="d-flex justify-content-center">
                {/* <div>
                    {currentUser ? (
                        `Hello, ${currentUser}!`
                    ) : (
                        <p>You can login from <a href='/login'>here</a></p>
                    )}
                </div> */}
            </Container>
            <Container className="d-flex justify-content-center">
                <div>
                    <div className="form-outline">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            onKeyPress={handleSearchEnter}
                            ref={search}
                        />
                    </div>
                </div>
                <button type='button' className='btn btn-primary' onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                </button>
            </Container>
            <Container className="d-flex justify-content-center">
                <div>
                    <button type='button' className='btn btn-warning' onClick={handleRandomMovie}>
                        Random Movie
                    </button>
                    <button type='button' className='btn btn-warning' onClick={handleRandomShow}>
                        Random Show
                    </button>
                </div>
            </Container>
            <Container className="d-flex justify-content-center">
                <div>
                    <button type='button' className='btn btn-danger' onClick={clear}>
                        Clear
                    </button>
                </div>
            </Container>
            <div>
                {!result.Title ? (
                    <div className='row'>
                        {result.map((x, i) => (
                            <div className="row d-flex justify-content-center" style={{ paddingBottom: '12px', paddingTop: '12px' }}>
                                <div className="col-sm-4">
                                    <MovieDetail
                                        key={i}
                                        {...x}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2>No Results Have Found</h2>
                )}
            </div>
            {/* <div>
                {!randomMovie.Response === "False" ? (
                    <Details
                        src={randomMovie.Poster}
                        title={randomMovie.Title}
                        plot={randomMovie.Plot}
                        rating={randomMovie.imdbRating}
                        votes={randomMovie.imdbVotes}
                        released={randomMovie.Released}
                    />
                ) : (
                    <h3>Oops, guess not so lucky! Try again :)</h3>
                )}
            </div>
            <div>
                {!randomShow.Response === "False" ? (
                    <Details
                        src={randomShow.Poster}
                        title={randomShow.Title}
                        plot={randomShow.Plot}
                        rating={randomShow.imdbRating}
                        votes={randomShow.imdbVotes}
                        released={randomShow.Released}
                    />
                ) : (
                    <h3>Oops, guess not so lucky! Try again :)</h3>
                )}
            </div> */}
        </div>
    )
}

export default Home

