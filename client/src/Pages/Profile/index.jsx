import React, { useState } from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import styled from 'styled-components'

function Profile({ user }) {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ backgroundColor: 'red', marginTop: '4rem' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab style={{ color: 'white' }} label="Favorites" value="1" />
                        <Tab style={{ color: 'white' }} label="Watchlist" value="2" />
                        <Tab style={{ color: 'white' }} label="Watched List" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">Favorites</TabPanel>
                <TabPanel value="2">Watchlist</TabPanel>
                <TabPanel value="3">Watched List</TabPanel>
            </TabContext>
        </Box>
    )
}

export default Profile



