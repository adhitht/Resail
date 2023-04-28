import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Profile from './pages/Profile';
import SellNow from './pages/SellNow';
import Products from './pages/Products';
import MyOrders from './pages/MyOrders';

import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";

function OAuthRedirecting(){
  const [queryparams] = useSearchParams()
  localStorage.setItem('token', queryparams.get('token'));
  localStorage.setItem('picture', queryparams.get('picture'));
  window.location.replace('/profile')
  return (
    <></>
  )
}

function App() {


  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/OAuthRedirecting' element={<OAuthRedirecting />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sellnow' element={<SellNow />} />
        <Route path='/products' element={<Products />} />
        <Route path='myorders' element={<MyOrders />} />
      </Routes>
    </Router>
  );
}


export default App;