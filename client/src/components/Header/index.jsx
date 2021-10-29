import React, { useState } from 'react'
import './style.css';
import SearchForm from '../SearchForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Header({ user, handleLogout }) {
    const [opacity, updateColor] = useState(false);

    const scrollHandler = () => {
        if (window.scrollY >= 20) {
            updateColor(true);
        } else {
            updateColor(false);
        }
    };

    window.addEventListener('scroll', scrollHandler);
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link href='/homr'>Home</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link href='/discover'>Discover</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link href='/actors'>Actors</Link></MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: '#131313', opacity: '0.7' }}>
                <Toolbar>
                    <Link href='/' style={{ color: 'white', textDecoration: 'none', fontSize: '1.3rem'}}>
                        TrueStory
                    </Link>
                    <SearchForm />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton> */}
                        <Link href='/home' style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', paddingLeft:'5px'}}>
                            Home
                        </Link>
                        <Link href='/discover' style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', paddingLeft:'5px'}}>
                            Discover
                        </Link>
                        <Link href='/profile' style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', paddingLeft:'5px'}}>
                            Profile
                        </Link>
                        <Link href='/' handleLogout={handleLogout} style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', paddingLeft:'5px'}}>
                            Logout
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
};

export default Header