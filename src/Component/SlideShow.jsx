import React, { useEffect } from 'react';
import './Css/SlideShow.css';
import {Link} from 'react-router-dom'
const SlideShow = () => {
  let slideIndex = 1;

  useEffect(() => {
    showSlides(slideIndex);

    // Automatic slideshow change after 5 seconds
    const interval = setInterval(() => {
      plusSlides(1);
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [slideIndex]);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const bullets = document.getElementsByClassName("bullet");

    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < bullets.length; i++) {
      bullets[i].className = bullets[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    bullets[slideIndex - 1].className += " active";
  }

  return (
    <section>
      <div className="slideshow-container">

        <div className="mySlides">
          <img src={require("./Image/bg1.jpeg")} className="slide-image" alt="slide 1"/>
          <div className="image-text">
            <h1>FALL Blowout: Up to 70% Off Sale!</h1>
            <p>Don't miss out on these incredible deals this seasons</p>
            <Link to='/apparel'> <button>SHOP SALE</button></Link>
          </div>
          
        </div>
      
        <div className="mySlides">
          <img src={require("./Image/bg2.jpg")} className="slide-image" alt="slide 2"/>
          <div className="image-text">
            <h1>Gift Giving Made Easy</h1>
            <p> Get the perfect gift for that special someone at Singh, Shop or gift guides now?</p>
           <Link to='/apparel'> <button>SHOP GIFT FOR EVERYONE</button></Link>
          </div>
        </div>
      
        <div className="mySlides">
          <img src={require("./Image/bg3.jpeg")} className="slide-image" alt="slide 3"/>
          <div className="image-text">
            <h1>Same NFL Team, New Vintage Look</h1>
            <p>Historic NFL jackets of seasons past.Shop the perfect gift for NFL fan this season with these new style and classic emblems.</p>
           <Link to='/apparel'> <button>SHOP HISTORIC NFL JACKETS</button></Link>
          </div>
        </div>
        <div className="mySlides">
          <img src={require("./Image/bg4.jpeg")} className="slide-image" alt="slide 4"/>
          <div className="image-text">
            <h1>Fully Vested</h1>
            <p>Bundle up in Cutter & Buck outerwear. Shop vests, jackets, pullovers & more.</p>
           <Link to='/apparel'> <button>SHOP OUTWEAR</button></Link>
          </div>
        </div>
        </div>

<div className="bullet-container">
  <span className="bullet" onClick={() => currentSlide(1)}></span>
  <span className="bullet" onClick={() => currentSlide(2)}></span>
  <span className="bullet" onClick={() => currentSlide(3)}></span>
  <span className="bullet" onClick={() => currentSlide(4)}></span>
</div>
</section>
);
};

export default SlideShow;
