import React from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, IconButton, Checkbox, Collapse } from '@mui/material';
import './index.css'

const base_url = 'https://image.tmdb.org/t/p/original/';

const Favorites = ({ favoriteMovies, favoriteShows }) => {
    const [open, setOpen] = React.useState(false);

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'rgb(116, 15, 15)',
        borderRadius: '15px'
    }));

    const handleClick = () => {
        setOpen(!open);
    }

    const redirect = id => {
        window.location.assign(`/movies/${id}`)
    }

    const remove = id => {
        console.log(id)
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
                            {favoriteMovies.map(x => (
                                <List disablePadding>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => remove(x.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemButton onClick={() => redirect(x.id)}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {x.poster_path ? <Avatar src={`${base_url}${x.poster_path}`} /> : <FolderIcon />}
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
        </>
    )
} 

export default Favorites