import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SavedItem } from '../../models/SavedItem';
import { savedItemAPI } from '../../api/savedItemAPI';
import { categoryAPI } from '../../api/categoryAPI';
import type { StoreCategory, DataState } from '../../models/Store';
import type { APIResponseWithArray } from '../../models/API';
import type { Category } from '../../models/Category';

const initialState: DataState = {
    user: '',
    status: 'idle',
    categories: [],
    channels: { name: '', id: '', items: [] },
    apps: { name: '', id: '', items: [] },
    modalsOpen: {
        apps: false,
        channels: false,
        custom: false,
    }
};

const reduceCategories = (
    categories: APIResponseWithArray<Category>,
    savedItems: APIResponseWithArray<SavedItem>) => {
    return categories?.payload
        .map((category: Category) => ({
            ...category,
            items: savedItems?.payload.filter((item: SavedItem) => item.category === category.id),
        }))
        .reduce(
            (result: any, category) => {
                if (category.name !== 'Apps' && category.name !== 'Channels') {
                    result.customCategories.push(category);
                } else {
                    result[category.name.toLowerCase()] = {
                        id: category.id,
                        name: category.name.toLowerCase(),
                        items: category.items || []
                    };
                }
                return result;
            },
            { customCategories: [] }
        ) || {};
};

export const fetchUserData = createAsyncThunk('data/fetchUserData',
    async (payload: {userId: string}) => {
        const [categories, savedItems] = await Promise.all([
            categoryAPI.getCategoriesForUser(payload.userId),
            savedItemAPI.getItemsForUser(payload.userId),
        ]);

        const { apps, channels, customCategories } = reduceCategories(categories, savedItems);
        return {
            userId: payload.userId,
            categories: customCategories || [],
            apps: apps || [],
            channels: channels || [],
        };
    });

export const addSavedItem = createAsyncThunk('data/AddSavedItem',
    async (payload: { category: string, item: SavedItem }) => {
        console.log('ADDSAVEDITEM', payload);
        await savedItemAPI.createSavedItem(payload.item);
        return payload;
    });

export const updateSavedItem = createAsyncThunk('data/UpdateSavedItem',
    async (payload: { category: string, id: string, item: SavedItem }) => {
        await savedItemAPI.updateSavedItem(payload.id, payload.item);
        return payload;
    });

export const deleteSavedItem = createAsyncThunk('data/DeleteSavedItem',
    async (payload: { category: string, id: string }) => {
        await savedItemAPI.deleteSavedItem(payload.id);
        return payload;
    });

export const addCategory = createAsyncThunk('data/AddCategory',
    async (payload: { name: string, user: string }) => {
        console.log('ADDCATEGORY', payload);
        const response = await categoryAPI.createCategory(payload);
        return response.payload; 
    });

export const updateCategory = createAsyncThunk('data/UpdateCategory',
    async (payload: { id: string, name: string }) => {
        await categoryAPI.updateCategory(payload.id, { name: payload.name});
        return payload;
    });

export const deleteCategory = createAsyncThunk('data/DeleteCategory',
    async (payload: { id: string }) => {
        await categoryAPI.deleteCategory(payload.id);
        return payload;
    });
