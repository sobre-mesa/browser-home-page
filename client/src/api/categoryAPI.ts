import { Category } from '../models/Category';
import { get, post, put, del } from './api';

type Payload =  Category | ( Category & {user: 'string'} );
const getFormData = (body: Payload) => {
    const formData = new URLSearchParams();
    formData.append('name', body.name);
    if(body.user){
        formData.append('user', body.user);
    }
    return formData;
};

export const categoryAPI = {
    getCategoriesForUser: async (user: string) => await get(`/categories/user/${user}`),
    getCategory: async (id: string) => await get(`/categories/${id}`),
    getAllCategories: async () => await get('/categories'),
    createCategory: async (category: Payload) => await post('/categories', getFormData(category)),
    updateCategory: async (id: string, category: Payload) => await put(`/categories/${id}`, getFormData(category)),
    deleteCategory: async (id: string) => await del(`/categories/${id}`),
};

