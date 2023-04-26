import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import '../assets/css/SellNow.css'
import NavBar from "../components/NavBar";
import { backendLinks, backendLink } from '../config';
import InputBox from "../components/InputBox";
import Footer from '../components/Footer';

// 9e41376b0fcd8ba05c7fb788b50cd939
function SellNow() {
    const [item_desc, setitem_desc] = useState();
    const [item_title, setitem_title] = useState();
    const [exp_price, setexp_price] = useState();
    const [ask_price, setask_price] = useState();
    const [data, setdata] = useState();
    const [imglink, setimglink] = useState();

    const editprofile = async () => {
        console.log('HJello')
    }

    const uploadimgur = async () => {
        const formdata = new FormData()
        formdata.append('image', data)
        formdata.set('key', '9e41376b0fcd8ba05c7fb788b50cd939')
        console.log(formdata, formdata)
        const response = await Axios.post(`https://api.imgbb.com/1/upload`, {
            data: formdata
        },)

        // await fetch("https://api.imgur.com/3/image/", {
        //     // API Endpoint
        //     method: "POST", // HTTP Method
        //     body: formdata, // Data to be sent
        //     headers: {
        //         // Setting header
        //         Authorization: "Client-ID aca6d2502f5bfd8",
        //         Accept: "application/json",
        //     },
        // })
        //     // Handling success
        //     .then((res) => alert("image uploaded") && console.log(res) && setimglink(res.data.link))
        //     .catch((err) => alert("Failed") && console.log(err));

        // setimglink(response.data.link)
    }

    const uploadimagebb = async () => {
        const formdata = new FormData()
        formdata.append('image', data)
        formdata.set('key', '9e41376b0fcd8ba05c7fb788b50cd939')
        const response = await Axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: formdata
        })
        setimglink(response.data.data.display_url)
    }


    const postproduct = async () => {
        await uploadimagebb()
        console.log(imglink)
        const response = await Axios.post(`${backendLink}/postproduct`, {
            name: item_title,
            description: item_desc,
            ask_price: ask_price,
            exp_price: exp_price,
            pictures: imglink
        },
            {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            })
        if (response.data.success) {
            alert('Image uploaded successfully')
            window.location.assign(`${backendLink}/product/product_id=${response.data.product_id}`)
        }
    }

    const postproduct2 = async () => {
        const formdata = new FormData()
        formdata.append('image', data)
        formdata.set('key', '9e41376b0fcd8ba05c7fb788b50cd939')
        const response = await Axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: formdata
        })

        const response2 = await Axios.post(`${backendLink}/postproduct`, {
            name: item_title,
            description: item_desc,
            ask_price: ask_price,
            exp_price: exp_price,
            pictures: response.data.data.display_url
        },
            {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            })
        if (response2.data.success) {
            alert('Image uploaded successfully')
            window.location.assign(`/product?product_id=${response2.data.product_id}`)
        }
    }

    return (
        <>
            <NavBar />

            <div className='profilemain'>
                Sell Your Item
                <div>
                    <InputBox title='Item Title' value={item_title} setValue={setitem_title} />
                    <InputBox title='Item Description' type='textarea' value={item_desc} setValue={setitem_desc} />
                    <InputBox title='Expected Price(in INR)' value={exp_price} setValue={setexp_price} />
                    <InputBox title='Ask Price(in INR)' value={ask_price} setValue={setask_price} />
                    <input style={{ width: '100%' }} accept="image/png,image/jpg,image/svg,image/jpeg" type='file' placeholder="asd" onChange={(e) => { setdata(e.target.files[0]); }} />
                    <p> </p>
                </div>
                <button className="sellnow_submit" onClick={postproduct2}>Post Ad</button>
            </div>
            <Footer />
        </>
    )
}

export default SellNow