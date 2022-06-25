import React from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Checkbox } from '@mui/material';
import './index.css'

const base_url = 'https://image.tmdb.org/t/p/original/';

const History = ({ watchedMovies, watchedShows }) => {
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'green',
        borderRadius: '15px'
    }));
    return (
        <>
            <Grid item xs={12} md={12} style={{ margin: '0rem 2rem' }}>
                <Demo>
                    <Typography variant="h6" style={{ padding: '1rem 0rem', textDecoration: 'underline' }}>
                        History
                    </Typography>
                    {watchedMovies.map(x => (
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
                                        {x[1] ? <Avatar src={`${base_url}${x[1]}`} /> : <FolderIcon />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={x[2]}
                                />
                            </ListItem>
                        </List>
                    ))}
                </Demo>
            </Grid>
        </>
    )
}

export default History