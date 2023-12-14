import React, { useEffect, useState } from 'react';
import './Css/Category.css';
import Loader from './Spinner';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
const Category = (props) => {
  const [items, setItems] = useState(0);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonTexts, setButtonTexts] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedFavourite, setClickedFavourite] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const callData = async () => {
    setLoader(true);
    const url = `https://singh-shop-api.onrender.com/getData?category=${props.category}`;
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
  }, [props.category]);

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
    } catch (error) {
      console.error(error);
    }
    setLoader(false)
  };
  const addToFavouite= async (data, index) => {
    try {
      if(!localStorage.getItem('authToken')){
       return navigate('/login')
      }
      if (clickedFavourite[index]) {
        return;
      }
      setLoader(true)
      const response = await fetch(`https://singh-shop-bakend.onrender.com/favourite/putToFavourite`, {
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
        const newClickedFavourite = [...clickedFavourite];
        newClickedFavourite[index] = true;
        setClickedFavourite(newClickedFavourite);
        props.showAlert(json.msg, 'success')
      }
      else {
        localStorage.removeItem('authToken')
        navigate('/login')
        props.showAlert('Last Session has Expired', 'error')
      }
    } catch (error) {
      // console.error(error);
    }
    setLoader(false)
  };
  const searchText = async(e)=>{
    const word = e.target.value;
    const url = `https://singh-shop-api.onrender.com/getData?category=${props.category}&title=${word}`;
      const response = await fetch(url);
      const result = await response.json();
      setItems(result.data.length);
      setProducts(result.data);
  
}
  return (
    <>
      <div className="category-heading">
        <div className="category-heading-left">
          <h2 style={{textTransform:'capitalize'}}>{props.category}</h2>
          <p>({items} items)</p>
        </div>
        <div className="category-heading-right">
          <form >
            <input type="text" onChange={searchText} autoComplete="off" name="search" id="search" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </form>
        </div>
      </div>
      {loader && <Loader />}
      { <div className="products">
        {!products.length==0? products.map((product, index) => (
          <div key={index}>
            <div className="each-product">
              <div className="favouritebutton">
              <span className="icon-container" onClick={() => addToFavouite(product, index)}>{clickedFavourite[index] ? (
                          <i className="fa-solid fa-heart" style={{color:'#CAA35D'}}></i>
                        ) : (
                          <i className="fa-regular fa-heart"></i>
                        )}</span>
            </div>
              <div className="product-image">
                <img src={product.photo} alt="" />
              </div>
              <p>{product.title}</p>

              <div className="price-details">
                <p>{product.price ? product.price : 'Rs 1200'}</p>
                <p className='original-price'>
                  {product.original_price ? (product.original_price) : ''}
                </p>
              </div>
              <div className="rating-details">
                <i class="fa-solid fa-star"></i>
                <p>{product.star_rating ? product.star_rating : '4.0'}</p>
                <p className='num_rating'>
                  ({product.num_rating ? product.num_rating : '28'})
                </p>
              </div>
              <div className="addToCartbutton">
                <button id="cart" onClick={() => addToCart(product, index)} disabled={clickedButtons[index]}>
                  {buttonTexts[index]}  <span class="icon-container">{clickedButtons[index] ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-shopping-cart"></i>
                        )}</span>
                </button>
              </div>
            </div>
          </div>
        )):!loader && <>
        <h1>Not found anything</h1>
        </>}
      </div>}
      {!loader && <Footer />}
    </>
  );
};

export default Category;
