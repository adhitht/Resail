import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import '../assets/css/Products.css'
import NavBar from "../components/NavBar";
import { backendLinks, backendLink } from '../config';
import Footer from '../components/Footer';
import { ArrowDown, ArrowUp, Time, ChevronDown, ChevronUp } from '@carbon/icons-react'
import ProductView from "../components/ProductView";

// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.css';

function Products() {
    const [productslist, seetproductslist] = useState([]);
    const [sortoption, setsortoption] = useState(false)
    const [sortoptions, setsortoptions] = useState('latest')
    const [searchtext, setsearchtext] = useState('')
    const [cartchanged, setcartchanged] = useState(true)

    const load_products = async () => {
        const response = await Axios.get(`${backendLink}/productsearch?search=${searchtext}&order_by=${sortoptions}`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        seetproductslist(response.data)
    }

    useEffect(() => {load_products()}, [])
    useEffect(() => {load_products()}, [searchtext, sortoptions])
    return (
        <>

            <NavBar />
            <div className="searchFilter">
                <input type='text' className='productsinput' placeholder='Search items' onChange={(e) => { setsearchtext(e.target.value) }} />
                <div className="productdropdown" style={{ position: 'relative' }} onClick={() => { setsortoption(!sortoption) }}>
                    Sort {sortoption ? (<ChevronUp size='1.25rem' style={{ paddingTop: '2px' }} />) : (<ChevronDown size='1.25rem' style={{ paddingTop: '2px' }} />)}
                    <div className="sortoptions" style={{ display: sortoption ? 'block' : 'none' }}>
                        <div className="avataroption" onClick={() => { setsortoptions('latest') }}><Time size='1.75rem' style={{ marginRight: '5px' }} />Latest</div>
                        <div className="avataroption" onClick={() => { setsortoptions('desc') }}><ArrowDown size='1.75rem' style={{ marginRight: '5px' }} />Price</div>
                        <div className="avataroption" onClick={() => { setsortoptions('asc') }}><ArrowUp size='1.75rem' style={{ marginRight: '5px' }} />Price</div>
                    </div>
                </div>
            </div>
            <div className="productspageproductscontainer">
                {productslist &&
                    productslist.map(product =>
                        <ProductView key={product.product_id}
                            image={product.images}
                            title={product.name}
                            color='white'
                            posted_on={product.posted_on}
                            price={product.price}
                            product_id={(product.product_id)}
                            changecart={[cartchanged, setcartchanged]} />
                    )
                }
            </div>
        </>

    )
}

export default Products