import React, { useState } from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import SearchForm from '../SearchForm';
import CurrentUser from '../CurrentUser';
import Dropdown from './Dropdown';

function Header({ user, handleLogout }) {
    const [click, setClick] = useState(false);
    // const [active, setActive] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [navColor, updateColor] = useState(false);

    const handleClick = () => setClick(!click);
    // const closeMobileMenu = () => setClick(false);

    const scrollHandler = () => {
        if (window.scrollY >= 20) {
            updateColor(true);
        } else {
            updateColor(false);
        }
    };

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
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
                <div className="header">
                    <SearchForm />
                    <Link to='/' className='navbar-logo'>
                        True Story
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <div className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Link to='/discover' className='nav-links'>
                            Discover
                            <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
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