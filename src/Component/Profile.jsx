import React, { useState } from 'react'
import './Css/Profile.css'
import './Css/Login.css'
import { useNavigate } from 'react-router-dom'
import Loader from './Spinner'
const Profile = (props) => {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [fullname, setFullname] = useState('')
    const [number, setNumber] = useState('')
    const [altNumber, setAltNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const callApi = async ()=>{
        try {
            setLoader(true)
            const response = await fetch(`https://singh-shop-bakend.onrender.com/details/getDetails`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            });
            const userResponse = await fetch(`https://singh-shop-bakend.onrender.com/getUser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            });
            const userJson = await userResponse.json();
            const json = await response.json();
            const user = json.user
            if (userJson.success === 'true') {
                if(user.fullname===''){
                setFullname(userJson.user.name)
                }
                if(user.number===''){
                setNumber(userJson.user.number)
                }
                if(user.email===''){
                setEmail(userJson.user.email)
                }
            }
            if (json.success == 'true') {
                setFullname(user.fullname)
                setNumber(user.number)
                setAltNumber(user.altNumber)
                setEmail(user.email)
                setAddress(user.address)
            }
            else {
                localStorage.removeItem('authToken')
                navigate('/login')
                props.showAlert(json.msg, 'error')
            }


        } catch (error) {
            console.error(error)
        }
        
        setLoader(false)
    }
    useState(()=>{
        callApi();
    },[ ])
    const updateDetails = async(e)=>{
        setLoader(true)
        e.preventDefault();
        try {
            const response = await fetch(`https://singh-shop-bakend.onrender.com/details/putDetails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken'),
              },
              body: JSON.stringify({fullname, number, altNumber, email, address}),
            });
            const json = await response.json();
            console.log(json)
            if (json.success == 'true') {
              props.showAlert(json.msg, 'success')
            }
            else {
              localStorage.removeItem('authToken')
              navigate('/login')
              props.showAlert(json.msg, 'error')
            }
          } catch (error) {
            console.error(error);
          }
          setShowInput(false)
          setLoader(false)
          callApi();
    }
    return (
        <>
            <div className='personalDetails'>
                <div className="personalDetailsHeading">
                    <h1>Personal Details</h1>
                </div>
               {loader && <Loader/>}
                <div className="details-table">
                <button onClick={()=>setShowInput(true)}>{fullname===''?'Add Details':"Update Details"}</button>
                   <table>
                        <tr>
                            <td>Name: </td>
                            <td>{fullname?fullname:'-'}</td>
                        </tr>
                        <tr>
                            <td>Number: </td>
                            <td>{number?number:'-'} </td>
                        </tr>
                        <tr>
                            <td>AltNumber: </td>
                            <td>{altNumber?altNumber:'-'} </td>
                        </tr>
                        <tr>
                            <td>Email Id: </td>
                            <td>{email?email:'-'} </td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{address?address:'-'}</td>
                        </tr>
                    </table>
                </div>
            </div>






                {/* Form Input Box */}

            <div className="profile-input-box" id='profile-input' style={{display:showInput?'block':'none'}}>
                <i className="fa-solid fa-xmark" onClick={() => {
                    setShowInput(false)
                }}></i>
                <div className="login-form">
                    <form onSubmit={updateDetails}>
                        <div className="input-field">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" autoComplete="off" onChange={(e)=>setFullname(e.target.value)} value={fullname} name="name" id="name" minLength={3} placeholder="Name" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="number">Number</label>
                            <input type="number" accept="number" minLength={10} autoComplete="off" onChange={(e)=>setNumber(e.target.value)} value={number} name="number" id="number" placeholder="Number" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="altNumber">Alterate Number</label>
                            <input type="number" accept="number" minLength={10} autoComplete="off" onChange={(e)=>setAltNumber(e.target.value)} value={altNumber} name="altNumber" id="altNumber" placeholder="Alt Number" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email"  minLength={10} autoComplete="off" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" id="email" placeholder="Email Id" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="address">Address</label>
                            <input type="text" autoComplete="off" onChange={(e)=>setAddress(e.target.value)} value={address} name="address" id="address" placeholder="Address" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>

            {/* form input box close */}
        </>
    )
}

export default Profile