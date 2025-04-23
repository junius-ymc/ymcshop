import axios from "axios";

// https://ymc-shop-api.vercel.app/api/admin/orders

export const getOrdersAdmin = async (token) => {
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderId, orderStatus) => {
  // code body
  return axios.put(
    "https://ymc-shop-api.vercel.app/api/admin/order-status",
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
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token,value) => {
  // code body
  return axios.post("https://ymc-shop-api.vercel.app/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  // code body
  return axios.post("https://ymc-shop-api.vercel.app/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardStats = async (token) => {
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/admin/dashboard-stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRecentOrders = async (token) => {
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/admin/recent-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDailySalesChart = async (token) => {
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/admin/chart-daily-sales", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDailySales = async (token) => {
  // code body
  return axios.get("https://ymc-shop-api.vercel.app/api/admin/daily-sales", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
