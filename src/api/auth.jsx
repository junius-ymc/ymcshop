import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const currentUser = async (token) => await axios.post(`${BASE_URL}/api/current-user`, {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post(`${BASE_URL}/api/current-admin`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const forgotPwd = async (email) => {
  return await axios.post(`${BASE_URL}/api/forgot-password`, email, )
}

export const resetPwd = async (token, password) => {
  return await axios.post(`${BASE_URL}/api/reset-password`, token, password, )
}