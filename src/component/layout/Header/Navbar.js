import React from 'react'
import './navbar.css'

const Navbar = () => {
    return (
        <div >
            <div className="navbar">
                <div className="max-width">
                    <div className="logo"><a href="#">
                        {/* <!-- <img src="images/favicon.png"" width="50px" alt="">   --> */}
                        JAW<span>AD.</span>
                    </a></div>
                    <ul className="menu">
                        <li><a href="#home" className="menu-btn">Home</a></li>
                        <li><a href="#about" className="menu-btn">About</a></li>
                        <li><a href="#services" className="menu-btn">Services</a></li>
                        <li><a href="#skills" className="menu-btn">Skills</a></li>
                        <li><a href="#project" className="menu-btn">Project</a></li>
                        <li><a href="blog.html" className="menu-btn">Blog</a></li>
                        <li><a href="#feedback" className="menu-btn">Feedback</a></li>
                        <li><a href="#contact" className="menu-btn">Contact</a></li>
                    </ul>
                    <div className="menu-btn">
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar