import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import '../styles/navbar/navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ selectedItem }) {

    const [clicked, setClicked] = useState(false)
    const [activeLink, setActiveLink] = useState('link1')

    const handleMenuClick = () => {
        setClicked(true)
    }

    const handleCancelClick = () => {
        setClicked(false)
    }

    useEffect(() => {
        setActiveLink(selectedItem)
      });

    return (
        <>
        <nav>
        <Link className={activeLink === 'link1' ? 'active' : ''} to={{pathname:''}}> <img src={logo} id='logo' alt='logo' /> </Link>
            <div>
                <ul id='navbar' className={clicked ? 'navbar active': 'navbar'}> 
                    <li><Link className={activeLink === 'link1' ? 'active' : ''} to={{pathname:''}}>Home</Link></li>
                    <li><Link className={activeLink === 'link4' ? 'active' : ''} to={{pathname:'locations'}}>Skin Care Locations</Link></li>
                    <li><Link className={activeLink === 'link5' ? 'active' : ''} to={{pathname:'community'}}>Community</Link></li>
                </ul>
            </div>
            <div id='mobile'>
                <i id='bar'>
                {!clicked ? <IconButton onClick={handleMenuClick}><MenuIcon id='closeicon'/></IconButton> : <IconButton onClick={handleCancelClick}><CloseIcon id='menuicon'/></IconButton>}
                </i>
            </div>
        </nav>
        </>
    )
}

export default Navbar