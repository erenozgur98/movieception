import React, { useState } from 'react'
import { Navbar, Nav, NavbarBrand, DropdownButton, Dropdown, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import './style.css';
import SearchForm from '../SearchForm';
import CurrentUser from '../CurrentUser';
import Login from '../../Pages/Login';

function Header({ user, handleLogout }) {
    const [search, setSearch] = useState(false);
    const [login, setLogin] = useState(false);
    const [navColor, updateColor] = useState(false);

    const scrollHandler = () => {
        if (window.scrollY >= 20) {
            updateColor(true);
        } else {
            updateColor(false);
        }
    };

    window.addEventListener('scroll', scrollHandler);

    return (
        <div className="main-nav">
            {user.username ? (
                <Navbar
                    collapseOnSelect
                    expand='lg'
                    variant='dark'
                    sticky='top'
                    className={navColor ? 'navColor2' : 'navColor1'}
                >
                    <NavbarBrand href='/'>
                        <h4>True Story</h4>
                    </NavbarBrand>
                    <SearchForm />
                    {/* <NavbarBrand className='navbar-brand' href='/'>
                        <img src='' className='logo' alt='logo' />
                    </NavbarBrand> */}
                    <CurrentUser user={user} />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                            {/* <Nav.Link href='/home' className='nav-link' style={{ color: 'white' }}>
                                Home
                            </Nav.Link> */}
                            <Button
                                href='/home'
                                variant='secondary'
                                style={{ color: 'white', height: '2.34rem', margin: '0.2rem' }}
                            >
                                Home
                            </Button>
                            {/* <Nav.Link href='/discover' className='nav-link' style={{ color: 'white' }}>
                                Discover
                            </Nav.Link> */}
                            <DropdownButton variant='secondary' title="Discover">
                                <Dropdown.Item href="/discover/movies">Movies</Dropdown.Item>
                                <Dropdown.Item href="/discover/shows">Shows</Dropdown.Item>
                                <Dropdown.Item href="/actors">Actors</Dropdown.Item>
                            </DropdownButton>
                            <Button
                                href='/profile'
                                variant='secondary'
                                className='nav-link'
                                style={{ color: 'white', height: '2.34rem', margin: '0.2rem' }}
                            >
                                Profile
                            </Button>
                            <Button
                                href='/'
                                variant='secondary'
                                className='nav-link'
                                onClick={handleLogout}
                                style={{ color: 'white', height: '2.34rem', margin: '0.2rem' }}
                            >
                                Logout
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            ) : (
                <Navbar
                    collapseOnSelect
                    expand='lg'
                    variant='dark'
                    sticky='top'
                    className={navColor ? 'navColor2' : 'navColor1'}
                >
                    <NavbarBrand href='/'>
                        <h4>True Story</h4>
                    </NavbarBrand>
                    <SearchForm />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                            <Nav.Link href='/home' className='nav-link' style={{ color: 'white' }}>
                                Home
                            </Nav.Link>
                            <Nav.Link href='/discover' className='nav-link' style={{ color: 'white' }}>
                                Discover
                            </Nav.Link>
                            <Nav.Link href='/actors' className='nav-link' style={{ color: 'white' }}>
                                Actors
                            </Nav.Link>
                            <Nav.Link href='/login' className='nav-link' style={{ color: 'white' }}>
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </div>
    );
};

export default Header





{/*
    <div
    // className="header"
    className={navColor ? 'navColor2' : 'navColor1'}
>
    <div
        className="nav-item"
    >
        <i className="fas fa-search" onClick={handleSearch}></i>
        {search && <SearchForm />}
    </div>
    <Link to='/' className='navbar-links'>
        True Story
    </Link>
    <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
    </div>
    <Link to='/' className='navbar-links'>
        Home
    </Link>
    <div className='nav-item' onMouseEnter={onMouseEnter1} onMouseLeave={onMouseLeave1}>
        <Link to='/discover' className='nav-links'>
            Discover
            <i className='fas fa-caret-down' />
        </Link>
        {dropdown1 && <Dropdown />}
    </div>
    <div className='nav-item'>
        <div onClick={handleLogin}>Login</div>
        {login && <Login />}
    </div>
</div>
*/}