import React, { useState } from 'react';
import Login from './pages/login';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Profile from './pages/Profile';

import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";

function OAuthRedirecting(){
  const [queryparams] = useSearchParams()
  localStorage.setItem('token', queryparams.get('token'));
  localStorage.setItem('picture', queryparams.get('picture'));
  window.location.replace('/')
  return (
    <></>
  )
}

function App() {


  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/OAuthRedirecting' element={<OAuthRedirecting />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}


export default App;