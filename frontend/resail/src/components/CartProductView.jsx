import React from "react";
import '../assets/css/Product.css'
import '../assets/css/components/CartProduct.css'
import Axios from "axios";
import { backendLinks, backendLink } from '../config';


function CartProductView({product_id,load, image, name, price, description, }) {

    const removefromcart = async (id) => {

        const remove = await Axios.post(`${backendLink}/removecart?product_id=${id}`, {
            product_id : id
        },{
            headers: {
                "x-access-token": localStorage.getItem('token'),
            }
        })
        load()
    }
    return (<>
        <div className="product_cart_main">
            <div className="product_cart_image" style={{
                        backgroundImage: `url(${image})`, backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}>
                {/* <img src={image} /> */}
            </div>
            <div className="product_cart_details">
                <div className="product_cart_heading">
                    <div className="product_cart_name">{name}</div>
                    <div className="product_cart_price">{price}</div>
                </div>
                <hr className="product_cart_hr" />
                <div className="product_cart_desc_cont">
                    <div className="product_cart_description">{description}</div>
                    <a style={{fontSize: '150%', cursor: 'pointer'}} onClick={() => {removefromcart(product_id)}}>Remove</a>
                </div>
            </div>

        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <hr className="product_cart_hr" style={{width: '75%', margin: 0}}/>
            </div>

        </>
    )
}

export default CartProductView;