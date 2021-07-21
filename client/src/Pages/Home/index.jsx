import React, { Component } from 'react'
import { useRef } from 'react';
import { Container } from 'react-bootstrap'
import Card from '../../components/Card';
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

function Home() {

    const search = useRef();

    const handleSearch = (target) => {
        if (target.charCode === 13) {
            console.log(search.current.value);
        }
    }

    const randomMovie = () => {
        console.log(search.current.value);
    }

    const randomShow = () => {
        console.log(search.current.value);
    }

    return (
        <Container className=''>
            <div className="input-group rounded">
                <div className="form-outline">
                    <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search"
                        ref={search}
                        onKeyPress={handleSearch}
                    />
                </div>
                {/* <button type='button' className='btn btn-primary' onClick={handleSearch}>
                    Search
                </button> */}
            </div>
            <div>
                <button type='button' className='btn btn-warning' onClick={randomMovie}>
                    Random Movie
                </button>
                <button type='button' className='btn btn-warning' onClick={randomShow}>
                    Random Show
                </button>
            </div>
        </Container>
    )
}

export default Home

