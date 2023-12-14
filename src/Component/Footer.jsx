import React from 'react'
import './Css/Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-top-content">
          <div className="footer-products">
            <div className="footer-heading footer-products-heading">
             <h2> Our Products</h2>
            </div>
            <div className="footer-content footer-product-content">
             <Link to="/shirts"> <p>shirts</p></Link>
             <Link to="/jacket"> <p>Jackets</p></Link>
             <Link to="/shoes"> <p>Shoes</p></Link>
             <Link to="/mobiles"> <p>Mobiles</p></Link>
            </div>
          </div>
          <div className="footer-about">
            <div className="footer-heading footer-about-heading">
             <h2> About Singh Shop</h2>
            </div>
            <div className="footer-content footer-about-content">
             <a href=""> <p>Our Story</p></a>
             <a href=""> <p>Carreers</p></a>
             <a href=""> <p>Press</p></a>
             <a href=""> <p>Sustainability</p></a>
             <a href=""> <p>Corporate Sales</p></a>
             <a href=""> <p>Code of Conduct</p></a>
            </div>
          </div>
          <div className="footer-top-end">
            <h2>Save 30% On Your First Order*</h2>
            <p>Join our mailing list to receive email exclusives and save 30% on your first order of $125 or more.</p>
            <h2>Email</h2>
            <div className="footer-email-details">
              <input type="email" autoComplete='off' name="email" id="email" placeholder="Enter your Email"/>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <hr/>
        <div className="footer-bottom-content">
      <p>©Copyright 2023 Singh Shop</p>
      <a href="">Privacy Policy</a>
      <a href="">Site Map</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer