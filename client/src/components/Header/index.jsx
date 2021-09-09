import React, { useState } from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import './style.css';
import SearchForm from '../SearchForm';
import CurrentUser from '../CurrentUser';

function Header({ user, handleLogout }) {
    const [navColor, updateColor] = useState(false);

    const scrollHandler = () => {
        if (window.scrollY >= 20) {
            updateColor(true);
        } else {
            updateColor(false);
        }
    }

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
                        <h3>True Story</h3>
                    </NavbarBrand>
                    <SearchForm />
                    {/* <NavbarBrand className='navbar-brand' href='/'>
                        <img src='' className='logo' alt='logo' />
                    </NavbarBrand> */}
                    <CurrentUser user={user} />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                            <Nav.Link href='/home' className='nav-link' style={{ color: 'white' }}>
                                Home
                            </Nav.Link>
                            <Nav.Link href='/discover' className='nav-link' style={{ color: 'white' }}>
                                Discover
                            </Nav.Link>
                            <Nav.Link href='/movies' className='nav-link' style={{ color: 'white' }}>
                                Movies
                            </Nav.Link>
                            <Nav.Link href='/shows' className='nav-link' style={{ color: 'white' }}>
                                Shows
                            </Nav.Link>
                            <Nav.Link href='/actors' className='nav-link' style={{ color: 'white' }}>
                                Actors
                            </Nav.Link>
                            <Nav.Link href='/profile' className='nav-link' style={{ color: 'white' }}>
                                Profile
                            </Nav.Link>
                            <Nav.Link href='/' className='nav-link' onClick={handleLogout} style={{ color: 'white' }}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            ) : (
                <Navbar
                    collapseOnSelect
                    expand='lg'
                    variant='dark'
                    sticky='top'
                    className={navColor ? 'navColor1' : 'navColor2'}
                >
                    <NavbarBrand href='/'>
                        <h3>True Story</h3>
                    </NavbarBrand>
                    <SearchForm />
                    {/* <NavbarBrand className='navbar-brand' href='/'>
                        <img src='' className='logo' alt='logo' />
                    </NavbarBrand> */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                            <Nav.Link href='/home' className='nav-link' style={{ color: 'white' }}>
                                Home
                            </Nav.Link>
                            <Nav.Link href='/discover' className='nav-link' style={{ color: 'white' }}>
                                Discover
                            </Nav.Link>
                            <Nav.Link href='/movies' className='nav-link' style={{ color: 'white' }}>
                                Movies
                            </Nav.Link>
                            <Nav.Link href='/shows' className='nav-link' style={{ color: 'white' }}>
                                Shows
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
    )
};

export default Header
