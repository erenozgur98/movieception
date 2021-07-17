import React, { useState } from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

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
                    className={navColor ? 'navColor1' : 'navColor2'}
                >
                    <NavbarBrand className='navbar-brand' href='/'>
                        <img src='' className='logo' alt='logo' />
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                            <Nav.Link href='/home' className='nav-link'>
                                Home
                            </Nav.Link>
                            {/* <Nav.Link href='/discover' className='nav-link'>
                            Discover
                    </Nav.Link>
                    <Nav.Link href='/movies' className='nav-link'>
                            Movies
                    </Nav.Link>
                    <Nav.Link href='/shows' className='nav-link'>
                            TV Shows
                    </Nav.Link>
                    <Nav.Link href='/profile' className='nav-link'>
                            Profile
                    </Nav.Link> */}
                            <Nav.Link href='/' className='nav-link' onClick={handleLogout}>
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
                    <NavbarBrand className='navbar-brand' href='/'>
                        <img src='' className='logo' alt='logo' />
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                            <Nav.Link href='/home' className='nav-link'>
                                Home
                            </Nav.Link>
                            <Nav.Link href='/login' className='nav-link'>
                                Login
                            </Nav.Link>
                            {/* <Nav.Link href='/discover' className='nav-link'>
                            Discover
                    </Nav.Link>
                    <Nav.Link href='/movies' className='nav-link'>
                            Movies
                    </Nav.Link>
                    <Nav.Link href='/shows' className='nav-link'>
                            TV Shows
                    </Nav.Link>
                    <Nav.Link href='/profile' className='nav-link'>
                            Profile
                    </Nav.Link> */}
                            <Nav.Link href='/' className='nav-link' onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </div>
    )
};

export default Header
