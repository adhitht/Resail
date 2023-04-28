import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ShoppingCart, UserAvatar, Power } from '@carbon/icons-react'
import { Avatar } from '@mui/material';
import '../assets/css/components/NavBar.css'
import { backendLink, backendLinks } from "../config";
import resaillogo from '../../src/img/resaillogo.png'

function NavBar(changestate) {
    const [searchResult1, setsearchResult1] = useState([])
    const [picture, setpicture] = useState()
    const [cartcount, setcartcount] = useState(0)
    const [avataroptionshow, setavataroptionshow] = useState(false)
    const [logout, setlogout] = useState(false)

    const loginprocedure = () => {
        setpicture(localStorage.getItem('picture'));
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

    const google = () => {
        window.open(`${backendLink}/auth/google`, "_self");
    };

    const countcart = async () => {
        const response = await Axios.get(`${backendLink}/getcart`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        setcartcount(response.data.data.length)
    }

    const searchproducts1 = async (search) => {
        if (search != '') {
            const response = await Axios.get(`${backendLink}/searchproducts?search=${search}`,);
            setsearchResult1(response.data)
        }
        else {
            setsearchResult1([])
        }
    }

    useEffect(() => {
        checklogin(); loginprocedure(); countcart();
    }, [])

    useEffect(() => { countcart() }, [changestate])
    useEffect(() => { checklogin() }, [logout])

    return (
        <div className='productsnavbar'>
            <div className='productsnavbarheader' onClick={() => { window.location.assign('/') }}>
                Resail<p>BETA</p>
            </div>
            <div className="productsnavbarheadermobile" onClick={() => { window.location.assign('/') }}>
                <img src={resaillogo} style={{ height: '40px', margin: '0 7px' }} />
            </div>
            <div className='productsnavbaroptions'>
                <input type='text' className='productsnavbarinput' placeholder='Search items' onChange={(e) => { searchproducts1(e.target.value) }} />
                <div className='productsnavbarsearchresult' style={{}}>
                    {searchResult1 && searchResult1.map(result =>
                        <div key={result.product_id} className='searchresult' onClick={() => { window.location.assign(`/product?product=${result.product_id}`) }}>{result.name}</div>
                    )}
                </div>
                {checklogin() ?
                    (<div className='productscart' onClick={() => { window.location.replace(`/cart`) }}>
                        <ShoppingCart size='2rem' color='#868383' />
                        {cartcount ? (<div className="productcount"><p>{cartcount}</p></div>) : ''}
                    </div>)
                    : ''}


                <div className='productscart'>
                    {checklogin() ?
                        (<div className="avatar">
                            <Avatar src={picture} onClick={() => { setavataroptionshow(!avataroptionshow) }} />
                            <div className="avataroptions" style={{ display: avataroptionshow ? 'block' : 'none' }}>
                                <div className="avataroption" onClick={() => { window.location.assign('/profile') }}><UserAvatar size='1.75rem' style={{ marginRight: '5px' }} />My Profile</div>
                                <div className="avataroption" onClick={() => { window.location.assign('/myorders') }}>
                                    <svg width="25" height="17" viewBox="0 0 17 13" fill="none" style={{ marginTop: '2px', marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.0356165 0H16.9674C16.9822 0.232923 17.006 0.442553 17.006 0.655095C17.006 4.36827 17.006 8.08145 17.006 11.7946C17.006 12.8515 16.8517 13 15.772 13H7.18742V9.24121H9.16596L5.76359 5.66876L2.58369 9.19462H4.28932V12.9796C3.0761 12.9796 1.83321 13 0.596256 12.9592C0.409378 12.9592 0.183931 12.6681 0.0712109 12.4701C-0.000421326 12.2654 -0.023744 12.0473 0.00299125 11.8325C0.00299125 8.09406 0.00299125 4.35663 0.00299125 0.620158C0.00299125 0.430908 0.0178185 0.244569 0.0356165 0Z" fill="white" />
                                    </svg>
                                    My Orders</div>
                                <div className="avataroption" onClick={() => { setlogout(!logout); window.location.assign('/'); localStorage.removeItem('token'); localStorage.removeItem('picture') }}><Power size='1.55rem' style={{ marginRight: '5px' }} />Logout</div>

                            </div>
                        </div>) :
                        (<button type="button" className="login-with-google-btn" onClick={google}>
                            Sign in
                        </button>)
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar