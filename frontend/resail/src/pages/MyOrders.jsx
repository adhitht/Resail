import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import '../assets/css/MyOrders.css'
import NavBar from "../components/NavBar";
import { backendLinks, backendLink } from '../config';
import QRCode from "react-qr-code";
import Footer from '../components/Footer';
import MyOrderView from "../components/MyOrderView";

function MyOrders() {
    const [orders, setorders] = useState([])

    const load = async () => {
        const response = await Axios.get(`${backendLink}/getorder`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        console.log(response.data)
        setorders(response.data)
    }

    useEffect(() => {load()}, [])
    return (<>
        <NavBar />
        <p className="myordersheading">My Orders</p>
        <div className="myorderscont">
            {orders && orders.map(
                order => (<MyOrderView
                    order_id={order.order_id}
                    image={order.images}
                    name={order.name}
                    amount={order.amount}
                    order_status={order.status} />)
            )}

        </div>
    </>
    )
}

export default MyOrders