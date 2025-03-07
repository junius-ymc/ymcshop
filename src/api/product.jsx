import axios from "axios";

export const createProduct = async (token, form) => {
  // code body
  return axios.post("https://ymc-shop-api.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const listProduct = async (count = 10) => {
// count = จำนวนที่ดึงจากฐานข้อมูล
// ให้แสดงสินค้ากี่ชิ้นต่อ 1หน้า เช่น เมื่อเลื่อนสกอร์ จะแสดงสินค้าทีละ 4 ชิ้น
export const listProduct = async (count = 4, page = 1) => {
  // code body
  // return axios.get("https://ymc-shop-api.vercel.app/api/products/" + count);
  return axios.get(`https://ymc-shop-api.vercel.app/api/products/${count}?page=${page}`);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete("https://ymc-shop-api.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put("https://ymc-shop-api.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://ymc-shop-api.vercel.app/api/images",
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
  // console.log('form api frontent', form)
  return axios.post(
    "https://ymc-shop-api.vercel.app/api/removeimages",
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
  return axios.post("https://ymc-shop-api.vercel.app/api/search/filters", arg);
};

export const listProductBy = async (sort, order, limit) => {
  // code body
  return axios.post("https://ymc-shop-api.vercel.app/api/productby", {
    sort,
    order,
    limit,
  });
};
