import React, { useEffect, useState } from 'react';
import '../assets/css/HomePage.css'
import ProductView from '../components/ProductView'
import Axios from 'axios';
// import { Menu } from '@carbon/icons-react'
import { Menu } from '@carbon/icons-react'

import NavBar from '../components/NavBar';
import { backendLink } from '../config';
import Footer from '../components/Footer';
// import countcart from '../components/NavBarCount';

function HomePage() {
    const [newest, setnewest] = useState([]);
    const [cartchanged, setcartchanged] = useState(true)
    const [main_header_displ,setmain_header_displ] = useState(false)

    const load_newproducts = async () => {
        const response = await Axios.get(`${backendLink}/products?order_by=latest&count=3`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        setnewest(response.data)
    }

    useEffect(() => { load_newproducts(); }, [])
    return (
        <div className='bodybody'>
            <div className='mainview'>
                <div className='main_header_ham'>
                    <Menu size={30} color='#D0BA95' onClick={()=>{setmain_header_displ(!main_header_displ)} }/>
                </div>
                <div className='main_header' style={{ height: main_header_displ ? '165px' : '0'  }} >
                    <a href='products'>Products</a>
                    <a >About</a>
                    <a href='#contact'>Contact</a>
                </div>
                <div className='main_details'>
                    <p className='main_title'>ReSa<span>i</span>l</p>
                    <p className='main_subtitle'>Buy and Sell pre-owned products at affordable quality, of IITH Exclusive</p>
                    {/* <input type='text' className='main_input' placeholder='Search items' /> */}
                    <div className='button_wrap'>
                        <button className='buy_now_button rounded_button'><a href='#mainmain'>Buy Now</a></button>
                        <button className='sell_now_button rounded_button' onClick={() => { window.location.assign('/sellnow') }}>Sell Now</button>
                    </div>
                </div>
            </div>
            <NavBar changestate={cartchanged} />
            <div className='productsview' id='mainmain'>
                <div className='newest_arrivals'>
                    <p className='newest_arrivals_heading'>Newest Arrivals</p>
                    <div className='newest_arrivals_cont'>
                        {newest &&
                            newest.map(product =>
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
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage