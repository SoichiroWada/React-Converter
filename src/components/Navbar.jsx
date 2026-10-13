import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'

const pages = [
    { path: '/', label: 'Length' },
    { path: '/weight', label: 'Weight' },
    { path: '/area', label: 'Area' },
    { path: '/time', label: 'Time' },
    { path: '/temperature', label: 'Temperature' },
]

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const current = pages.some(page => page.path === pathname) ? pathname : '/'

    return (
        <nav className="nav-wrapper row" id="navbar">
            <div className="col s12">
                <Link to={"/"}>
                    <div className="brand-logo" id="logo">React Converter</div>
                </Link>
            </div>
            <div className="right" id="links">
                <ul className="hide-on-med-and-down">
                    <li><NavLink to="/" end>Length</NavLink></li>
                    <li><NavLink to="/weight">Weight</NavLink></li>
                    <li><NavLink to="/area">Area</NavLink></li>                    
                    <li><NavLink to="/time">Time</NavLink></li>        
                    <li><NavLink to="/temperature">Temperature</NavLink></li>                    
                </ul>
                {/* Tablets and phones (<= 992px) hide the links above and use this menu. */}
                <select className="browser-default hide-on-large-only nav-select" aria-label="Converter" value={current} onChange={event => navigate(event.target.value)}>
                    {pages.map(page => <option key={page.path} value={page.path}>{page.label}</option>)}
                </select>
            </div>
        </nav>
    )
}

export default Navbar