import React from "react";
import '../assets/css/Product.css'
import '../assets/css/components/MyOrder.css'
import Axios from "axios";
import { backendLinks, backendLink } from '../config';

function MyOrderView({ order_id, image, name, amount, order_status }) {
    return (
        <div className="myorderview">
            {/* <img */}
            <div className="myorder_image" style={{
                backgroundImage: `url(${image})`, backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}></div>
            <div className="myorderdetailwrap">
                <div className="myorderdetails1">
                    <p>{name}</p>
                    <p>OrderID= {order_id}</p>
                </div>

                <div className="myorderamount">
                ₹ {amount}
                </div>

                <div className="myorderstatus">
                    <p>Order Status:</p>
                    <p>{order_status}</p>
                </div>
            </div>
        </div>)
}

export default MyOrderView