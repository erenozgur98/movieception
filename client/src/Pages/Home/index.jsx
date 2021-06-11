import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'

// TODOs:
// Search bar to search for movies or tv shows
// Drop down / something similar for the genres so people can sort the listings ( discover, movies, shows )
// Home will have random show or a movie(s) (3 in a row maybe) underneath the search bar( behind the search bar put the Barney picture )
// Make a logo

function Home() {
    const [image, setImage] = useState([]);
    const [result, setResult] = useState([]);
    const searchedItem = useRef();
    // https://image.tmdb.org/t/p/original/

    const clearImage = async () => {
        // window.location.reload();
        await setImage([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let baseUrl = 'https://api.themoviedb.org/3/';
        let apiKey = 'af737f76cdba5b7435e17cc94568c07d';
        let IMGurl = 'https://image.tmdb.org/t/p/w300'

        let movieURL = `${baseUrl}search/movie/?api_key=${apiKey}&query=${searchedItem.current.value}`;
        let tvURL = `${baseUrl}search/tv/?api_key=${apiKey}&query=${searchedItem.current.value}`;

        await fetch(movieURL)
            .then(res => res.json())
            .then(async data => {
                console.log(data)
                await data.results.forEach(async x => {
                    console.log(image)
                    console.log(x.poster_path)
                    await setImage([...image, `${IMGurl}${x.poster_path}`])
                })
            });

        await fetch(tvURL)
            .then(res => res.json())
            .then(async data => {
                console.log(data)
                await data.results.map((x, i) => {
                    console.log(image)
                    console.log(x.poster_path)
                    setImage([...image, `${IMGurl}${x.poster_path}`])


                })
            });
    }


    return (
        <div>
            <h1 className='text-center'>True Story</h1>
            <Container
                className="d-flex align-items-center flex-column"
            >
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="input-group">
                        <div className="form-outline">
                            <input
                                type="search"
                                id="form1"
                                className="form-control"
                                ref={searchedItem}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                    </div>
                </form>
                <div>
                    {image ? image.map((x, i) =>
                        <img
                            key={x}
                            src={x}
                            alt='img'
                        />
                        // <div className="card" style={{ width: "18rem" }}>
                        //     <img className="card-img-top" src={x} key={x} alt="Card" />
                        //     <div className="card-body" key={x}>
                        //         <h5 className="card-title">Card title</h5>
                        //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        //         <a href="/" className="btn btn-primary">Go somewhere</a>
                        //     </div>
                        // </div>
                    )
                        : null}
                </div>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={clearImage}
                >
                    Clear
                </button>
            </Container>
        </div>
    )
}

export default Home

