
import Axios from "axios";
import { backendLink,  backendLinks } from "../config";

const countcart = async () => {
    const response = await Axios.get(`${backendLink}/getcart`, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    });
    // setcartcount(response.data.data.length)
    return (response.data.data.length)
}

export default countcart
