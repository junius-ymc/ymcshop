import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createProduct = async (token, form) => {
  // code body
  return axios.post(`${BASE_URL}/api/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ตัวแปร count = จำนวนที่ดึงจากฐานข้อมูล
export const listProduct = async (count = 200) => {
  // code body
  return axios.get(`${BASE_URL}/api/products/` + count);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get(`${BASE_URL}/api/product/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete(`${BASE_URL}/api/product/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put(`${BASE_URL}/api/product/` + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    `${BASE_URL}/api/images`,
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  // code
  return axios.post(
    `${BASE_URL}/api/removeimages`,
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  // code body
  return axios.post(`${BASE_URL}/api/search/filters`, arg);
};

export const listProductBy = async (sort, order, limit) => {
  // code body
  return axios.post(`${BASE_URL}/api/productby`, {
    sort,
    order,
    limit,
  });
};
