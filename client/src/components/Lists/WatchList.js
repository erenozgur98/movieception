import React from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, IconButton, Checkbox, Collapse } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import './index.css'

const base_url = 'https://image.tmdb.org/t/p/original/';

const WatchList = ({ movieWatchList, showWatchList }) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    }

    const redirect = id => {
        window.location.assign(`/movies/${id}`)
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'rgb(203, 193, 50)',
        borderRadius: '15px'
    }));
    return (
        <>
            <Grid item xs={12} md={12} style={{ margin: '0rem 2rem' }}>
                <Demo>
                    <Typography variant="h6" style={{ padding: '1rem 0rem', textDecoration: 'underline' }}>
                        WatchList
                    </Typography>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {movieWatchList.map(x => (
                        <List>
                            <ListItemButton onClick={() => redirect(x.id)}>
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
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    ))}
                </Demo>
            </Grid>
        </>
    )
}

export default WatchList