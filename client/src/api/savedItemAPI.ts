import { SavedItem } from '../models/SavedItem';
import { APIResponse, APIResponseWithArray, EmptyResponse } from '../models/API';
import { get, post } from './api';

export const savedItemAPI = {
    getSavedItem: async (id: string) => await get(`/savedItems/${id}`),
    getAllSavedItems:   async () => await get('/savedItems'),
    createSavedItem: async (savedItem: SavedItem) => post('/savedItems', savedItem),
    updateSavedItem: async (id: string, savedItem: SavedItem) => {
        try {
            const response = await fetch(`/savedItems/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(savedItem),
            });
            const data: APIResponse<SavedItem> = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    deleteSavedItem: async (id:string) => {
        try {
            const response = await fetch(`/savedItems/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const data: EmptyResponse = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};
