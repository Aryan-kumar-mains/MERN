import axios from "axios";

// http://localhost:8000
const url = "";

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user);
    } catch (error) {
        console.log("Error while calling signup api",error);
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    } catch(error) {
        console.log("Error while calling login api", error);
    }
}

export const payUsingPaytm = async (data) => {
    try {
        console.log("Payment api");
        let response = await axios.post(`${url}/payment`,data);  // this is a post api, so whe have to send data also as a body
        console.log("Payment API after post request");
        return response.data;
    } catch(error) {
        console.log("Error while calling paytm api", error);
    }
}