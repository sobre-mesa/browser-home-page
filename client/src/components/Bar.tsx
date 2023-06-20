import { SavedItem } from '../models/SavedItem';
import { BarItem } from './BarItem';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectModalOpen } from '../store/slices/dataSlice';
import { toggleModal, addSavedItem  } from '../store/slices/dataSlice';
import AddItemModal from './AddItemModal';
import {SystemCategory} from '../models/Store';

export const Bar = ({category} : {category: SystemCategory}) => {
    const modalOpen = useAppSelector(selectModalOpen);
    const dispatch = useAppDispatch();
    const handleModalOpen = () => {
        dispatch(toggleModal(category.name));
    };
    const handleClick = (item) => {
        dispatch(addSavedItem(item));
    };
    return (
        <div className="mac-dock">
            <ul className="dock-items">
                { category.items?.map((item: SavedItem) => (<BarItem key={item.id} item={item}/>)) }
            </ul>
            <IconButton aria-label="delete" onClick={handleModalOpen}>
                <AddCircleOutline />
            </IconButton>
            <AddItemModal 
                open={modalOpen[category.name]}
                setOpen={handleModalOpen}
                category={category.id}
                handleSubmit={handleClick}
            />
        </div>
    );
};