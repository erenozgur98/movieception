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
import { Nav, NavDropdown } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import StyledComponents from 'styled-components';

function Header({ user, handleLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const StyledNavLink = StyledComponents(Nav.Link)`
    color: white;
    font-size: 1.1rem;
    &:hover {
        color: white;
    }
`

    const StyledMenu = styled(Menu)(({ theme }) => ({
        '& .MuiList-root': {
            backgroundColor: '#131313'
        }
    }));

    const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
        '& .MuiTypography-root': {
            color: 'white',
            textDecoration: 'none'
        }
    }));

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <StyledMenu
            style={{ marginTop: '2rem' }}
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
            <StyledMenuItem onClick={handleMenuClose}><Link href='/home'>Home</Link></StyledMenuItem>
            <StyledMenuItem onClick={handleMenuClose}><Link href='/discover'>Discover</Link></StyledMenuItem>
            <StyledMenuItem onClick={handleMenuClose}><Link href='/actors'>Actors</Link></StyledMenuItem>
        </StyledMenu>
    );

    const discover = [
        {
            title: 'All',
            route: '/discover'
        },
        {
            title: 'Movies',
            route: '/discover/movies'
        },
        {
            title: 'Shows',
            route: '/discover/shows'
        },
        {
            title: 'Actors',
            route: '/actors'
        },
    ]

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: '#131313' }}>
                <Toolbar>
                    <Link href='/' style={{ color: 'white', textDecoration: 'none', fontSize: '1.3rem', marginRight: '0.8rem' }}>
                        True<span style={{ paddingLeft: '5px' }}>Story</span>
                    </Link>
                    <SearchForm />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Nav>
                            <StyledNavLink
                                href='/home'
                            >
                                Home
                            </StyledNavLink>
                            <NavDropdown
                                style={{ fontSize: '1.1rem' }}
                                title={<span style={{ color: 'white' }}>Discover</span>}
                                id="basic-nav-dropdown"
                            >
                                {discover.map(g => (
                                    <NavDropdown.Item
                                        href={g.route}
                                    >
                                        {g.title}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            {user?.username ? (
                                <StyledNavLink
                                    href='/profile'
                                >
                                    Profile
                                </StyledNavLink>
                            ) : (
                                null
                            )}
                            {user?.username ? (
                                <StyledNavLink
                                    href='/'
                                    handleLogout={handleLogout}
                                >
                                    Logout
                                </StyledNavLink>
                            ) : (
                                <StyledNavLink
                                    href='/login'
                                    handleLogout={handleLogout}
                                >
                                    Login
                                </StyledNavLink>
                            )}
                        </Nav>
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