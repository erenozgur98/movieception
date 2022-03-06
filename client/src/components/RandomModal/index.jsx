import React, { useState } from "react";
import Genres from '../Genres'
import requests from '../Requests'
import axios from '../Axios'
import { useHistory } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Modal, InputLabel, MenuItem, Select, FormControl, Typography, FormHelperText } from '@mui/material';
import './randomModal.css'

function RandomModal({ show, handleClose }) {
    const [genre, setGenre] = useState('')
    const [movie, setMovie] = useState('')

    const history = useHistory();

    const handleChange = (event) => {
        setMovie(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSearch = async () => {
        if (movie === 'Movie') {
            const request = await axios.get(`${requests.fetchMovies}&with_genres=${genre}`)
            history.push(`/movies/${request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]?.id}`)
        } else {
            const request = await axios.get(`${requests.fetchShows}&with_genres=${genre}`)
            if (request.data.results) {
                history.push(`/shows/${request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]?.id}`)
            } else {
                const request = await axios.get(requests.fetchPopularShows)
                history.push(`/shows/${request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]}`)
            }
        }
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <Modal open={show} onClose={handleClose}>
            <Container className='random-main' maxWidth='xs'>
                <ThemeProvider theme={darkTheme}>
                    <Typography component="h1" variant="h5">
                        Please Make Your Selections
                    </Typography>
                    <div className='forms'>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Movie or Show</InputLabel>
                            <Select
                                value={movie}
                                label="Movie or Show"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Movie'}>Movie</MenuItem>
                                <MenuItem value={'TV Show'}>TV Show</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                value={genre}
                                label="Genre"
                                onChange={handleGenreChange}
                            >
                                {Genres.map(genre => (
                                    <MenuItem value={genre.id}>{genre.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <em><FormHelperText style={{ textAlign: 'center' }}>Note, if we can't find any matches with the genre, we'll get some random popular show/movie!</FormHelperText></em>
                    <button
                        onClick={handleSearch}
                        className='btn btn-primary get-btn'
                    >Get Some!
                    </button>
                </ThemeProvider>
            </Container>
        </Modal>
    )
}

export default RandomModal;
