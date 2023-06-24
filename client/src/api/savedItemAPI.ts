import { SavedItem } from '../models/SavedItem';
import {EmptyResponse } from '../models/API';
import { get, post, put } from './api';

export const savedItemAPI = {
    getSavedItem: async (id: string) => await get(`/savedItems/${id}`),
    getAllSavedItems:   async () => await get('/savedItems'),
    createSavedItem: async (savedItem: SavedItem) => post('/savedItems', savedItem),
    updateSavedItem: async (id: string, savedItem: SavedItem) => put(`/savedItems/${id}`, savedItem),
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
