import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, IconButton, Checkbox, Collapse } from '@mui/material';
import './index.css'
import ConfirmModal from "./ConfirmModal";
import API from '../../utils/API'
import { useSnackbar } from 'notistack'
import { base_url } from '../../utils/helper';

const Favorites = ({ favoriteMovies, setFavoriteMovies, favoriteShows, setFavoriteShows, user }) => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [information, setInformation] = useState({})
    const [disabled, setDisabled] = useState(false)

    const { enqueueSnackbar } = useSnackbar();
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'rgb(116, 15, 15)',
        borderRadius: '15px'
    }));

    favoriteMovies?.forEach(movie => {
        movie.isMovie = true
    });
    favoriteShows?.forEach(show => {
        show.isMovie = false
    });

    const combinedArray = (favoriteMovies?.length && favoriteShows?.length) ? [].concat(favoriteMovies, favoriteShows) : favoriteMovies?.length ? favoriteMovies : favoriteShows
    combinedArray?.sort((a, b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0))

    const handleClick = () => {
        setOpen(!open);
    }

    const redirect = id => {
        window.location.assign(`/movies/${id}`)
    }

    const remove = (id, title, isMovie) => {
        setModalOpen(true)
        setInformation({
            list: 'favorites',
            id: id,
            title: title,
            isMovie: isMovie
        })
    }

    const removeForReal = () => {
        // use information
        setDisabled(true)
        if (information.isMovie) {
            API.removeMovieFromFavorites(user.username, information.id)
                .then(res => {
                    if (res.status === 200) {
                        setDisabled(false)
                        setModalOpen(false)
                        setFavoriteMovies(res.data.movieFavorites)
                        enqueueSnackbar('Successfully removed from your favorites!', {
                            variant: 'success'
                        })
                        setOpen(true)
                    }
                })
        } else {
            API.removeShowFromFavorites(user.username, information.id)
                .then(res => {
                    if (res.status === 200) {
                        setDisabled(false)
                        setModalOpen(false)
                        setFavoriteShows(res.data.showFavorites)
                        enqueueSnackbar('Successfully removed from your favorites!', {
                            variant: 'success'
                        })
                        setOpen(true)
                    }
                })
        }
    }

    return (
        <>
            <div className='main-grid-component'>
                <Grid item xs={12} md={12}>
                    <Demo>
                        <Typography variant="h6" style={{ padding: '1rem 0rem', textDecoration: 'underline' }}>
                            Favorites
                        </Typography>
                        <ListItemButton onClick={handleClick} >
                            <ListItemIcon>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Favorites" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {combinedArray?.map(x => (
                                <List disablePadding>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => remove(x.id, x.title, x.isMovie)}
                                                disabled={disabled}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemButton onClick={() => redirect(x.id)}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {x.poster_path ? <Avatar src={`${base_url}/${x.poster_path}`} /> : <FolderIcon />}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={x.title}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            ))}
                        </Collapse>
                    </Demo>
                </Grid>
            </div>
            <ConfirmModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                information={information}
                removeForReal={removeForReal}
                setInformation={setInformation}
            />
        </>
    )
}

export default Favorites