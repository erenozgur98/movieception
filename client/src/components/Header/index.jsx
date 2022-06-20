import React, { useState } from 'react'
import LoginModal from '../Login';
import API from '../../utils/API';
import { Nav } from 'react-bootstrap';
import SearchForm from '../SearchForm';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import StyledComponents from 'styled-components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Link, Menu, AppBar, Button, MenuItem, IconButton, Toolbar } from '@mui/material';
import './style.css';

function Header({ user, setUser }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const [loginModal, setLoginModal] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 0, 0)');
    const isMenuOpen = Boolean(anchorEl);

    const StyledIconButton = StyledComponents(IconButton)`
    color: white;
    font-size 1.1rem;
    &:hover {
        color: white;
        text-decoration: none;
    }
    `
    const StyledMenuLink = StyledComponents(Nav.Link)`
    color: white;
    font-size: 1rem;
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

    const StyledDiv = StyledComponents.div`
        margin: 5px;
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

    const scrollHandler = () => {
        if (window.pageYOffset >= 20) {
            setBackgroundColor('rgba(0, 0, 0, 1)');
        } else {
            setBackgroundColor('rgba(0, 0, 0, 0)');
        }
    };

    window.addEventListener('scroll', scrollHandler);

    const handleLogout = () => {
        setUser({});
        API.logOut();
        window.location.reload();
    };

    const handleProfileMenuOpen = e => {
        setBackgroundColor('rgba(0, 0, 0, 1)');
        setAnchorEl(e.currentTarget);
    };

    const handleAccountMenu = e => {
        setBackgroundColor('rgba(0, 0, 0, 1)');
        setAccountAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setBackgroundColor(window.scrollY >= 20 ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)');
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
            <StyledMenuLink href={'/home'} onClick={handleMenuClose}>Home</StyledMenuLink>
            <StyledMenuLink href='/discover' onClick={handleMenuClose}>Discover</StyledMenuLink>
            <StyledMenuLink href='/discover/movies' onClick={handleMenuClose}>Movies</StyledMenuLink>
            <StyledMenuLink href='/discover/shows' onClick={handleMenuClose}>Shows</StyledMenuLink>
            <StyledMenuLink href='/actor' onClick={handleMenuClose}>Actors</StyledMenuLink>
            {!user?.username && (
                <StyledMenuLink onClick={() => {
                    setAccountAnchorEl(null)
                    setLoginModal(true)
                }}>
                    Login
                </StyledMenuLink>
            )}
        </StyledMenu>
    );

    const accountMenu = (
        <StyledMenu
            id='menu-appbar'
            anchorEl={accountAnchorEl}
            keepMounted
            open={Boolean(accountAnchorEl)}
            onClose={() => {
                setBackgroundColor(window.scrollY >= 20 ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)');
                setAccountAnchorEl(null)
            }}
        >
            <StyledMenuLink href={`/users/${user?.username}`}>Profile</StyledMenuLink>
            <StyledMenuLink href='/settings'>Settings</StyledMenuLink>
            <StyledMenuLink onClick={() => {
                setAccountAnchorEl(null)
                handleLogout()
            }}>
                Logout
            </StyledMenuLink>
        </StyledMenu>
    )

    const AppBarStyle = {
        backgroundColor: backgroundColor,
        transition: '0.6s all ease-in-out'
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar id="main-header" position="fixed" style={AppBarStyle}>
                    <Toolbar>
                        <Link href='/' style={{ color: 'white', textDecoration: 'none', fontSize: '1.3rem', marginRight: '0.8rem' }}>
                            {/* True<span style={{ paddingLeft: '5px' }}>Story</span> */}
                            Movieception
                        </Link>
                        <SearchForm />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Nav>
                                {/* <StyledNavLink
                                    href='/home'
                                >
                                    Home
                                </StyledNavLink> */}
                                <StyledIconButton
                                    color='inherit'
                                    href='/home'
                                >
                                    Home
                                </StyledIconButton>
                                <StyledIconButton
                                    color='inherit'
                                    href='/discover'
                                >
                                    Discover
                                </StyledIconButton>
                                <StyledIconButton
                                    color='inherit'
                                    href='/discover/movies'
                                >
                                    Movies
                                </StyledIconButton>
                                <StyledIconButton
                                    color='inherit'
                                    href='/discover/shows'
                                >
                                    Shows
                                </StyledIconButton>
                                {user?.username ? (
                                    <IconButton
                                        size="small"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleAccountMenu}
                                        onClose={() => setBackgroundColor('rgba(0, 0, 0, 0)')}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                ) : (
                                    <StyledIconButton
                                        color='inherit'
                                        onClick={() => setLoginModal(true)}
                                    >
                                        Login
                                    </StyledIconButton>
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
                            {user?.username && <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleAccountMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>}
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