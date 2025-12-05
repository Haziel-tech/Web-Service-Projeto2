import api from "../api";
export type ProductDTO = {
  id?: number; name: string; description?: string; price: number; promoPrice?: number | null; stock?: number; categoryId?: number;
};
export const productService = {
  list: async () => (await api.get("/products")).data as ProductDTO[],
  get: async (id:number) => (await api.get(`/products/${id}`)).data as ProductDTO,
  create: async (p:ProductDTO) => (await api.post("/products", p)).data,
  update: async (id:number,p:Partial<ProductDTO>) => (await api.put(`/products/${id}`, p)).data,
  remove: async (id:number) => (await api.delete(`/products/${id}`)).data
};