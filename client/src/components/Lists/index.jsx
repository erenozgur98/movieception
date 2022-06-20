import React from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Checkbox } from '@mui/material';

const Lists = () => {
    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: 'black',
    }));


    return (
        <Grid item xs={12} md={3}>
            <Typography variant="h6">
                Avatar with text and icon
            </Typography>
            <Demo>
                <List>
                    {generate(
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>,
                    )}
                </List>
            </Demo>
        </Grid>
    )
}

export default Lists;
