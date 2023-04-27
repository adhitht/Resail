import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import '../assets/css/Order.css'
import NavBar from "../components/NavBar";
import { backendLinks, backendLink } from '../config';
import QRCode from "react-qr-code";
import Footer from '../components/Footer';


function Order() {
  const upiId = 'www.jayrbhanushali123@okhdfcbank'
  // const upiId = 'adhith.tharammal-1@okaxis'
  const company = 'ReSail'
  const tnReference = 'Hello'
  
  const [amount, setamount] = useState() 

  const [queryparams] = useSearchParams()
  const order_id = queryparams.get('order_id') ?? queryparams.get('order_id')

  
  const fetchdata = async () => {
    const response = await Axios.get(`${backendLink}/getorderdetails?order_id=${order_id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    });
    setamount(response.data.amount)

  }

  const placeorder = async () => {
    const response = await Axios.post(`${backendLink}/placeorder`, {
      transaction_id: referenceId,
      order_id: order_id
    }, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    });
    window.location.assign(response.data.url)
  }


  const [referenceId, setreferenceId] = useState('')

  useEffect(()=>{
    fetchdata()
  }, [])

  return (
    <>
      <NavBar />
      
      <div className='ordermain' kk={amount}>
        <div className="order_page_order_id">Order Id #{order_id}</div>
        <div className="order_total"> Total: {amount}</div>
        <div className="order_page_QR">
          {/* <QRCode value='upi://pay?pa=adhith.tharammal@oksbi&pn=Adhith%20T&tn=Hello%20World&am=200&cu=INR' title="H"/> */}
          {/* Even though tn doesn't show while paying it later on shows in history */}
          <QRCode value={`upi://pay?pa=${upiId}&pn=${company}&tn=${order_id}&am=${amount}&cu=INR&invoiceNo=${order_id}`} />
        </div>
        <div className="order_reference_container">
          <input value={referenceId} className='order_reference_id' onChange={(e) => { setreferenceId(e.target.value) }} placeholder="Transaction ID" />
        </div>
        <button className="order_rounded_button" onClick={placeorder}> Submit</button>
      </div>
      <Footer />
    </>
  )
}

export default Order