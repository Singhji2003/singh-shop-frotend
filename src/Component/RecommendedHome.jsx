import React, { useEffect, useState } from 'react';
import './Css/Category.css';
import Loader from './Spinner';
import { useNavigate } from 'react-router-dom';
import './Css/Recommended.css'
const RecommendedHome = (props) => {
  const [items, setItems] = useState(0);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonTexts, setButtonTexts] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const navigate = useNavigate();
  const callData = async () => {
    setLoader(true);
    const url = `https://singh-shop-api.onrender.com/getData?category=best`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setItems(result.data.length);
      setProducts(result.data);
      setButtonTexts(Array(result.data.length).fill('Add to Cart'));
      setClickedButtons(Array(result.data.length).fill(false));
    } catch (error) {
      console.error(error);
    }
    setLoader(false);
  };

  useEffect(() => {
    callData();
  }, []);

  const addToCart = async (data, index) => {
    try {
      if(!localStorage.getItem('authToken')){
        return navigate('/login')
       }
      if (clickedButtons[index]) {
        return;
      }
      setLoader(true)
      const response = await fetch(`https://singh-shop-bakend.onrender.com/cart/putToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          title: data.title,
          price: data.price,
          original_price: data.original_price,
          star_rating: data.star_rating,
          num_rating: data.num_rating,
          photo: data.photo,
        }),
      });
      const json = await response.json();
      if (json.success == 'true') {
        const newButtonTexts = [...buttonTexts];
        newButtonTexts[index] = 'Added to Cart';
        setButtonTexts(newButtonTexts);

        const newClickedButtons = [...clickedButtons];
        newClickedButtons[index] = true;
        setClickedButtons(newClickedButtons);
        props.showAlert(json.msg, 'success')
      }
      else {
        localStorage.removeItem('authToken')
        navigate('/login')
        props.showAlert('Last Session has Expired', 'error')

      }
      setLoader(false)

    } catch (error) {
      console.error(error);
    }
    setLoader(false)
  };
  return (
    <section>
<div className="recommended-product-heading">
  <h1>Most Reccommended Product For you</h1>
</div>
{loader && <Loader />}

{/* <!-- all recommended Product  --> */}
<div className="recommended-products">

  {/* <!-- Each recommended Product --> */}
   <div className="products">
        {!products.length==0? products.map((product, index) => (
          <div key={index}>
            <div className="each-product">
              <div className="product-image">
                <img src={product.photo} alt="" />
              </div>
              <p>{product.title}</p>

              <div className="price-details">
                <p>{product.price}</p>
                <p className='original-price'>
                  {product.original_price ? (product.original_price) : ''}
                </p>
              </div>
              <div className="rating-details">
                <i className="fa-solid fa-star"></i>
                <p>{product.star_rating ? product.star_rating : '4.0'}</p>
                <p className='num_rating'>
                  ({product.num_rating ? product.num_rating : '28'})
                </p>
              </div>
              <div className="addToCartbutton">
                <button id="cart" onClick={() => addToCart(product, index)} disabled={clickedButtons[index]}>
                {buttonTexts[index]}  <span className="icon-container">{clickedButtons[index] ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-shopping-cart"></i>
                        )}</span>
                  
                </button>
              </div>
            </div>
          </div>
        )):<>
        <h1>Not found anything</h1>
        </>}
      </div>
  {/* <!-- End of this Product --> */}

</div>
</section>
  )
}

export default RecommendedHome