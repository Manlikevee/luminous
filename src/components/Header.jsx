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

  return (
    <header>
      <div className="containers">
        <div className="logo">
          <Link href="/">
          LUMINOUS
          </Link>
        </div>
        <div className="links" id="middlelinks">
         
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Contact Us</Link>
          <Link href="/">Products</Link>
          {/* <span className="material-symbols-outlined" >
            contrast
          </span> */}
          <span className="material-symbols-outlined">
search
</span>
<span className="material-symbols-outlined" onClick={toggleDarkMode}>
menu
</span>

        </div>

      </div>
    </header>
  )
}

export default Header
