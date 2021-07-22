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

    const search = useRef();

    const handleSearch = (e) => {
        if (e.charCode === 13) {
            API.search(search.current.value)
                .then(res => setResult(res.data.Search))
            console.log(result)
            console.log(user)
        }
    }

    const randomMovie = () => {
        console.log('random movie');
    }

    const randomShow = () => {
        console.log('random show');
    }

    return (
        <div className='bg'>
            <Container className="d-flex justify-content-center">
                {/* <div>
                    {user.username === null ? <h3>Good morning, user.username</h3> : <h3>Good morning! You can <a href='/login'>login</a> or <a href='/signup'>signup</a>!</h3>}
                </div> */}
                <div>
                    <div className="form-outline">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            onKeyPress={handleSearch}
                            ref={search}
                        />
                    </div>
                    {/* add font awesome icons, make sure it works */}
                    {/* <button type='button' className='btn btn-primary' onClick={handleSearch}>
                        <i class="fas fa-search"></i>
                    </button> */}
                </div>
            </Container>
            <Container className="d-flex justify-content-center">
                <div>
                    <button type='button' className='btn btn-warning' onClick={randomMovie}>
                        Random Movie
                    </button>
                    <button type='button' className='btn btn-warning' onClick={randomShow}>
                        Random Show
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
        </div>
    )
}

export default Home

