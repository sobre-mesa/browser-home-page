import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Category } from '../../models/Category';
import { Note } from '../../models/Note';
import { SavedItem } from '../../models/SavedItem';
import { savedItemAPI } from '../../api/savedItemAPI';
import { noteAPI } from '../../api/noteAPI';
import { categoryAPI } from '../../api/categoryAPI';
import type { StoreCategory, DataState, SystemCategory} from '../../models/Store';
import type { APIResponseWithArray } from '../../models/API';

const initialState: DataState = {
    status: 'idle', 
    categories: [],
    channels: {name: '', id: '', items: []},
    apps: {name: '', id: '', items: []},
    notes: [],
    modalsOpen: {
        note: false,
        category: false,
        savedItem: false,
    }
};

const reduceCategories = (categories: APIResponseWithArray<Category>, savedItems: APIResponseWithArray<SavedItem>) => {
    return categories?.payload
        .map((category: Category) => ({
            ...category,
            items: savedItems?.payload.filter((item: SavedItem) => item.category === category.id),
        }))
        .reduce(
            (result: any, category: any) => {
                if (category.name !== 'Apps' && category.name !== 'Channels') {
                    result.customCategories.push(category);
                } else {
                    // console.table(category.items);
                    result[category.name.toLowerCase()] =   {
                        id: category.id,
                        name: category.name.toLowerCase(),
                        items : category.items || []
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

export const addSavedItem = createAsyncThunk('data/AddSavedItem', async (savedItem: SavedItem) => {
    console.table(savedItem);
    const response = await savedItemAPI.createSavedItem(savedItem);

    return response;
});

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        toggleModal(state, action) {
            state.modalsOpen[action.payload] = !state.modalsOpen[action.payload];
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
                state.apps = action.payload.apps as SavedItem[] || state;
                state.channels = action.payload.channels as SavedItem[] || state;
            })
            .addCase(initData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

// export const { } = dataSlice.actions

export const { toggleModal } = dataSlice.actions;
export const selectModalOpen = (state: RootState) => state.data.modalsOpen;
export const selectData = (state: RootState) => state.data;
export default dataSlice.reducer;
