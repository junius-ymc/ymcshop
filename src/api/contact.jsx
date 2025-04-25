import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const createContact = async (token, formData) => 
//     await axios.post('https://ymc-shop-api.vercel.app/api/contact', formData, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })

export const createContact = async (token, formData) => {
    // code body
    return axios.post(`${BASE_URL}/api/contact`, formData, {
      headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getContact = async (token) => {
    // code body
    return axios.get(`${BASE_URL}/api/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  export const removeContact = async (token, id) => {
    // code body
    return axios.delete(`${BASE_URL}/api/contact/`+id, {
      headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
