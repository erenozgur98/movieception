import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dropdown() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const menuItems = [
        {
            title: 'Movies',
            path: '/discover/movies',
            className: 'dropdown-link'
        },
        {
            title: 'Shows',
            path: '/discover/shows',
            className: 'dropdown-link'
        },
        {
            title: 'Actors',
            path: '/actors',
            className: 'dropdown-link'
        },
    ]

    return (
        <div
            onClick={handleClick}
            className='dropdown'
        >
            {menuItems.map((item, i) => (
                <div key={i}>
                    <Link
                        className={item.className}
                        to={item.path}
                        onClick={() => setClick(false)}
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Dropdown
