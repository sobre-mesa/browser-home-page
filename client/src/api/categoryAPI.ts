import { Category } from "../models/Category"
import { APIResponse, APIResponseWithArray, EmptyResponse } from "../models/API"
export const categoryAPI = {
  getCategory: async (id: string) => {
    try {
      const response = await fetch(`/category/${id}`, { mode: "cors" })
      const data: APIResponse<Category>  = await response.json()
      return data;
    } catch (error) {
      console.log(error)
    }
  },
  getAllCategories: async () => {
    try {
      const response = await fetch(`/category`, { mode: "cors" })
      const data: APIResponseWithArray<Category>  = await response.json()
      return data;
    } catch (error) {
      console.log(error)
    }
  },
  createCategory: async (category: Category) => {
    try {
      const response = await fetch(`/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      })
      const data: APIResponse<Category> = await response.json()
      return data;
    } catch (error) {
      console.log(error)
    }
  },
  updateCategory: async (id: string, category: Category) => {
    try {
      const response = await fetch(`/category/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      })
      const data: APIResponse<Category> = await response.json()
      return data;
    } catch (error) {
      console.log(error)
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const response = await fetch(`/category/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      const data: EmptyResponse = await response.json()
      return data;
    } catch (error) {
      console.log(error)
    }
  },
}
