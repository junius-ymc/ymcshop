import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getOrdersAdmin = async (token) => {
  return axios.get(`${BASE_URL}/api/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axios.put(
    `${BASE_URL}/api/admin/order-status`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getListAllUsers = async (token) => {
  return axios.get(`${BASE_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token,value) => {
  return axios.post(`${BASE_URL}/api/change-status`,value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  return axios.post(`${BASE_URL}/api/change-role`,value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardStats = async (token) => {
  return axios.get(`${BASE_URL}/api/admin/dashboard-stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRecentOrders = async (token) => {
  return axios.get(`${BASE_URL}/api/admin/recent-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDailySalesChart = async (token) => {
  return axios.get(`${BASE_URL}/api/admin/chart-daily-sales`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDailySales = async (token) => {
  return axios.get(`${BASE_URL}/api/admin/daily-sales`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMonthlySales = async (token) => {
  return axios.get(`${BASE_URL}/api/admin/chart-monthly-sales`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};