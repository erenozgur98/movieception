import React, { useState } from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import './style.css';
import SearchForm from '../SearchForm';
import CurrentUser from '../CurrentUser';

function Header({ user, handleLogout }) {
    const [navColor, updateColor] = useState(false);
    const [active, setActive] = useState(false);

    const scrollHandler = () => {
        if (window.scrollY >= 20) {
            updateColor(true);
        } else {
            updateColor(false);
        }
    };

    const handleActive = () => {
        if (active) {
            setActive(false)
        } else {
            setActive(true)
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
                            <Nav.Link href='/home' className='nav-link' style={{ color: 'white' }}>
                                Home
                            </Nav.Link>
                            <Nav.Link href='/discover' className='nav-link' style={{ color: 'white' }}>
                                Discover
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
                <div className='header'>
                    <a href='/' className='link'>Home</a>
                    <div
                        className={active ? "dropdownActive" : "dropdown"}
                    >
                        <button
                            className='link'
                            onClick={() => handleActive()}
                        >
                            Discover
                        </button>
                        <div className="dropdownMenu">
                            <div className="dropdownLinks">
                                <a href='/discover' className='link'>All</a>
                                <a href='/actors' className='link'>Actors</a>
                                <a href='/discover/movies' className='link'>Movies</a>
                                <a href='/discover/shows' className='link'>TV Shows</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Header


{/* <Navbar
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

</Navbar> */}