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
  products: [], // เก็บสินค้าทั้งหมด
  loading: false, // ✅ เพิ่มตัวแปร Loading
  totalPages: 1, // ✅ เก็บจำนวนหน้าทั้งหมด
  currentPage: 1, // ✅ เก็บหน้าปัจจุบัน
  itemsPerPage: 4, // ✅ ค่าเริ่มต้น

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
    // const res = await axios.post("http://localhost:5001/api/login", form);
    const res = await axios.post("https://ymc-shop-api.vercel.app/api/login", form);
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

  getProduct: async (itemsPerPage, page = 1) => {
    set({ loading: true });
    try {
      console.log("📦 กำลังโหลดสินค้า...");
      const res = await listProduct(itemsPerPage, page);
      console.log("📦 ดึงสินค้าสำเร็จ ตอนนี้อยู่ที่หน้า:", page);
      set({
        products: res.data.products,
        totalPages: res.data.totalPages,
        // ใช้ค่าจาก API
        // currentPage: res.data.currentPage, 
        // itemsPerPage: res.data.itemsPerPage,
        // ✅ ใช้ค่าจาก พารามิเตอร์
        // currentPage: page, 
        itemsPerPage: itemsPerPage,
      });
    } catch (err) {
      console.log("❌ โหลดสินค้าล้มเหลว:", err);
    } finally {
      set({ loading: false });
    }
  },

  // setPage: (page) => set({ currentPage: page }), // ✅ ฟังก์ชันเปลี่ยนหน้า
  // ✅ ฟังก์ชันเปลี่ยนหน้า
  setPage: (page) => {
    set((state) => {
      console.log("🚀 เปลี่ยนหน้าเป็น:", page);
      return { currentPage: page };
    });
  },

  // ✅ ฟังก์ชันคำนวณหน้าที่สินค้า
  calculatePageForProduct: async (productId, itemsPerPage) => {
    try {
      // const res = await axios.get(`http://localhost:5001/api/products/${productId}/page?itemsPerPage=${itemsPerPage}`);
      const res = await axios.get(`https://ymc-shop-api.vercel.app/api/products/${productId}/page?itemsPerPage=${itemsPerPage}`);
      console.log("📦 ผลลัพธ์จาก API:", res.data); // ✅ เพิ่ม log เพื่อตรวจสอบ
      return res.data.page; // ✅ ส่งค่าหน้าที่คำนวณได้กลับมา
    } catch (error) {
      console.error("Failed to fetch product page:", error);
      return 1; // ✅ หากเกิดข้อผิดพลาด ให้กลับไปหน้าแรก
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
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
