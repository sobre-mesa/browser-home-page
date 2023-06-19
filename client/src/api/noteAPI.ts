import { Note } from "../models/Note"
import { APIResponse, APIResponseWithArray, EmptyResponse } from "../models/API"

export const noteAPI = {
  getNote: async (id: string) => {
    try {
      const response = await fetch(`/note/${id}`, { mode: "cors" })
      const data: APIResponse<Note> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  getAllNotes: async () => {
    try {
      const response = await fetch(`/note`, { mode: "cors" })
      const data: APIResponseWithArray<Note> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  createNote: async (note: Note) => {
    try {
      const response = await fetch(`/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      })
      const data: APIResponse<Note> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  updateNote: async (id: string, note: Note) => {
    try {
      const response = await fetch(`/note/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      })
      const data: APIResponse<Note> = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
  deleteNote: async (id: string) => {
    try {
      const response = await fetch(`/note/${id}`, {
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
