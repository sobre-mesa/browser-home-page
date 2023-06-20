import { SavedItem } from '../models/SavedItem';
import { BarItem } from './BarItem';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectModalsOpenCategory, selectModalsOpenNote, selectData } from '../store/slices/dataSlice';
// import { toggleModal  } from '../store/slices/dataSlice';
export const Bar = (
    {category} : 
    {category: { 
        name: string,
        items : SavedItem[] 
        }
    }
) => {
    console.table(category.items);
    return (
        <div className="mac-dock">
            <ul className="dock-items">
                { category.items?.map((item: SavedItem) => (<BarItem key={item.id} item={item}/>)) }
            </ul>
            <IconButton aria-label="delete">
                <AddCircleOutline />
            </IconButton>
        </div>
    );
};