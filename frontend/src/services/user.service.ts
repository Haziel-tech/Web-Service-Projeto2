import api from "./api";
export const userService = {
  list: async () => (await api.get("/users")).data,
  get: async (id:number) => (await api.get(`/users/${id}`)).data,
  create: async (payload:any) => (await api.post("/auth/register", payload)).data,
  update: async (id:number,payload:any) => (await api.put(`/users/${id}`, payload)).data,
  remove: async (id:number) => (await api.delete(`/users/${id}`)).data
};