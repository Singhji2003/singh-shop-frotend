import React from 'react'
import {Link} from 'react-router-dom'
import './Css/HomeCategory.css'
const CategoryHome = () => {
    return (
        <section>
            <div className="home-category">
                <div className="home-category-heading">
                    <h1>Our Products</h1>
                   <Link to='/product-category'> <h2>&rarr;</h2></Link>
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
                        <img src={require("./Image/jacket.webp")} alt="jackets" width="210"/>
                            <h2>Jackets</h2>
                            </Link>
                    </div>
                    <div className="each-category-item">
                        <Link to='/saree'>
                        <img src={require("./Image/saree.webp")} alt="saree" />
                            <h2>Saree</h2>
                            </Link>
                    </div>
                    <div className="each-category-item">
                        <Link to='/shoes'>
                        <img src={require("./Image/shoes.avif")} alt="shoes" width="188rem"/>
                            <h2>Shoes</h2>
                            </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategoryHome