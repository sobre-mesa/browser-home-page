import { SavedItem } from '../models/SavedItem';
import { get, post, put, del } from './api';

const getFormData = (body) => {
    const formData = new URLSearchParams();
    formData.append('url', body.url);
    formData.append('description', body.description);
    formData.append('category', body.category);
    formData.append('image', body.image);
    return formData;
};

export const savedItemAPI = {
    getSavedItem: async (id: string) => await get(`/savedItems/${id}`),
    getAllSavedItems:   async () => await get('/savedItems'),
    createSavedItem: async (savedItem: SavedItem) => post('/savedItems', getFormData(savedItem)),
    updateSavedItem: async (id: string, savedItem: SavedItem) => put(`/savedItems/${id}`, getFormData(savedItem)),
    deleteSavedItem: async (id:string) => del(`/savedItems/${id}`),
};
