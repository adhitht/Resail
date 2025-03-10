import Axios from "axios";
import React, { useState, useEffect } from "react";
import '../assets/css/MyOrders.css'
import NavBar from "../components/NavBar";
import { backendLink } from '../config';
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
        <Footer />
    </>
    )
}

export default MyOrders