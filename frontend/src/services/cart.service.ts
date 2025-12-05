import api from "./api";
export const cartService = {
  get: async () => (await api.get("/cart")).data,
  add: async (productId:number, quantity=1) => (await api.post("/cart/add", { productId, quantity })).data,
  removeItem: async (itemId:number) => (await api.delete(`/cart/item/${itemId}`)).data
};