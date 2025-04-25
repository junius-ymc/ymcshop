// ✅ File 5: review API (axios front)
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE = `${BASE_URL}/api/review`;

export const createReview = async (token, formData) => {
  return axios.post(`${API_BASE}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readReview = async (token, id) => {
  return axios.get(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editReview = async (token, id, formData) => {
  return axios.put(`${API_BASE}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReview = async (token) => {
  return axios.get(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeReview = async (token, id) => {
  return axios.delete(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const toggleReviewEnabled = async (token, id, enabled) => {
  return axios.put(`${API_BASE}/toggle/${id}`, { enabled }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getEnabledReviews = async (limit = 10) => {
  return axios.get(`${API_BASE}/enabled?limit=${limit}`);
};

export const uploadFiles = async (token, data) => {
  return axios.post(
    `${API_BASE}/createimages`,
    // { image: base64Image },
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return axios.post(
    `${API_BASE}/removeimages`,
    { public_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
