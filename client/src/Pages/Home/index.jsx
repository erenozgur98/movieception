import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
// import Card from '../../components/Card';
// import { toast } from 'react-toastify';

// toast.configure();

// TODOs:
// Search bar to search for movies or tv shows
// Drop down / something similar for the genres so people can sort the listings ( discover, movies, shows )
// Home will have random show or a movie(s) (3 in a row maybe) underneath the search bar( behind the search bar put the Barney picture )
// Make a logo
// Make toast work
let IMGurl = 'https://image.tmdb.org/t/p/w300';

function Home() {
    // const [image, setImage] = useState([]);
    // const [result, setResult] = useState([]);
    // const searchedItem = useRef();
    // // https://image.tmdb.org/t/p/original/

    // let fetchedResult = [];
    // const clearImage = async () => {
    //     // window.location.reload();
    //     await setImage([]);
    //     await setResult([]);
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let baseUrl = 'https://api.themoviedb.org/3/';
    //     let apiKey = 'af737f76cdba5b7435e17cc94568c07d';
    //     let IMGurl = 'https://image.tmdb.org/t/p/w300';

    //     let movieURL = `${baseUrl}search/movie/?api_key=${apiKey}&query=${searchedItem.current.value}`;
    //     let tvURL = `${baseUrl}search/tv/?api_key=${apiKey}&query=${searchedItem.current.value}`;

    //     await fetch(movieURL)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             fetchedResult = data;
    //             console.log(fetchedResult);
    //             if (searchedItem.current.value) {
    //                 data.results.forEach(x => {
    //                     // setImage([...image, { key: x }, `${IMGurl}${x.poster_path}`])
    //                     setResult([...result, {
    //                         image: `${IMGurl}${x.poster_path}`,
    //                         original_name: x.original_name,
    //                         overview: x.overview,
    //                         popularity: x.popularity,
    //                         vote_average: x.vote_average,
    //                         vote_count: x.vote_count,
    //                         key: x
    //                     }])
    //                     console.log(result);
    //                 })
    //             }
    //             // else {
    //             //     toast.warn('You must search for a Show or a Movie!', {
    //             //         autoClose: 2500
    //             //     });
    //             // }
    //         });

    //     await fetch(tvURL)
    //         .then(res => res.json())
    //         .then(async res => {
    //             console.log(res)
    //             if (searchedItem.current.value) {
    //                 await res.results.forEach(x => {
    //                     console.log(result);
    //                     console.log(image);
    //                     setImage([...image, `${IMGurl}${x.poster_path}`])
    //                     // setResult([...result, {
    //                     //     original_name: x.original_name,
    //                     //     overview: x.overview,
    //                     //     popularity: x.popularity,
    //                     //     vote_average: x.vote_average,
    //                     //     vote_count: x.vote_count,
    //                     //     key: x
    //                     // }])
    //                 })
    //             }
    //             //  else {
    //             //     toast.warn('You must search for a Show or a Movie!', {
    //             //         autoClose: 2500
    //             //     });
    //             // }
    //         });
    // }

    return (
        <div>
            <h1 className='text-center'>True Story</h1>
            <Container
                className="d-flex align-items-center flex-column"
            >
                <form
                    // onSubmit={handleSubmit}
                >
                    <div className="input-group">
                        <div className="form-outline">
                            <input
                                type="search"
                                id="form1"
                                className="form-control"
                                // ref={searchedItem}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            // onClick={handleSubmit}
                        >
                            Search
                        </button>
                    </div>
                </form>
                {/* <div>
                    {image ? image.map((x, y) => (
                        <div className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={x} key={y} alt="Card" />
                        </div>
                        // <img
                        //     key={x}
                        //     src={x}
                        //     alt='img'
                        // />
                    )) : null }
                </div> */}
                <div>
                    {/* {fetchedResult.map((x, y) => (
                        // <Card
                        //     original_name={x.original_name}
                        //     overview={x.overview}
                        //     popularity={x.popularity}
                        //     vote_average={x.vote_average}
                        //     vote_count={x.vote_count}
                        //     key={x.key}
                        // />
                        <>
                            <div className='card' style={{ width: '18rem' }}>
                                <img className="card-img-top" src={x.image} key={y} alt="Card" />
                            </div>
                            <div className="card bg-dark mb-3" style={{ width: "18rem" }} key={x}>
                                <div className="card-body" key={x}>
                                    <h5 className="card-title text-center">{x.original_name}</h5>
                                    <p className="card-text text-center">{x.overview}</p>
                                    <p className="card-text text-center">Popularity: {x.popularity}</p>
                                    <p className="card-text text-center">Vote Average: {x.vote_average}</p>
                                    <p className="card-text text-center">Vote Count: {x.vote_count}</p>
                                </div>
                            </div>
                        </>
                    ))} */}
                </div>
                {/* <div>
                    {result ? result.map((x, y) => (
                        // <Card
                        //     original_name={x.original_name}
                        //     overview={x.overview}
                        //     popularity={x.popularity}
                        //     vote_average={x.vote_average}
                        //     vote_count={x.vote_count}
                        //     key={x.key}
                        // />
                        <>
                            <div className='card' style={{ width: '18rem' }}>
                                <img className="card-img-top" src={x.image} key={y} alt="Card" />
                            </div>
                            <div className="card bg-dark mb-3" style={{ width: "18rem" }} key={x}>
                                <div className="card-body" key={x}>
                                    <h5 className="card-title text-center">{x.original_name}</h5>
                                    <p className="card-text text-center">{x.overview}</p>
                                    <p className="card-text text-center">Popularity: {x.popularity}</p>
                                    <p className="card-text text-center">Vote Average: {x.vote_average}</p>
                                    <p className="card-text text-center">Vote Count: {x.vote_count}</p>
                                </div>
                            </div>
                        </>
                    ))
                        : null}
                </div> */}
                <button
                    type='button'
                    className='btn btn-primary'
                    // onClick={clearImage}
                >
                    Clear
                </button>
            </Container>
        </div>
    )
}

export default Home

