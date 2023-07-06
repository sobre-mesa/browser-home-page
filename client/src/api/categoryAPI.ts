import { Category } from '../models/Category';
import { get, post, put, del } from './api';

const getFormData = (body) => {
    const formData = new URLSearchParams();
    formData.append('name', body.name);
    return formData;
};

export const categoryAPI = {
    getCategoriesForUser: async (user: string) => await get(`/categories/user/${user}`),
    getCategory: async (id: string) => await get(`/categories/${id}`),
    getAllCategories: async () => await get('/categories'),
    createCategory: async (category: Category) => await post('/categories', getFormData(category)),
    updateCategory: async (id: string, category: Category) => await put(`/categories/${id}`, getFormData(category)),
    deleteCategory: async (id: string) => await del(`/categories/${id}`),
};

