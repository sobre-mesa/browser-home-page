import { Category } from '../models/Category';
import { APIResponse, APIResponseWithArray, EmptyResponse } from '../models/API';
import { get } from './api';


export const categoryAPI = {
    getCategory: async (id: string) => {
        return await get(`/categories/${id}`);
    },
    getAllCategories: async () => await get('/categories'),
    createCategory: async (category: Category) => {
        try {
            const response = await fetch('/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            });
            const data: APIResponse<Category> = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    updateCategory: async (id: string, category: Category) => {
        try {
            const response = await fetch(`/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            });
            const data: APIResponse<Category> = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    deleteCategory: async (id: string) => {
        try {
            const response = await fetch(`/categories/${id}`, {
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
