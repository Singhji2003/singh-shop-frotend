import React, { useState, useEffect } from 'react'
import './Css/Cart.css'
import Footer from './Footer'
import Loader from './Spinner';
import { Link, useNavigate } from 'react-router-dom';

const Favourite = (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [buttonTexts, setButtonTexts] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);
    const callData = async () => {
        setLoader(true)
        try {

            const response = await fetch(`https://singh-shop-bakend.onrender.com/favourite/getFromFavourite`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            });
            const json = await response.json();
            const user = json.user
            if (json.success == 'true') {
                setProducts(json.user)
                setButtonTexts(Array(json.user.length).fill('Add to Cart'));
                setClickedButtons(Array(json.user.length).fill(false));
            }
            else {
                return;
            }


        } catch (error) {
            console.error(error)
        }
        setLoader(false)
    }
    const checkToken = async () => {
        const response = await fetch(`https://singh-shop-bakend.onrender.com/checkToken`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        });
        const json = await response.json();
        if (json.success == 'false') {
            localStorage.removeItem('authToken')
            navigate('/login')
        }
    }
    useEffect(() => {
        checkToken();
    })
    useEffect(() => {
        callData();
    }, [])
    const removeFromCart = async (product) => {
        setLoader(true)
        const response = await fetch(`https://singh-shop-bakend.onrender.com/favourite/remove/${product._id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        });
        const json = await response.json();
        callData();
        setLoader(false)
        props.showAlert('Successfully Removed the product from Favourite', 'success')
    }
    const addToCart = async (data, index) => {
        try {
            if (!localStorage.getItem('authToken')) {
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
    return (
        <>
            <div className="cart-heading">
                <h1>Favourite Items</h1>
            </div>
            {loader && <Loader />}
            <div className="cart-products">
                {products.length == 0 ? <div className='cartEmpty'>
                    <h1>Nothing is here to Shop</h1>
                    <Link to='/'><button className='goToHome'>Go to Home</button></Link>
                </div> : products.map((e, i) => {
                    return (
                        <div key={i}>
                            <div className="cart-each-product">
                                <div className="cart-product-image">
                                    <img src={e.photo} alt="" />
                                </div>
                                <div className="cart-product-details">
                                    <p>{e.title}</p>
                                    <div className="cart-product-rating-details">
                                        <i className="fa-solid fa-star"></i>
                                        <p>{e.star_rating}</p>
                                        <p >({e.num_rating})</p>
                                    </div>
                                    <div className="cart-product-price-details">
                                        <p>{e.price}</p>
                                        <p className='original-price'>({e.original_price})</p>
                                    </div>
                                    <div className="cart-product-delete">
                                        <button onClick={() => removeFromCart(e)}>Remove</button>
                                    </div>
                                    <div className="addToCartbutton">
                                        <button id="cart" onClick={() => addToCart(e, i)} disabled={clickedButtons[i]}>
                                            {buttonTexts[i]}  <span class="icon-container">{clickedButtons[i] ? (
                                                <i className="fas fa-check"></i>
                                            ) : (
                                                <i className="fas fa-shopping-cart"></i>
                                            )}</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })
                }
            </div>
            {!loader && <Footer />}
        </>
    )
}

export default Favourite