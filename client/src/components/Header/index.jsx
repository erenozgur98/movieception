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
        <Navbar
            collapseOnSelect
            expand='lg'
            variant='dark'
            sticky='top'
            className={navColor ? 'navColor1' : 'navColor2'}
        >
            <NavbarBrand as={Link} className='navbar-brand' to='/'>
                <img src='' className='logo' alt='logo' />
            </NavbarBrand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className='ml-auto navbar'>
                    <Nav.Link as={Link} to='/home' className='nav-link'>
                        <div className="navLinks">
                            Home
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/login' className='nav-link'>
                        <div className="navLinks">
                            Login
                        </div>
                    </Nav.Link>
                    {/* <Nav.Link as={Link} to='/discover' className='nav-link'>
                        <div className="navLinks">
                            Discover
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/movies' className='nav-link'>
                        <div className="navLinks">
                            Movies
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/shows' className='nav-link'>
                        <div className="navLinks">
                            TV Shows
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/profile' className='nav-link'>
                        <div className="navLinks">
                            Profile
                        </div>
                    </Nav.Link> */}
                    <Nav.Link as={Link} to='/' className='nav-link' onClick={handleLogout}>
                        <div className="navLinks">
                            Logout
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
