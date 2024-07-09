import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
        <br />
        <div className="containers">
            <div className="footersec">
                <div className="footertop">
                About
                </div>
                <div className="footerbtm">
                Welcome to Radiant Living, where we transform homes with unique designer lamps that blend style, and functionality.
                </div>
            </div>
            <div className="footersec">
            <div className="footertop">
            Social
                </div>
                <div className="footerbtm">
            Instagram
                </div>
                <div className="footerbtm">
                Facebook
                </div>
                <div className="footerbtm">
                Twitter
                </div>
            </div>
            <div className="footersec">
            <div className="footertop">
            Call center
                </div>
                <div className="footerbtm">
                Monday to Friday: 9-20
                <div>
                Saturday to Sunday: closed
                </div>
                <div>
                    <a href="mailto:luminous@example.com">luminous@example.com</a>
      
                </div>
                <div>
               
                <a href="tel:+1333555">+1 333 555</a>
                </div>
                </div>
            </div>
        </div>
        <br />
        <div className="footerbottom">
<div className="containers">
    <div className="footerlinks">
    <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
    </div>

    <div className="copyright">
    (©) LUMINOUS
    </div>
</div>
        </div>
    </footer>
  )
}

export default Footer