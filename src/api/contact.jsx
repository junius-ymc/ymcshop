import axios from 'axios'

// export const createContact = async (token, formData) => 
//     await axios.post('http://localhost:5001/api/contact', formData, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })

export const createContact = async (token, formData) => {
    // code body
    return axios.post('https://ymc-shop-api.vercel.app/api/contact', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getContact = async (token) => {
    // code body
    return axios.get("https://ymc-shop-api.vercel.app/api/contact", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  export const removeContact = async (token, id) => {
    // code body
    return axios.delete('https://ymc-shop-api.vercel.app/api/contact/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
