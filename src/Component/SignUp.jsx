import React, { useState } from 'react'
import './Css/Login.css'
import Spinner from './Spinner'
import { Link, useNavigate } from 'react-router-dom'
const SignUp = (props) => {
    const naviagte = useNavigate();
    const [spinner, setSpinner] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [auth, setAuth] = useState({
        name: '',
        number: '',
        email: '',
        password: ''
    })
    const onChange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value })
    }
    const Url = window.globalURL;
    const submitSignUp = async (e) => {
        setSpinner(true)
        e.preventDefault()
        const response = await fetch(`${Url}sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: auth.name, number: auth.number, email: auth.email, password: auth.password }),
        });
        const json = await response.json();
        if (json.success == 'true') {
            localStorage.setItem('authToken', json.authToken);
            props.showAlert("Succesfully Signed In", 'success')
            naviagte('/')
        }
        else if (json.msg == 'This Email Already Exists') {
            props.showAlert("This Email Already Exists", 'error')
        }
        else if (json.msg == 'This Number Already Exists') {
            props.showAlert("This Number Already Exists", 'error')
        }
        setSpinner(false);
    }
    return (
        <div className='login-page'>
                <div className="left-login-page">
                    <img src={require('./Image/login-bg.png')} alt="" />
                </div>
                <div className="login-form">
                <form onSubmit={submitSignUp}>
                        <div className="login-form-heading">
                            <h1>SIGN UP</h1>
                            <hr />
                        </div>
                        <div className="login-form-inputs">
                            <div className="input-field">
                                <input type="text" autoComplete="off" placeholder='Name' onChange={onChange} value={auth.name} name="name" id="name" minLength={3} />
                            </div>
                            <div className="input-field">
                                <input type="number" accept="number" minLength={10} placeholder='Number' autoComplete="off" onChange={onChange} value={auth.number} name="number" id="number" />
                            </div>
                            <div className="input-field">
                                <input type="email" autoComplete="off" onChange={onChange} placeholder='Email' value={auth.email} name="email" id="email" />
                            </div>
                            <div className="input-field">
                                <div className="password-input">
                                    <input type={!showPassword ? "password" : "text"} minLength={8} placeholder='Password' autoComplete="off" onChange={onChange} value={auth.password} name="password" id="password" />
                                    {showPassword ? <i className="fa-solid fa-eye" onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}></i> : <i className="fa-solid fa-eye-slash" onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}></i>}
                                </div>
                            </div>
                        </div>
                        <div className="extra-link">
                           <p> All ready have an Account?<Link to="/login"> Log in</Link></p>
                        </div>
                        <div className="submit-button">
                            <button type="submit">Sign up</button>
                        </div>
                        {spinner && <Spinner />}
                    </form>
                </div>
        </div>
    )
}

export default SignUp


