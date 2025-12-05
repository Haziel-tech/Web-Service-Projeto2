import api from "./api";
export const categoryService = {
  list: async () => (await api.get("/categories")).data,
  create: async (payload:{name:string}) => (await api.post("/categories", payload)).data,
  remove: async (id:number) => (await api.delete(`/categories/${id}`)).data
};