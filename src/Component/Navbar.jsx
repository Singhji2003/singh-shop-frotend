import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Css/Navbar.css'
const Navbar = (props) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [favouriteItemCount, setFavouriteItemCount] = useState(0);
  const location = useLocation();

  // Accessing the current URL from the location object
  const currentUrl = location.pathname + location.search;
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
    props.showAlert("Successfully Logged Out", 'success')
  }

  const closeNavbar = ()=>{
    document.getElementById('nav-right').style.marginTop = '-14rem'
    document.getElementById('nav-center').style.marginRight = '30vw'
    document.getElementById('close').style.display = 'none'
    document.getElementById('hamberger').style.display = 'block'
  }
  const callFavourite = async()=>{
    try {

      const favouriteresponse = await fetch(`https://singh-shop-bakend.onrender.com/favourite/getFromFavourite`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('authToken')
          }
      });
      const favouritejson = await favouriteresponse.json();
      if (favouritejson.success == 'true') {
         setFavouriteItemCount(favouritejson.user.length)
      }
      else {
          localStorage.removeItem('authToken')
          navigate('/login')
          props.showAlert('Last session token has expired!!!', 'error')
      }
  } catch (error) {
    return;
      // console.error(error)
  }
  }
  const callData = async () => {
    try {
      

      const response = await fetch(`https://singh-shop-bakend.onrender.com/cart/getFromCart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });
      const json = await response.json();
      if (json.success == 'true') {
        setCartItemCount(json.user.length)
      }
      else {
        localStorage.removeItem('authToken')
        navigate('/login')
        props.showAlert('Last session token has expired!!!', 'error')
      }


    } catch (error) {
      return;
      // console.error(error)
    }
  }
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      callData()
      callFavourite();
    }
    else if(!localStorage.getItem('authToken')){
      setCartItemCount(0)
      setFavouriteItemCount(0)
    }
    else {
      localStorage.removeItem('authToken');
    }
  });
  return (
    <div className="header">
      <nav>
        <div className="left-header">
          <ul>
            <li className="hover-underline-animation">
              <Link to="/" style={{ color: currentUrl === '/' ? '#CAA35D' : 'black', fontWeight: currentUrl === '/' ? '700' : '500', borderBottom: currentUrl === '/' ? '2px solid #CAA35D' : 'none' }}>Home</Link>
            </li>
            <li className="hover-underline-animation" >
              <Link to="/shirts" style={{ color: currentUrl === '/shirts' ? '#CAA35D' : 'black', fontWeight: currentUrl === '/shirts' ? '700' : '500', borderBottom: currentUrl === '/shirts' ? '2px solid #CAA35D' : 'none' }}>Shirts</Link>
            </li>
            <li className="hover-underline-animation">
              <Link to="/mobiles" style={{ color: currentUrl === '/mobiles' ? '#CAA35D' : 'black', fontWeight: currentUrl === '/mobiles' ? '700' : '500', borderBottom: currentUrl === '/mobiles' ? '2px solid #CAA35D' : 'none' }}>Mobiles</Link>
            </li>
            <li className="hover-underline-animation">
              <Link to="/bags" style={{ color: currentUrl === '/bags' ? '#CAA35D' : 'black', fontWeight: currentUrl === '/bags' ? '700' : '500', borderBottom: currentUrl === '/bags' ? '2px solid #CAA35D' : 'none' }}>Bags</Link>
            </li>
            <li className="hover-underline-animation">
              <Link to="/accesorries" style={{ color: currentUrl === '/accesorries' ? '#CAA35D' : 'black', fontWeight: currentUrl === '/accesorries' ? '700' : '500', borderBottom: currentUrl === '/accesorries' ? '2px solid #CAA35D' : 'none' }}>Accesorries</Link>
            </li>
          </ul>
        </div>
        <div className="center-header" id='nav-center'>
          <img src={require("./Image/logo.png")} alt="" />
          Singh Shop
        </div>
        <div className="right-header" id='nav-right'>
          {/* <form action="#">
            <input type="text" autoComplete="off" name="search" id="search" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </form> */}
          <div className="nav-product">
            <div className="each-right-nav" id='respo-home' onClick={()=>{
              if(window.innerWidth < 500){
                closeNavbar();
              }
              navigate('/')
            }}>
           <i className="fa-solid fa-house" style={{color:currentUrl==='/home'?'#CAA35D':'black'}} >
            </i> <div className="name-nav">Home</div>
            </div>
            <div className="each-right-nav" onClick={() => {
              !localStorage.getItem('authToken') ? navigate('/login') : navigate('/cart')
              if(window.innerWidth < 500){
                closeNavbar();
              }
            }}>
           <i className="fa-solid fa-cart-shopping" style={{color:currentUrl==='/cart'?'#CAA35D':'black'}} >{cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
            </i> <div className="name-nav">Cart</div>
            </div>
            <div className="each-right-nav" onClick={() => {
              !localStorage.getItem('authToken') ? navigate('/login') : navigate('/favourite')
              if(window.innerWidth < 500){
                closeNavbar();
              }
            }}>
            {currentUrl==='/favourite'?<i style={{color:'#CAA35D'}} className="fa-solid fa-heart" >{favouriteItemCount > 0 && <span className="cart-item-count">{favouriteItemCount}</span>}</i>:<i className="fa-regular fa-heart" onClick={() => {
              !localStorage.getItem('authToken') ? navigate('/login') : navigate('/favourite')
            }}>{favouriteItemCount > 0 && <span className="cart-item-count">{favouriteItemCount}</span>}</i> }<div className="name-nav">Favourite</div>
            </div>
          </div>
          {
            !localStorage.getItem('authToken') ?
              <><Link to='/login'> <button>Login</button></Link>
                <Link to='/signup'> <button>Sign Up</button></Link></> :
              <div className='nav-product'>
            <div className="each-right-nav" onClick={()=>{
               if(window.innerWidth < 500){
                closeNavbar();
              }
            }}>
                <Link to='/profile'> <i className="fa-solid fa-user" style={{color:currentUrl==='/profile'?'#CAA35D':'black'}}></i></Link>
                <div className="name-nav">Profile</div>
                </div>
                <Link> <button onClick={()=>{
                  logOut();
                  if(window.innerWidth < 500){
                    closeNavbar();
                  }
                }}>Log Out</button></Link>
              </div>
          }
          <div className="nav-respo">
          <i className="fa-solid fa-bars" id='hamberger' onClick={()=>{
            document.getElementById('nav-right').style.marginTop = '1rem'
            document.getElementById('nav-center').style.marginRight = '0rem'
            document.getElementById('close').style.display = 'block'
            document.getElementById('hamberger').style.display = 'none'
          }}></i>
          <i className="fa-solid fa-xmark" id='close'  onClick={()=>{
           closeNavbar();
          }}></i>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar