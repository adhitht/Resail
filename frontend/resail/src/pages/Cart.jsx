import React, { useEffect, useState } from 'react';
import CartProductView from '../components/CartProductView';
import '../assets/css/Cart.css'
import Axios from 'axios';
import NavBar from '../assets/css/NavBar';
import { backendLink } from '../config';

function Cart() {
  const [cartproducts, setcartproducts] = useState([])
  const [totalPayable, settotalpayable] = useState(0)

  const checkout = async () => {
    const response = await Axios.post(`${backendLink}/checkout`, {
      order_status: true
    }, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    });
    window.location.assign(response.data.url)
  }

  const load = async () => {
    const response = await Axios.get(`${backendLink}/getcart`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    });
    settotalpayable(response.data.total)
    setcartproducts(response.data.data);
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <NavBar />
      <div className='cart_page_main'>
        {cartproducts && cartproducts.map(
          cartproduct => <CartProductView key={cartproduct.card_id} load={load} product_id={cartproduct.product_id} image={cartproduct.images} name={cartproduct.name} price={cartproduct.price} description={cartproduct.description} />
        )}
        <div className='cart_details_final'>
          <p>Total Payable Amount</p>
          <div><p className='product_price'>₹ {totalPayable}</p></div>
        </div>
        <div className='cart_details_actions'>
          <button className='product_page_cart cart_white'>Pickup</button>
          <span className='vertical_bar'></span>
          <button className='product_page_cart cart_black' onClick={checkout}>Check out</button>
        </div>
      </div>
    </>
  )
}

export default Cart
