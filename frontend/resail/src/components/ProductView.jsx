import React, { useEffect, useState } from "react";
import '../assets/css/components/ProductView.css'
import Axios from 'axios';
import { backendLink } from '../config';


function ProductView({ image, color, posted_on, title, price, on_add, product_id, changecart }) {
    const [cartpresent, setcartpresent] = useState(false)

    const checklogin = () => {
        const token = localStorage.getItem('token')
        const picture = localStorage.getItem('picture')
        if (token && picture) {
            return true
        }
        else {
            return false
        }
    }

    const handleAddtoCart = async () => {
        // if(lcal)
        if (checklogin()) {
            await Axios.post(`${backendLink}/postcart`, {
                product_id: product_id
            },
                {
                    headers: { "x-access-token": localStorage.getItem("token") }
                })
            changecart[1](!changecart[0])
        }
        else {
            const confirmsignin = window.confirm('Should I take you to sign in page?')
            if (confirmsignin) {
                window.open(`${backendLink}/auth/google`, "_self");
                // window.location.as
            }

        }
    }


    const handleCheckCart = async () => {
        const response = await Axios.post(`${backendLink}/checkcart`, {
            product_id: product_id
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });

        setcartpresent(!response.data.ispresent)
    };

    useEffect(() => {
        handleCheckCart()
    }, [])

    useEffect(() => {
        handleCheckCart()
    }, [changecart[0]])

    const month = ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const posted = `${month[new Date(posted_on).getMonth()]} ${new Date(posted_on).getDate()}`
    return (
        <div className="productview" style={{ backgroundColor: color, color: color == 'black' ? 'white' : 'black' }} >
            <div className="productdate" onClick={() => { window.location.assign(`/product/?product_id=${product_id}`, "_self") }}>{posted}</div>
            <div className="productimage" style={{
                backgroundImage: `url(${image})`, backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }} onClick={() => { window.location.assign(`/product/?product_id=${product_id}`, "_self") }}></div>
            <div className="details" k={cartpresent}>
                <div className="product_title" onClick={() => { window.location.assign(`/product/?product_id=${product_id}`, "_self") }}>{title}</div>
                <div className="product_price" onClick={() => { window.location.assign(`/product/?product_id=${product_id}`, "_self") }}>₹ {price}</div>
                {cartpresent ?
                    (<button k={cartpresent} className="add_button" onClick={handleAddtoCart} style={{ color: color == 'black' ? 'white' : 'black' }}>
                        <span color='white'>Add</span>
                        <span>+</span>
                    </button>) :
                    (<button className="add_button" onClick={on_add} style={{ color: color == 'black' ? 'white' : 'black' }}>
                        <span color='white'>Added</span>
                        <span>+</span>
                    </button>)}
                     <button className="Negotiate" onClick={() =>{window.open('https://wa.me/917892669254','_blank')}} style={{ color: color == 'black' ? 'white' : 'black' }}>
                        <span color='white'>Negotiate</span></button>

            </div>
        </div>
    )
}

export default ProductView
