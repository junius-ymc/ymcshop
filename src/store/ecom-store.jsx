import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },
  loading: false, // ✅ เพิ่มตัวแปร Loading
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
    const res = await axios.post("http://localhost:5001/api/login", form);
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
  getProduct: async (count, page = 1, append = false) => {
    set({ loading: true }); // ✅ เริ่มโหลด
    try {
      const res = await listProduct(count, page);
      // set({ products: res.data });
      set((state) => ({
        products: append ? [...state.products, ...res.data] : res.data, // ✅ Append ถ้าโหลดเพิ่ม
        hasMore: res.data.length > 0, // ✅ เช็กว่ายังมีสินค้าอีกไหม
      }));
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false }); // ✅ โหลดเสร็จ
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => set({ carts: [] }),
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
