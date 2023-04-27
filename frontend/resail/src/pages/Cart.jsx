import React, { useEffect, useState } from 'react';
import CartProductView from '../components/CartProductView';
import '../assets/css/Cart.css'
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { backendLink } from '../config';
import ResailLogo from '../img/resaillogo.png'

function Cart() {
  const [cartproducts, setcartproducts] = useState([])
  const [totalPayable, settotalpayable] = useState(0)
  const [popup, setpopup] = useState(false)

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
      <div className='cartpopupwrap' style={{ display: popup ? 'flex': 'none' }}>
        <div className='cartpopup'>
          <div className='popup_head'>
            <img src={ResailLogo} style={{ width: '100px', height: '100px' }} />
            <p>Pickup</p>
          </div>
          <div className='popupcontent'>
            <h1>What after I pay ?</h1>
            <p>The order will be processed within 1 week
              of placing order, upon collection and
              verification you will contacted for pickup.

              You have a generous two-day window from the time of collection to return the product if it doesn't meet your expectations.
            </p>
            <h1>
              How do I collect my order ?
            </h1>
            <p>You have to collect your order from Room
              no 820, Ramanujan, New Hostels, in a
              time frame that will be informed to you. In
              case you face any issue , do whatsapp us for
              help at +91 7892669254.</p>

          </div>
          <div className='cart_submit_button'>
            <button className="profile_submit" onClick={checkout}>Continue</button>
          </div>
        </div>
      </div>


      <div className='cart_page_main'>
        {cartproducts && cartproducts.map(
          cartproduct => <CartProductView key={cartproduct.card_id} load={load} product_id={cartproduct.product_id} image={cartproduct.images} name={cartproduct.name} price={cartproduct.price} description={cartproduct.description} />
        )}
        <div className='cart_details_final'>
          <p>Total Payable Amount</p>
          <div><p className='product_price'>₹ {totalPayable}</p></div>
        </div>
        <div className='cart_details_actions'>
          <button className='product_page_cart cart_white' onClick={() => {setpopup(true)}}>Pickup</button>
          <span className='vertical_bar'></span>
          <button className='product_page_cart cart_black' onClick={() => {setpopup(true)}}>Check out</button>
        </div>
      </div>
    </>
  )
}

export default Cart
