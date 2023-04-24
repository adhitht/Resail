import React, { useEffect, useState } from "react";
import '../assets/css/components/ProductView.css'
import Axios from 'axios';
import { backendLinks, backendLink } from '../config';


function ProductView({ image, color, posted_on, title, price, on_add, product_id, changecart}) {
    const [cartpresent, setcartpresent] = useState(false)
    const [cartchanged, setcartchanged] = useState(false)

    const handleAddtoCart = async () => {
        await Axios.post(`${backendLink}/postcart`, {
            product_id: product_id
        },
            {
                headers: { "x-access-token": localStorage.getItem("token") }
            })
        changecart[1](!changecart[0])
        // setcartchanged(!cartchanged)
        // console.log(cartpresent)
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
        handleCheckCart() }, [])

    useEffect(() => {
        handleCheckCart()
    }, [changecart[0]])

    const month = ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const posted = `${month[new Date(posted_on).getMonth() - 1]} ${new Date(posted_on).getDate()}`
    return (
        <div className="productview" style={{ backgroundColor: color, color: color == 'black' ? 'white' : 'black' }} >
            <div className="productdate" onClick={() => { window.location.assign(`/product/?product_id=${product_id}`, "_self") }}>{posted}</div>
            <div className="productimage" style={{
                        backgroundImage: `url(${image})`, backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}onClick={() => { window.location.assign(`/product/?product_id=${product_id}`, "_self") }}></div>
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

            </div>
        </div>
    )
}

export default ProductView