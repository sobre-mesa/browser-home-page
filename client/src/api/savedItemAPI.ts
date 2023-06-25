import { SavedItem } from '../models/SavedItem';
import { get, post, put, del } from './api';

export const savedItemAPI = {
    getSavedItem: async (id: string) => await get(`/savedItems/${id}`),
    getAllSavedItems:   async () => await get('/savedItems'),
    createSavedItem: async (savedItem: SavedItem) => post('/savedItems', savedItem),
    updateSavedItem: async (id: string, savedItem: SavedItem) => put(`/savedItems/${id}`, savedItem),
    deleteSavedItem: async (id:string) => del(`/savedItems/${id}`),
};
