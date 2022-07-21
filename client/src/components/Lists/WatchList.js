import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, IconButton, Checkbox, Collapse } from '@mui/material';
import './index.css';
import ConfirmModal from "./ConfirmModal";
import API from '../../utils/API'
import { useSnackbar } from 'notistack'
import { base_url } from '../../utils/helper';

const WatchList = ({ movieWatchList, setMovieWatchList, showWatchList, setShowWatchList, user }) => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [information, setInformation] = useState({})
    const [disabled, setDisabled] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        setOpen(!open);
    }

    const redirect = id => {
        window.location.assign(`/movies/${id}`)
    }

    const remove = (id, title, isMovie) => {
        setModalOpen(true)
        setInformation({
            list: 'watch list',
            id: id,
            title: title,
            isMovie: isMovie
        })
    }

    const removeForReal = () => {
        // use information
        setDisabled(true)
        if (information.isMovie) {
            API.removeMovieFromWatchList(user.username, information.id)
                .then(res => {
                    if (res.status === 200) {
                        setDisabled(false)
                        setModalOpen(false)
                        setMovieWatchList(res.data.movieWatchList)
                        enqueueSnackbar('Successfully removed from your watch list!', {
                            variant: 'success'
                        })
                        setOpen(true)
                    }
                })
        } else {
            API.removeShowFromWatchList(user.username, information.id)
                .then(res => {
                    if (res.status === 200) {
                        setDisabled(false)
                        setModalOpen(false)
                        setShowWatchList(res.data.showWatchList)
                        enqueueSnackbar('Successfully removed from your watch list!', {
                            variant: 'success'
                        })
                        setOpen(true)
                    }
                })
        }
    }

    movieWatchList?.forEach(movie => {
        movie.isMovie = true
    })
    showWatchList?.forEach(show => {
        show.isMovie = false
    })

    const combinedArray = (movieWatchList?.length && showWatchList?.length) ? [].concat(movieWatchList, showWatchList) : movieWatchList?.length ? movieWatchList : showWatchList
    combinedArray.sort((a, b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0))

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'rgb(203, 193, 50)',
        borderRadius: '15px'
    }));
    return (
        <>
            <div className='main-grid-component'>
                <Grid item xs={12} md={12}>
                    <Demo>
                        <Typography variant="h6" style={{ padding: '1rem 0rem', textDecoration: 'underline' }}>
                            To Watch List
                        </Typography>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <PlaylistAddCheckRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="To Watch List" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {combinedArray.map(x => (
                                <List disablePadding>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => remove(x.id, x.title, x.isMovie)}>
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

export default WatchList