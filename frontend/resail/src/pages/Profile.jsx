import Axios from "axios";
import React, { useState, useEffect } from "react";
import '../assets/css/Profile.css'
import NavBar from "../components/NavBar";
import { backendLink } from '../config';
import InputBox from "../components/InputBox";
import Footer from '../components/Footer';


function Profile() {
    const [email, setemail] = useState()
    const [hostel, sethostel] = useState()
    const [room, setroom] = useState()
    const [name, setname] = useState()
    const [phone, setphone] = useState()



    const fetchdata = async () => {
        const response = await Axios.get(`${backendLink}/getprofile`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        setname(response.data.name)
        setemail(response.data.email)
        sethostel(response.data.hostel)
        setphone(response.data.phone)
        setroom(response.data.room)
    }

    const editprofile = async () => {
        const response = await Axios.post(`${backendLink}/editprofile`, {
            hostel: hostel,
            room: room,
            phone: phone,
        }, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          }
        });

        window.location.assign('/')
    }
    

    useEffect(() => { fetchdata() }, [])
    // const []
    return (
        <>
            <NavBar />
            <div class='profilemain'>
                <p className="myordersheading">Personal Information</p>
                <div className="profile_arrange">
                    <InputBox title='Your Name' value={name} disabled />
                    <InputBox title='Your Hostel' value={hostel} setValue={sethostel}/>
                    <InputBox title='Email-ID' value={email} setValue={setemail} disabled />
                    <InputBox title='Your Hostel Room No' value={room} setValue={setroom}/>
                    <InputBox title='Mobile Number' value={phone} setValue={setphone}/>
                </div>
                <button className="profile_submit" onClick={editprofile}>Submit</button>
            </div>
            <Footer />
        </>
    )
}

export default Profile