const isSystemCategory = (x: string) => x.toLowerCase() === 'apps' || x.toLowerCase() === 'channels';
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        toggleSystemCategorySettings(state, action) {
            const modalName: string = action.payload;
            state.modalsOpen[modalName] = !state.modalsOpen[modalName];
        }
    },
    extraReducers: (builder) => {
        builder
            //Init data
            .addCase(fetchUserData.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUserData.fulfilled, 
                (state, action) => {
                    state.user = action.payload.userId;
                    state.categories = action.payload.categories as StoreCategory[] || state;
                    state.apps = action.payload.apps;
                    state.channels = action.payload.channels;
                    state.status = 'idle';
                })
            .addCase(fetchUserData.rejected, (state) => { state.status = 'failed'; })

            //Add Item
            .addCase(addSavedItem.pending, (state) => { state.status = 'loading'; })
            .addCase(addSavedItem.fulfilled,
                (state, action) => {
                    const category = state.categories.find((category: StoreCategory) => category.name === action.payload.category);
                    const name: string = action.payload.category?.toLowerCase() || '';
                    if (isSystemCategory(name)) state[name].items.push(action.payload.item);
                    if (category) category.items.push(action.payload.item);
                    state.status = 'idle';
                })
            .addCase(addSavedItem.rejected, (state) => { state.status = 'failed'; })

            //Update Item
            .addCase(updateSavedItem.pending, (state) => { state.status = 'loading';})
            .addCase(updateSavedItem.fulfilled,
                (state, action) => {
                    const category = action.payload.category;
                    if (isSystemCategory(action.payload.category)) {
                        console.log('INNIT');
                        const categoryItems = state[action.payload.category].items;
                        const itemIndex = categoryItems.findIndex((item: SavedItem) => item.id === action.payload.id);
                        if (itemIndex !== -1) {
                            categoryItems[itemIndex] = action.payload.item;
                        }
                    } else if (category) {
                        const categoryItems = state.categories.find((c) => c.name === category)?.items;
                        if (categoryItems) {
                            const itemIndex = categoryItems.findIndex((item: SavedItem) => item.id === action.payload.id);
                            if (itemIndex !== -1) {
                                categoryItems[itemIndex] = action.payload.item;
                            }
                        }
                    }
                    state.status = 'idle';
                })
            .addCase(updateSavedItem.rejected, (state) => { state.status = 'failed';})

            //Delete Item
            .addCase(deleteSavedItem.pending, (state) => { state.status = 'loading';})
            .addCase(deleteSavedItem.fulfilled, 
                (state, action) => {
                    const category = action.payload.category;
                    const itemArray = isSystemCategory(category) ? state[category].items : state.categories.find((c) => c.name === category)?.items;
                    console.log('DELETE', itemArray, action.payload.id);
                    const itemIndex = itemArray.findIndex((item: SavedItem) => item.id === action.payload.id);
                    if (itemIndex >= 0) itemArray.splice(itemIndex, 1);
                    state.status = 'idle';

                })
            .addCase(deleteSavedItem.rejected, (state) => {state.status = 'failed';})

            //Add Category
            .addCase(addCategory.pending, (state) => {state.status = 'loading';})
            .addCase(addCategory.fulfilled,
                (state, action) => {
                    state.categories.push(action.payload);
                    state.status = 'idle';
                }).addCase(addCategory.rejected, (state) => {state.status = 'failed'; })

            //Delete Category
            .addCase(deleteCategory.pending, (state) => {state.status = 'loading'; })
            .addCase(deleteCategory.fulfilled,
                (state, action) => {
                    const categoryIndex = state.categories.findIndex((category: StoreCategory) => category.id === action.payload.id);
                    if (categoryIndex >= 0) state.categories.splice(categoryIndex, 1);
                    state.status = 'idle';
                })
            .addCase(deleteCategory.rejected, (state) => {state.status = 'failed'; })

            //Update Category
            .addCase(updateCategory.pending, (state) => {state.status = 'loading'; })
            .addCase(updateCategory.fulfilled, 
                (state, action) => {
                    const categoryIndex = state.categories.findIndex((category: StoreCategory) => category.id === action.payload.id);
                    if (categoryIndex >= 0) state.categories[categoryIndex].name = action.payload.name;
                    state.status = 'idle';
                })
            .addCase(updateCategory.rejected, (state) => { state.status = 'failed'; });
    },
});

export const { toggleSystemCategorySettings } = dataSlice.actions;
export const selectModalOpen = (state: RootState) => state.data.modalsOpen;
export const selectData = (state: RootState) => state.data;
export const selectUser = (state: RootState) => state.data.user;
export default dataSlice.reducer;
