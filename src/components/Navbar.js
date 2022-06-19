import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {

    return (
        <nav className="nav-wrapper row" id="navbar">
            <div className="col s12">
                <Link to={"/"}>
                    <div className="brand-logo" id="logo">React Converter</div>
                </Link>
            </div>
            <div className="right" id="links">
                <ul className="hide-on-med-and-down">
                    <li><NavLink to="/length">Length</NavLink></li>
                    <li><NavLink to="/weight">Weight</NavLink></li>
                    <li><NavLink to="/time">Time</NavLink></li>        
                    <li><NavLink to="/temperature">Temperature</NavLink></li>                    
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)