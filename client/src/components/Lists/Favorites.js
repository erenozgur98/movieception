import React from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Checkbox } from '@mui/material';
import './index.css'

const base_url = 'https://image.tmdb.org/t/p/original/';

const Favorites = ({ favoriteMovies, favoriteShows }) => {
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'rgb(116, 15, 15)',
        borderRadius: '15px'
    }));

    const redirect = id => {
        console.log(id)
        // window.location.assign('')
    }

    return (
        <>
            <Grid item xs={12} md={12} style={{ margin: '0rem 2rem' }}>
                <Demo>
                    <Typography variant="h6" style={{ padding: '1rem 0rem', textDecoration: 'underline' }}>
                        Favorites
                    </Typography>
                    {favoriteMovies?.map(x => (
                        <List>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        {x.poster_path ? <Avatar src={`${base_url}${x.poster_path}`} /> : <FolderIcon />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={x.title}
                                />
                            </ListItem>
                        </List>
                    ))}
                </Demo>
            </Grid>
        </>
    )
}

export default Favorites