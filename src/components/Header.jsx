'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = Cookies.get('darkMode');
    if (savedMode !== undefined) {
      setIsDarkMode(JSON.parse(savedMode));
      document.body.classList.toggle('dark-mode', JSON.parse(savedMode));
      document.body.classList.toggle('light-mode', !JSON.parse(savedMode));
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    Cookies.set('darkMode', JSON.stringify(newMode), { expires: 365 });
    document.body.classList.toggle('dark-mode', newMode);
    document.body.classList.toggle('light-mode', !newMode);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickLink = (event) => {
    // Remove 'linksactive' class from all links
    document.getElementById('middlelinks').classList.toggle('linksactive')

    // Calculate and set height of links dynamically
    const linksHeight = document.getElementById('middlelinks').clientHeight;
    // Example: console.log(linksHeight);
  };

  return (
    <>
    <header>
    
      
      <div className="containers">
        <div className="logo">
          <Link href="/">
          LUMINOUS
          </Link>
        </div>
        <div className={`links ${isMenuOpen ? 'linksactive' : ''}`} id="middlelinks">
         
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Contact Us</Link>
          <Link href="/">Products</Link>
          {/* <span className="material-symbols-outlined" >
            contrast
          </span> */}
          <span className="material-symbols-outlined" onClick={toggleDarkMode}>
          brightness_6
</span>


        </div>
<div className="toggle" onClick={toggleMenu}>
<span className="material-symbols-outlined" >
menu
</span>
</div>
      </div>
    </header>
      {isMenuOpen && (<div className="myloadingani"></div>) }
      </>
  )
}

export default Header
