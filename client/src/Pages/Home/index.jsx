import React, { Component, useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Container } from 'react-bootstrap'
import Details from '../../components/Details';
import MovieDetail from '../../components/MovieDetail';
import SearchForm from '../../components/SearchForm';
// import { toast } from 'react-toastify';
import API from '../../utils/API';

// toast.configure();

// TODOs:
// Search bar to search for movies or tv shows
// Drop down / something similar for the genres so people can sort the listings ( discover, movies, shows )
// Home will have random show or a movie(s) (3 in a row maybe) underneath the search bar( behind the search bar put the Barney picture )
// Make a logo
// Make toast work

// class Home extends Component {
//     state = {
//         result: {},
//         search: ""
//     };

//     // When this component mounts, search for the movie "The Avengers"
//     componentDidMount() {
//         this.searchMovies("The Avengers");
//     }

//     searchMovies = query => {
//         API.search(query)
//             // .then(res => console.log(res.data))
//             .then(res => this.setState({ result: res.data }))
//             .catch(err => console.log(err));
//     };

//     handleInputChange = e => {
//         const value = e.target.value;
//         const name = e.target.name;
//         this.setState({
//             [name]: value
//         });
//     };

//     // When the form is submitted, search the OMDB API for the value of `this.state.search`
//     handleFormSubmit = e => {
//         e.preventDefault();
//         this.searchMovies(this.state.search);
//     };

//     render() {
//         return (
//             <Container>
//                 <div>
//                     <h1 className='text-center'>True Story</h1>
//                 </div>
//                 <Card
//                     heading={this.state.result.Title || "Search for a Movie to Begin"}
//                 >
//                     {this.state.result.Title ? (
//                         // this.state.result.map(movie => (
//                             <MovieDetail
//                                 title={this.state.result.Title}
//                                 src={this.state.result.Poster}
//                                 director={this.state.result.Director}
//                                 genre={this.state.result.Genre}
//                                 released={this.state.result.Released}
//                             />
//                         // ))
//                     ) : (
//                         <h3>No Results to Display</h3>
//                     )}
//                 </Card>
//                 <Card heading="Search">
//                     <SearchForm
//                         value={this.state.search}
//                         handleInputChange={this.handleInputChange}
//                         handleFormSubmit={this.handleFormSubmit}
//                     />
//                 </Card>
//             </Container>
//         );
//     }
// }

// export default Home;

function Home({ user }) {
    const [result, setResult] = useState([]);
    const [randomMovie, setRandomMovie] = useState({});
    const [randomShow, setRandomShow] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [currentTime, setCurrentTime] = useState();

    useEffect(() => {
        if (user) setCurrentUser(user.username)
    }, [user]);

    let rightNow = ''

    // useEffect(() => {
    //     const today = new Date()
    //     const time = today.getHours() + ':' + today.getMinutes()

    //     if (time < '12:00') {
    //         rightNow = 'morning'
    //     } else if (time < '18:00') {
    //         rightNow = 'afternoon'
    //     } else {
    //         rightNow = 'evening'
    //     }
    // }, []);

    const search = useRef();

    const randomNumbers = Math.floor(100000 + Math.random() * 9000000);



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
        API.searchShowId(`tt${randomNumbers}`)
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
                <div>
                    {currentUser ? (
                        `Good ${rightNow}, ${currentUser}!`
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

