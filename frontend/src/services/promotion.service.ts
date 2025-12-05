import api from "../api";
export const promotionService = {
  list: async () => (await api.get("/promotions")).data,
  create: async (payload:any) => (await api.post("/promotions", payload)).data,
  remove: async (id:number) => (await api.delete(`/promotions/${id}`)).data
};