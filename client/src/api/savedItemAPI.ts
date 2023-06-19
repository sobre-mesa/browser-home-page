import { SavedItem } from "../models/SavedItem"
import { APIResponse, APIResponseWithArray, EmptyResponse } from "../models/API"

export const savedItemAPI = {
  getSavedItem: async (id: string) => {
    try {
      const response = await fetch(`/savedItem/${id}`, { mode: "cors" })
      const data: APIResponse<SavedItem> = await response.json()
      return data;
    } catch (error) {
      console.log(error)
    }
  },
  getAllSavedItems: async () => {
    try {
      const response = await fetch(`/savedItem`, { mode: "cors" })
      const data: APIResponseWithArray<SavedItem> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  createSavedItem: async (savedItem: SavedItem) => {
    try {
      const response = await fetch(`/savedItem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedItem),
      })
      const data: APIResponse<SavedItem> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  updateSavedItem: async (id: string, savedItem: SavedItem) => {
    try {
      const response = await fetch(`/savedItem/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedItem),
      })
      const data: APIResponse<SavedItem> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  deleteSavedItem: async (id:string) => {
    try {
      const response = await fetch(`/savedItem/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      const data: EmptyResponse = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
}
