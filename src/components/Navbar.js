import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {

    return (
        <nav id="navbar" className="nav-wrapper">
            <div className="container">
                <Link to={"/"}>
                    <div className="brand-logo" id="logo">React Converter</div>
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to="/length">Length</NavLink></li>
                    <li><NavLink to="/temperature">Temperature</NavLink></li>
                    <li><NavLink to="/test">Test</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)