import api from "./api";
export const orderService = {
  create: async () => (await api.post("/orders")).data,
  list: async () => (await api.get("/orders")).data
};