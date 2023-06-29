import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Note } from '../../models/Note';
import { SavedItem } from '../../models/SavedItem';
import { savedItemAPI } from '../../api/savedItemAPI';
import { noteAPI } from '../../api/noteAPI';
import { categoryAPI } from '../../api/categoryAPI';
import type { StoreCategory, DataState } from '../../models/Store';
import type { APIResponseWithArray } from '../../models/API';
import type { Category } from '../../models/Category';

const initialState: DataState = {
    status: 'idle',
    categories: [],
    channels: { name: '', id: '', items: [] },
    apps: { name: '', id: '', items: [] },
    notes: [],
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

export const initData = createAsyncThunk('data/InitData', async () => {
    const [notes, categories, savedItems] = await Promise.all([
        noteAPI.getAllNotes(),
        categoryAPI.getAllCategories(),
        savedItemAPI.getAllSavedItems(),
    ]);

    const { apps, channels, customCategories } = reduceCategories(categories, savedItems);
    return {
        notes: notes?.payload || [],
        categories: customCategories || [],
        apps: apps || [],
        channels: channels || [],
    };
});

export const addSavedItem = createAsyncThunk('data/AddSavedItem',
    async (payload: { category: string, item: SavedItem }) => {
        const response = await savedItemAPI.createSavedItem(payload.item);
        return payload;
    });

export const updateSavedItem = createAsyncThunk('data/UpdateSavedItem',
    async (payload: { category: string, id: string, item: SavedItem }) => {
        const response = await savedItemAPI.updateSavedItem(payload.id, payload.item);
        return payload;
    });

export const deleteSavedItem = createAsyncThunk('data/DeleteSavedItem',
    async (payload: { category: string, id: string }) => {
        const response = await savedItemAPI.deleteSavedItem(payload.id);
        return payload;
    });

export const addCategory = createAsyncThunk('data/AddCategory',
    async (payload: { name: string }) => {
        const category = { name: payload.name };
        const response = await categoryAPI.createCategory(category);
        return response.payload; 
    });

export const updateCategory = createAsyncThunk('data/UpdateCategory',
    async (payload: { id: string, name: string }) => {
        const response = await categoryAPI.updateCategory(payload.id, payload.category);
        return payload;
    });

export const deleteCategory = createAsyncThunk('data/DeleteCategory',
    async (payload: { id: string }) => {
        console.log('PAYLOAD:', payload);
        const response = await categoryAPI.deleteCategory(payload.id);
        return payload;
    });

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
            .addCase(initData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action.payload.categories as StoreCategory[] || state;
                state.notes = action.payload.notes as Note[] || state;
                state.apps = action.payload.apps;
                state.channels = action.payload.channels;
            })
            .addCase(initData.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addSavedItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addSavedItem.fulfilled, (state, action) => {
                state.status = 'idle';
                const category = state.categories.find((category: StoreCategory) => category.name === action.payload.category);
                const name: string = action.payload.category?.toLowerCase() || '';
                if (name === 'apps' || name === 'channels') {
                    state[name].items.push(action.payload.item);
                }
                if (category) {
                    category.items.push(action.payload.item);
                }
            })
            .addCase(addSavedItem.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateSavedItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSavedItem.fulfilled, (state, action) => {
                state.status = 'idle';
                const category = action.payload.category;
                if (action.payload.category === 'apps' || action.payload.category === 'channels') {
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
            })
            .addCase(updateSavedItem.rejected, (state) => {
                state.status = 'failed';
            }).addCase(deleteSavedItem.pending, (state) => {
                state.status = 'loading';
            }
            ).addCase(deleteSavedItem.fulfilled, (state, action) => {
                state.status = 'idle';
                const category = action.payload.category;
                if (category === 'apps' || category === 'channels') {
                    const itemIndex = state[category].items.findIndex((item: SavedItem) => item.id === action.payload.id);

                    if (itemIndex > 0) {
                        state[category].items.splice(itemIndex, 1);
                    }

                }
                else if (category) {
                    const itemIndex = state[category].items.findIndex((item: SavedItem) => item.id === action.payload.id);
                    if (itemIndex > 0) {
                        state[category].items.splice(itemIndex, 1);
                    }
                }
            }).addCase(deleteSavedItem.rejected, (state) => {
                state.status = 'failed';
            }).addCase(addCategory.pending, (state) => {
                state.status = 'loading';
                console.log('Started');
            }).addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('Fulfilled');
                console.log(action.payload);
                state.categories.push(action.payload);
            }).addCase(addCategory.rejected, (state) => {
                state.status = 'failed';
            }
            )
            .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
            }
            ).addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                const categoryIndex = state.categories.findIndex((category: StoreCategory) => category.id === action.payload.id);
                if (categoryIndex > 0) {
                    state.categories.splice(categoryIndex, 1);
                }
            }).addCase(deleteCategory.rejected, (state) => {
                state.status = 'failed';
            }
            )
        ;


    },
});

export const { toggleSystemCategorySettings } = dataSlice.actions;
export const selectModalOpen = (state: RootState) => state.data.modalsOpen;
export const selectData = (state: RootState) => state.data;
export default dataSlice.reducer;
