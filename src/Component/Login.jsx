import React, { useState } from 'react'
import './Css/Login.css'
import Spinner from './Spinner'
import { Link, useNavigate } from 'react-router-dom'
const Login = (props) => {
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [auth, setAuth] = useState({
        email: '',
        password: ''
    })
    const onChange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value })
    }
    const Url = window.globalURL;
    const submitLogin = async (e) => {
        setSpinner(true)
        e.preventDefault()
        const response = await fetch(`https://singh-shop-bakend.onrender.com/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: auth.email, password: auth.password }),
        });
        const json = await response.json();
        if (json.msg == 'Login with correct cerdentials') {
            props.showAlert('Login with correct details', 'error')
        }
        if (json.success == 'true') {
            localStorage.setItem('authToken', json.authToken)
            props.showAlert('Successfully Logged in', 'success')
            navigate('/')
        }
        setSpinner(false);
    }
    return (
        <div className='login-page'>
            <div className="left-login-page">
                <img src={require('./Image/login-bg.png')} alt=""/>
            </div>
            <div className="login-form">
                <form onSubmit={submitLogin}>
                    <div className="login-form-heading">
                        <h1>LOG IN</h1>
                        <hr />
                    </div>
                    <div className="login-form-inputs">
                        <div className="input-field">
                            <input type="email" autoComplete="off" placeholder='Email' value={auth.email} onChange={onChange} name="email" id="email" />
                        </div>
                        <div className="input-field">
                        <div className="password-input">
                            <input type={!showPassword ? "password" : "text"} placeholder='Password' autoComplete="off" value={auth.password} onChange={onChange} name="password" id="password" />
                            {showPassword ? <i className="fa-solid fa-eye" onClick={() => {
                                setShowPassword(!showPassword)
                            }}></i> : <i className="fa-solid fa-eye-slash" onClick={() => {
                                setShowPassword(!showPassword)
                            }}></i>}
                            </div>
                        </div>
                    </div>
                    <div className="extra-link">
                        Not have any account? <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="submit-button">
                        <button type="submit">Login</button>
                    </div>
                    {spinner && <Spinner />}
                </form>
            </div>
        </div>
    )
}

export default Login
