import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Container } from 'react-bootstrap'
// import MovieDetail from '../../components/MovieDetail';
// import { toast } from 'react-toastify';
import requests from '../../components/Requests';
// import Banner from '../../components/Banner';
// import Details from '../../components/Details';
import Row from '../../components/Row';

function Home({ user }) {
    const [result, setResult] = useState([]);
    // const [randomMovie, setRandomMovie] = useState({});
    // const [randomShow, setRandomShow] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (user) setCurrentUser(user.username)
    }, [user]);

    const search = useRef();

    // const randomNumbers = Math.floor(100000 + Math.random() * 9000000);

    const handleSearch = () => {
        const searchedMovie = search.current.value
        setResult(searchedMovie)
    }

    const handleSearchEnter = (e) => {
        if (e.charCode === 13) {
            const searchedMovie = search.current.value
            setResult(searchedMovie)
        }
    };

    const handleRandomMovie = () => {
        setResult([]);
        // setRandomShow([]);
    };

    const handleRandomShow = () => {
        setResult([]);
        // setRandomMovie([]);
    };

    const clear = () => {
        setResult([])
        window.location.reload();
    };

    return (
        <div>
            {/* <Banner /> */}
            <Container className="d-flex justify-content-center">
                <div>
                    {currentUser ? (
                        `Hello, ${currentUser}!`
                    ) : (
                        <p>You can login from <a href='/login'>here</a></p>
                    )}
                </div>
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
            {/* <Container className="d-flex justify-content-center">
                <div>
                    <button type='button' className='btn btn-warning' onClick={handleRandomMovie}>
                        Random Movie
                    </button>
                    <button type='button' className='btn btn-warning' onClick={handleRandomShow}>
                        Random Show
                    </button>
                </div>
            </Container> */}
            <Container className="d-flex justify-content-center">
                <div>
                    <button type='button' className='btn btn-danger' onClick={clear}>
                        Clear
                    </button>
                </div>
            </Container>
            <div>
                {/* <MovieDetail fetchUrl={`${requests.fetchSearchMulti}${result}`} /> */}
                {result && <Row fetchUrl={`${requests.fetchSearchMulti}${result}`} title='Search Results' />}
            </div>
        </div>
    )
}

export default Home

