import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createUserCart = async (token, cart) => {
  // code body
  // return axios.post("https://ymc-shop-api.vercel.app/api/user/cart", cart, {
    return axios.post(`${BASE_URL}/api/user/cart`, cart, {
      headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  // code body
  return axios.get(`${BASE_URL}/api/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address, name) => {
  // code body
  return axios.post(
    `${BASE_URL}/api/user/address`,
    { address, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  // code body
  return axios.post(`${BASE_URL}/api/user/order`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  // code body
  return axios.get(`${BASE_URL}/api/user/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userLocation = async () => {
  return axios.get(`${BASE_URL}/api/user/ip`);
};