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
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Nav, NavDropdown } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import StyledComponents from 'styled-components';
import LoginModal from '../Login'
import API from '../../utils/API';

function Header({ user, setUser }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const [loginModal, setLoginModal] = useState(false);
    const isMenuOpen = Boolean(anchorEl);

    const StyledNavLink = StyledComponents(Nav.Link)`
    color: white;
    font-size: 1.1rem;
    &:hover {
        color: white;
    }
    `

    const StyledButton = StyledComponents(Button)`
        color: white;
        font-side: 1.1rem;
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

    const handleLogout = () => {
        setUser({});
        API.logOut();
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountMenu = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAccountAnchorEl(null);
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
            <StyledMenuItem
                onClick={handleMenuClose}
            >
                <StyledButton href='/home'>Home</StyledButton>
            </StyledMenuItem>
            <StyledMenuItem
                onClick={handleMenuClose}
            >
                <StyledButton href='/discover'>Discover</StyledButton>
            </StyledMenuItem>
            <StyledMenuItem
                onClick={handleMenuClose}
            >
                <StyledButton href='/actors'>Actors</StyledButton>
            </StyledMenuItem>
            {user?.username ? (
                <StyledMenuItem
                    onClick={handleMenuClose}
                >
                    <StyledButton onClick={handleLogout}>Logout</StyledButton>
                </StyledMenuItem>
            ) : (
                <StyledMenuItem
                    onClick={handleMenuClose}
                >
                    <StyledButton onClick={() => setLoginModal(true)}>Login</StyledButton>
                </StyledMenuItem>
            )}
        </StyledMenu>
    );

    const accountMenu = (
        <StyledMenu
            id='menu-appbar'
            anchorEl={accountAnchorEl}
            keepMounted
            open={Boolean(accountAnchorEl)}
            onClose={handleClose}
        >
            <StyledNavLink href='/profile'>Profile</StyledNavLink>
            <StyledNavLink href='/settings'>Settings</StyledNavLink>
            <StyledNavLink onClick={handleLogout}>Logout</StyledNavLink>
        </StyledMenu>
    )

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

    const AppBarStyle = {
        backgroundColor: '#131313',
        opacity: '0.8'
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" style={AppBarStyle}>
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
                                    <IconButton
                                        size="small"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleAccountMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                ) : (
                                    <StyledButton
                                        onClick={() => setLoginModal(true)}
                                    >
                                        Login
                                    </StyledButton>
                                )}
                            </Nav>
                        </Box>
                        {/* Mobile Menu */}
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
                {accountMenu}
            </Box>
            <LoginModal
                setUser={setUser}
                show={loginModal}
                handleClose={() => setLoginModal(false)}
            />
        </>
    );
};

export default Header