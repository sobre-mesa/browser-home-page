import { SavedItem } from '../models/SavedItem';
import { get, post, put, del } from './api';

type Payload =  SavedItem | (SavedItem & { user: 'string'});
const getFormData = (body :Payload) => {
    const formData = new URLSearchParams();
    formData.append('url', body.url);
    formData.append('description', body.description);
    formData.append('category', body.category || '');
    formData.append('image', body.image);
    if(body.user){
        formData.append('user', body.user);
    }
    return formData;
};

export const savedItemAPI = {
    getItemsForUser: async (user: string) => await get(`/savedItems/user/${user}`),
    getSavedItem: async (id: string) => await get(`/savedItems/${id}`),
    createSavedItem: async (savedItem: Payload) => post('/savedItems', getFormData(savedItem)),
    updateSavedItem: async (id: string, savedItem: Payload) => put(`/savedItems/${id}`, getFormData(savedItem)),
    deleteSavedItem: async (id:string) => del(`/savedItems/${id}`),
};
