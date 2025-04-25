import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createCategory = async (token, form) => {
    // code body
    return axios.post(`${BASE_URL}/api/category`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    // code body
    return axios.get(`${BASE_URL}/api/category`)
}

export const removeCategory = async (token, id) => {
    // code body
    return axios.delete(`${BASE_URL}/api/category/`+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}