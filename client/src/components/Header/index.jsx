import React, { useState } from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import SearchForm from '../SearchForm';
import CurrentUser from '../CurrentUser';
import Dropdown from './Dropdown';
import Login from '../../Pages/Login';

function Header({ user, handleLogout }) {
    const [click, setClick] = useState(false);
    // const [active, setActive] = useState(false);
    const [dropdown1, setDropdown1] = useState(false);
    const [search, setSearch] = useState(false);
    const [login, setLogin] = useState(false);
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

    const onMouseEnter1 = () => {
        if (window.innerWidth < 960) {
            setDropdown1(false);
        } else {
            setDropdown1(true);
        }
    };

    const onMouseLeave1 = () => {
        if (window.innerWidth < 960) {
            setDropdown1(false);
        } else {
            setDropdown1(false);
        }
    };

    const handleSearch = () => setSearch(!search);
    const handleLogin = () => setLogin(!login);

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
                    <div
                        className="nav-item"
                    >
                        <i className="fas fa-search" onClick={handleSearch}></i>
                        {search && <SearchForm />}
                    </div>
                    <Link to='/' className='navbar-logo'>
                        True Story
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <Link to='/' className='navbar-logo'>
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
            )}
        </div>
    );
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