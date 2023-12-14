import React, { useState } from 'react';
import './Css/Banner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [category, setCategory] = useState('winter');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const getBannerContent = () => {
    switch (category) {
      case 'shoes':
        return {
          image: require('./Image/shoesbanner.webp'),
          title: '2023 Most Recommended Shoes',
          description: 'At Singh Shop, we believe in creating more than just shoes – we create experiences. Elevate your shoe game and step into a world where fashion meets functionality, and every pair is a step towards self-expression and empowerment.',
          link: '/shoes',
        };
      case 'jackets':
        return {
          image: require('./Image/banner.jpg'), // Change the image path for footwear
          title: 'Explore New Stylish Jacktes',
          description: 'Crafted with precision and an unwavering commitment to quality, our jackets are more than just outerwear – they are a statement. Immerse yourself in the perfect blend of fashion-forward designs and practical functionality, providing you with the ultimate outerwear experience.',
          link: '/jacket', // Change the link for footwear
        };
      case 'shirts':
        return {
          image: require('./Image/shirtsbanner.jpg'), // Change the image path for footwear
          title: 'Explore Stylish Shirts',
          description: 'Available in various fabrics, colors, and patterns, shirts provide a canvas for self-expression. Whether you opt for the crispness of a button-down shirt or the laid-back feel of a T-shirt, each piece contributes to your unique style.',
          link: '/shirts', // Change the link for footwear
        };
      case 'saree':
        return {
          image: require('./Image/sareebanner.jpeg'), // Change the image path for footwear
          title: 'Best Saree To Wear this year',
          description: 'Worn by women across the Indian subcontinent, the saree adapts to diverse occasions, from formal events to everyday wear. It embodies the diversity of India, with each region contributing its unique weaving techniques and design aesthetics.',
          link: '/saree', // Change the link for footwear
        };
      case 'books':
        return {
          image: require('./Image/booksbanner.jpg'), // Change the image path for footwear
          title: 'Best Books to Read',
          description: 'Immerse yourself in the power of words, as each book transports you to different realms and perspectives. Whether you seek thrilling adventures, profound insights, or heartwarming stories, our collection is a gateway to countless narratives waiting to be explored.',
          link: '/books', // Change the link for footwear
        };
      // Add more cases for other categories if needed
      default:
        return {
          image: require('./Image/banner.jpg'),
          title: '2023 Winter Clothes Guides',
          description: 'We’ve got you covered with our Winter clothes guides. Explore our top picks and get them delivered in time for the Winters like Jackets, footwear, shirts, pants, etc...',
          link: '/apparel',
        };
    }
  };

  const { image, title, description, link } = getBannerContent();

  return (
    <section>
      <div className="home-banner">
        <div className="banner-left">
          <img src={image} alt="" />
        </div>
        <div className="banner-right">
          <span>{`LOOKING FOR SOMETHING SPECIAL FOR THIS ${category.toUpperCase()}?`}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link onClick={() => handleCategoryChange('jackets')}>Jacktes, </Link>
          <Link onClick={() => handleCategoryChange('shoes')}>Shoes, </Link>
          <Link onClick={() => handleCategoryChange('shirts')}>Shirts, </Link>
          <Link onClick={() => handleCategoryChange('books')}>Books, </Link>
          <Link onClick={() => handleCategoryChange('saree')}>Saree</Link>
          <br />
          <Link to={link}>
            <button>Explore Products</button>
          </Link>
          <div>
            {/* Add more buttons for other categories if needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
