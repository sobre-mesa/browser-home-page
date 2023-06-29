import { Category } from '../models/Category';
import { get, post, put, del } from './api';

export const categoryAPI = {
    getCategory: async (id: string) => await get(`/categories/${id}`),
    getAllCategories: async () => await get('/categories'),
    createCategory: async (category: Category) => await post('/categories', category),
    updateCategory: async (id: string, category: Category) => await put(`/categories/${id}`, category),
    deleteCategory: async (id: string) => await del(`/categories/${id}`),
};
