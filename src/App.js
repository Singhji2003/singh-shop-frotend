import { React, useState } from 'react'
import './App.css'
import './Responsive.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Component/HomePage';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Alert from './Component/Alert';
import Navbar from './Component/Navbar';
import ScrollToTop from './Component/ScrollToTop';
import Cart from './Component/Cart';
import Category from './Component/Category';
import Profile from './Component/Profile';
import ProductCategories from './Component/ProductCategories';
import Favourite from './Component/Favourite';

const App = () => {
 
  const [alert, setAlert] = useState('')
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  }
  window.globalURL = 'https://singh-shop-bakend.onrender.com/';
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert} />
      <Routes>
        <Route index element={<HomePage showAlert={showAlert} />} />
        <Route exact path="/login" element={<Login showAlert={showAlert} />} />
        <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
        <Route exact path="/mobiles" element={<Category category='mobile' showAlert={showAlert}/>} />
        <Route exact path="/shirts" element={<Category category='shirts' showAlert={showAlert}/>} />
        <Route exact path="/bags" element={<Category category='bags' showAlert={showAlert}/>} />
        <Route exact path="/accesorries" element={<Category category ='accesorries' showAlert={showAlert}/>} />
        <Route exact path="/sports" element={<Category  category ='sports'showAlert={showAlert}/>} />
        <Route exact path="/jacket" element={<Category category='jacket' showAlert={showAlert}/>} />
        <Route exact path="/shoes" element={<Category category='shoes' showAlert={showAlert}/>} />
        <Route exact path="/cart" element={<Cart showAlert={showAlert}/>} />
        <Route exact path="/favourite" element={<Favourite showAlert={showAlert}/>} />
        <Route exact path="/apparel" element={<Category category = 'apparel' showAlert={showAlert}/>} />
        <Route exact path="/books" element={<Category category = 'books' showAlert={showAlert}/>} />
        <Route exact path="/profile" element={<Profile showAlert={showAlert}/>} />
        <Route exact path="/product-category" element={<ProductCategories/>} />
        <Route exact path="/kids" element={<Category category = 'kids' showAlert={showAlert}/>} />
        <Route exact path="/saree" element={<Category category = 'saree' showAlert={showAlert}/>} />
        <Route exact path="/fashion" element={<Category category = 'fashion' showAlert={showAlert}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App