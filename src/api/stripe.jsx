import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const payment = async (token) => 
    await axios.post(`${BASE_URL}/api/user/create-payment-intent`, {}, {
        headers: {
        Authorization: `Bearer ${token}`
    }
})