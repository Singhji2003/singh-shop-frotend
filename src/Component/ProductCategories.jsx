import React from 'react'
import { Link } from 'react-router-dom'
import './Css/ProductCategory.css'
import ScrollToTop from './ScrollToTop'
const ProductCategories = () => {
  return (
    <section>
        <ScrollToTop/>
    <div className="home-category">
        <div className="home-category-heading">
            <h1>Our Products</h1>
        </div>
        <div className="home-category-item">
            <div className="each-category-item ">
            <Link to='/shirts'>
                <img src={require("./Image/shrits.jpg")} alt="shirts"/>
                    <h2>Mens</h2>
                </Link>
            </div>
            <div className="each-category-item">
            <Link to='/jacket'>
                <img src={require("./Image/jacket.webp")} alt="jackets"/>
                    <h2>Jackets</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/accesorries'>
                <img src={require("./Image/accesories.webp")} alt="accesories"/>
                    <h2>Accesorries</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/shoes'>
                <img src={require("./Image/shoes.avif")} alt="shoes"/>
                    <h2>Shoes</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/books'>
                <img src={require("./Image/books.webp")} alt="books" />
                    <h2>Books</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/mobiles'>
                <img src={require("./Image/mobile.webp")} alt="mobile" />
                    <h2>Mobiles</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/kids'>
                <img src={require("./Image/kids.jpg")} alt="mobile" />
                    <h2>Kids</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/saree'>
                <img src={require("./Image/saree.webp")} alt="saree" />
                    <h2>Saree</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/bags'>
                <img src={require("./Image/bags.webp")} alt="saree" />
                    <h2>Bags</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/fashion'>
                <img src={require("./Image/fashion.webp")} alt="saree" />
                    <h2>Fashions</h2>
                    </Link>
            </div>
            <div className="each-category-item">
                <Link to='/apparel'>
                <img src={require("./Image/apparel.webp")} alt="sports" />
                    <h2>Apparel</h2>
                    </Link>
            </div>
        </div>
    </div>
</section>
  )
}

export default ProductCategories