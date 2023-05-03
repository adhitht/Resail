import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import '../assets/css/Product.css'
import NavBar from "../components/NavBar";
import {  backendLink } from '../config';
import Footer from '../components/Footer';


function Product() {
    const [queryparams] = useSearchParams()
    const product_id = queryparams.get('product') ?? queryparams.get('product_id')
    const [product_title, setproduct_title] = useState()
    const [product_price, setproduct_price] = useState()
    const [product_description, setproduct_description] = useState()
    const [product_image, setproduct_image] = useState()
    const [cartactive, setcartactive] = useState(true)
    const [changecart, setchangecart] = useState(true)

    const handleCheckCart = async () => {
        const response = await Axios.post(`${backendLink}/checkcart`, {
            product_id: product_id
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        // if(response.data.ispresent){
        setcartactive(!response.data.ispresent)
        // }
    };
    const load = async () => {
        const response = await Axios.get(`${backendLink}/getproduct?product_id=${product_id}`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),

            }
        });
        setproduct_title(response.data[0].name)
        setproduct_price(response.data[0].price)
        setproduct_description(response.data[0].description)
        setproduct_image(response.data[0].images)

    }

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
        if (checklogin()) {
            await Axios.post(`${backendLink}/postcart`, {
                product_id: product_id
            },
                {
                    headers: { "x-access-token": localStorage.getItem("token") }
                }).then((response) => {
                    if (response.data.added) {
                        setcartactive(false)
                    }
                });
            setchangecart(!changecart)
        }
        else {
            const confirmsignin = window.confirm('Should I take you to sign in page?')
            if (confirmsignin) {
                window.open(`${backendLink}/auth/google`, "_self");
            }
        }

    }

    useEffect(() => {
        load()
        handleCheckCart()
    }, [''])
    return (
        <>
            <NavBar changecart={changecart} />
            <div className="product_main_view">
                <div className="product_page_details">
                    <div className="product_page_title">{product_title}</div>
                    <div className="product_page_price">{product_price}</div>
                    <hr className="product_page_hr" />
                    <div className="product_page_description">{product_description}</div>
                    <div className ="product_page_cart the_buttons"> 
                   {cartactive ? <button className="product_page_cart cart_black" onClick={handleAddtoCart}>Add to Bag</button> :
                        <button className="product_page_cart cart_white" onClick={() => { window.location.assign('/cart') }}>View Kart</button>}

                    {cartactive ? <button className="product_page_cart cart_white_negotiate"> onClick={"https://wa.me/917892669254"}>Negotiate</button> 
                         </div>

                </div>
                <div className="product_page_image">
                    <div className="product_page_images" style={{
                        backgroundImage: `url(${product_image})`, backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Product;
