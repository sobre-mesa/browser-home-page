import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Category } from '../../models/Category';
import { Note } from '../../models/Note';
import { SavedItem } from '../../models/SavedItem';
import { savedItemAPI } from '../../api/savedItemAPI';
import { noteAPI } from '../../api/noteAPI';
import { categoryAPI } from '../../api/categoryAPI';
import { APIResponseWithArray } from '../../models/API';

type StoreCategory = Category & { items: SavedItem[] };
type DataState ={
  status: 'idle' | 'loading' | 'failed',
  categories: StoreCategory[],
  notes: Note[], 
  modalsOpen: {
    note: boolean,
    category: boolean,
    savedItem: boolean,
  }
}

const initialState: DataState = {
    status: 'idle', 
    categories: [],
    notes: [],
    modalsOpen: {
        note: false,
        category: false,
        savedItem: false,
    }
};

export const initData = createAsyncThunk(
    'data/InitData',
    async () => {
        const notes: APIResponseWithArray<Note> | undefined = await noteAPI.getAllNotes();
        const categories: APIResponseWithArray<Category> | undefined = await categoryAPI.getAllCategories();
        const savedItems: APIResponseWithArray<SavedItem> | undefined = await savedItemAPI.getAllSavedItems();
        console.table(notes?.payload);
        console.table(categories?.payload);
        console.table(savedItems?.payload);
        // const storeCategories = categories?.payload.map((category: Category) => {
        //     return {
        //         ...category,
        //         items: savedItems?.payload.filter((item: SavedItem) => item.category === category.id),
        //     };
        // });
        return { notes: [], categories: [] };
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
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
            })
            .addCase(initData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

// export const { } = dataSlice.actions

export const selectData = (state: RootState) => state.data;
export default dataSlice.reducer;
