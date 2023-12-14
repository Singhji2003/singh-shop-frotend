import React, { useState, useEffect } from 'react'
import './Css/Cart.css'
import Footer from './Footer'
import Loader from './Spinner';
import { Link, useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const callData = async () => {
        setLoader(true)
        try {

            const response = await fetch(`https://singh-shop-bakend.onrender.com/cart/getFromCart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            });
            const json = await response.json();
            const user = json.user
            if (json.success === 'true') {
                setProducts(json.user)
                const result = user.reduce((acc, obj) => acc + parseInt(((obj.price).slice(1)).replace(",", "")), 0);
                setTotalAmount(result)
            }
            else {
                localStorage.removeItem('authToken')
                navigate('/login')
                props.showAlert('Last session token has expired!!!', 'error')
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
        if (json.success === 'false') {
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
        const response = await fetch(`https://singh-shop-bakend.onrender.com/cart/remove/${product._id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        });
        const json = await response.json();
        callData();
        setLoader(false)
        props.showAlert('Successfully Removed the product from Cart', 'success')
    }
    return (
        <>
            <div className="cart-heading">
            <i class="fa-solid fa-bag-shopping"></i> <h1>Your Cart</h1>
            </div>
            {loader && <Loader />}
            <div className="cart-products">
                {products.map((e, i) => {
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
                                        <p className='original-price'>{e.original_price?`(${e.original_price})`:''}</p>
                                    </div>
                                    <div className="cart-product-delete">
                                        <button onClick={() => removeFromCart(e)}>Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
            {
                products.length === 0 && !loader ?
                    <div className='cartEmpty'>
                        <h1>Nothing is here to Shop</h1>
                        <Link to='/'><button className='goToHome'>Go to Home</button></Link>
                    </div> :
                    <div className="cart-payment" >
                        <table>
                            <tr style={{ fontSize: '1.1em', fontWeight: '700' }}>
                                <td>Product</td>
                                <td>Price</td>
                            </tr>
                            {products.map((e) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{((e.title).split(' ')).slice(0, 10)}</td>
                                            <td>{e.price}</td>
                                        </tr>
                                    </>
                                )
                            })}
                            <tr style={{ fontSize: '1.1em', fontWeight: '700' }}>
                                <td >Total Payable Amount</td>
                                <td>&#8377;{totalAmount}</td>
                            </tr>
                        </table>

                    </div>}
            {!loader && <Footer />}
        </>
    )
}

export default Cart