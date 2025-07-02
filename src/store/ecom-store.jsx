import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import { userLocation } from "../api/user";
import { currentUser } from "../api/auth";
import _ from "lodash";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  userLocationData: [],
  categId: null,
  loading: false, // ✅ เพิ่มตัวแปร Loading

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
      userLocationData: [],
      categId: null,
    });
  },
  
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    // Step Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Clickkkkk', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveProduct: (productId) => {
    // console.log('remove jaaaaa', productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axios.post(`${BASE_URL}/api/login`, form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getProduct: async (count) => {
    set({ loading: true }); // ✅ เริ่มโหลด
    try {
      console.log("📦 กำลังโหลดสินค้า...");
      const res = await listProduct(count);
      console.log("📦 ดึงสินค้าสำเร็จ");
      set({ products: res.data });
    } catch (err) {
      console.log("❌ โหลดสินค้าล้มเหลว:", err);
    } finally {
      set({ loading: false }); // ✅ โหลดเสร็จ
    }
  },

  actionSearchFilters: async (arg) => {
    set({ loading: true }); // ✅ เริ่มโหลด
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false }); // ✅ โหลดเสร็จ
    }
  },
  clearCart: () => set({ carts: [] }),

  getUserLocation: async (countryCode, countryName) => {
    const current = get().userLocationData;

    if (countryCode) {
      // console.log("ประเทศผู้ใช้จากหน้าบ้านคือ:", countryCode);
      set({ userLocationData: {countryCode:countryCode, country:countryName, ip:current?.ip} });
      return;
      }

    // ✅ ป้องกันโหลดซ้ำ ถ้าเคยโหลดแล้วไม่โหลดซ้ำ
    if (current?.countryCode && current.countryCode !== "xx") return;

    try {
      const res = await userLocation();
      set({ userLocationData: res.data });
      console.log("ประเทศผู้ใช้จากหลังบ้านคือ:", res.data);
    } catch (err) {
      console.error("ไม่สามารถดึงประเทศได้:", err);
    }
  },

  actionGetUserUpdate: async (token) => {
    try {
      const res = await currentUser(token);
      set({ user: res.data.user });
      // console.log(res.data.user);
    } catch (err) {
      console.log(err);
    }
  },

  categoryIdSe: (arg) => set({ categId: arg }),

});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
