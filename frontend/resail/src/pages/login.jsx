import React, { useState } from "react";
import axios from 'axios';
import InputBox from "../components/InputBox";
import { backendLinks, backendLink } from '../config';


function Login() {
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        console.log('Clicked');
        const res = await axios.get(`${backendLink}/auth/google`, {
        });
        console.log(res)
        setUser(res.data);
    };

    const google = () => {
        window.open(`${backendLink}/auth/google`, "_self");
    };

    const test = async () => {
        console.log('Clicked');
        const res = await axios.get(`${backendLink}/test`, {
        });
        console.log(res.data)
        // setUser(res.data);
    };

    const handleLogout = async () => {
        const res = await axios.get(`${backendLink}/auth/logout`);
        setUser(null);
    };

    return (
        <>
            <div>
                <div className="heading">
                    <div>
                        Resail
                    </div>
                    <p>The sustainable way to shop</p>
                </div>
                <div>
                    <div>
                        Sign in
                    </div>
                    <InputBox title='Email ID' />
                    <InputBox title='Password' />
                    <button type='submit' onClick={handleLogin}>Continue</button>
                    <p>or</p>
                    <button type='submit' onClick={google}>Sign in with Google</button>

                </div>
            </div>
        </>
    )
}

export default Login