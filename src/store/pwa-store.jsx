import { create } from "zustand";

const usePwaStore = create((set) => ({
  deferredPrompt: null,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
}));

export default usePwaStore;
