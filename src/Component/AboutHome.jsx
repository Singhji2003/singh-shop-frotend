import React from 'react'
import './Css/AboutHome.css'
const AboutHome = () => {
  return (
    <section>
      <div className="about-heading">
        <h1>About Singh Shop</h1>
      </div>
      <div className="about-content">
        <p>Welcome to Singh Shop, where tradition meets style! We take pride in offering a curated collection of exquisite products that showcase the rich cultural heritage of the Singh community. At Singh Shop, our mission is to celebrate the spirit of Singh pride through a range of handpicked items that reflect the unique identity and traditions of the Sikh community. Explore our carefully selected assortment of clothing, accessories, and home decor that blend the timeless elegance of Singh culture with modern trends, providing you with a distinctive and meaningful shopping experience.</p>
        <img src={require('./Image/arpan.jpeg')} alt="" />
      </div>

    </section>
  )
}

export default AboutHome