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
    const [wanumber, setwanumber] = useState('918374602924')
    const [cartactive, setcartactive] = useState(true)
    const [changecart, setchangecart] = useState(true)
    const[selected,setSelected]=useState(null)
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
        if (response.data[0].phonenumber.length == 12){
            setwanumber(response.data[0].phonenumber)
        }
        else if(response.data[0].phonenumber.length == 10){
            setwanumber(`91${response.data[0].phonenumber}`)
        }

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
    const toggle = (i) =>{
        if(selected == i){
            return setSelected(null)
        }
        
        setSelected(i)

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

                    <button className="product_page_cart cart_white_negotiate" onClick={() => {window.open(`https://wa.me/${wanumber}`,'_blank')}}>Negotiate</button>
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
            <div className="Headings">
            <h1>FAQs</h1>
            <p>Have a question?</p>
            </div>
            <div className="wrapper">
           
                <div className="accordian">
           {data.map((item, i) => (
        <div className="item" key={i}>
            <div className="title" onClick={()=>toggle(i)}><h2>{item.question}</h2>
            <span>{selected === i ? '-' :'+'}</span>
            </div>
             <div className={selected === i ? 'content_show' :'content'}>{item.answer}</div>
            </div>
              ))}
              </div>
            </div>
            <Footer />
           
        </>
    )
}
const data=[
    {
        question:'Question 1',
        answer:'efhiuahfiuawfihifh'
    },
    {
    question:'Question 2',
    answer:'fauifhaeiwilruf'
    },
    {
        question:'Question 3',
        answer:'fauifhaeiwilasfasruf'
    },
    {
        question:'Question 4',
        answer:'fauifhaeafswefaruf'
    }
]
export default Product;
