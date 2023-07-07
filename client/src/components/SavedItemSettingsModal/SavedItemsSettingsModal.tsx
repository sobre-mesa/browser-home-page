import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Paper, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { SystemCategory, StoreCategory } from '../../models/Store';
import SavedItemsSettingsItem from '../SavedItemSettingsItem/SavedItemsSettingsItem';
import AddItemModal from '../AddItemModal/AddItemModal';
import { toggleSystemCategorySettings } from '../../store/slices/dataSlice';

import './SavedItemSettingsModal.css';

export const SavedItemsSettingsModal = ({ category }: { category: SystemCategory | StoreCategory}) => {
    const [itemToEdit, setItemToEdit] = useState(null);
    const [items, setItems] = useState(category.items);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const categoryName = category.name ===  'apps' || category.name === 'channels' ? category.name : 'custom';

    const handleCloseModal = () => setModalOpen(false);
    const handleOpenEditModal = () => setModalOpen(true);
    const handleCloseSelf = () => dispatch(toggleSystemCategorySettings(categoryName));

    const handleOpenAddModal = () => {
        setItemToEdit(null);
        setModalOpen(true);
    };  
        
    const closeButtonSx = { position: 'absolute', top: '10px', right: '10px', zIndex: 1 };
    const closeIconSX = { width: 15, height: 15, marginRight: '-10px', marginTop: '-15px', color: 'rgba(255, 255, 255, 0.3)' };
    const addIconSX = { width: 20, height: 20, color: 'rgba(255, 255, 255, 0.3)', paddingBottom: '6px' };
    const paperstyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: categoryName === 'apps' ? 'rgba(0, 0, 0, 0.503)' : 'rgba(164, 30, 30, 0.7)',
    };

    useEffect(() => {
        setItems(category.items);
    }, [category]);

    const CloseButton = () => (
        <IconButton
            sx={closeButtonSx}
            aria-label="close"
            onClick={handleCloseSelf}
        >
            <CloseIcon sx={closeIconSX}/>
        </IconButton>
    );

    const AddItemButton = ()    => (
        <div>
            <IconButton aria-label="add" onClick={handleOpenAddModal}>
                <AddCircleOutlineIcon sx={addIconSX} />
            </IconButton>
        </div>
    );

    return (
        <Paper sx={paperstyle}>
            <span className="saved-items-modal-title"> {category.name.toUpperCase()}</span>
            <CloseButton />
            <AddItemButton />
            <AddItemModal
                open={modalOpen}
                handleClose={handleCloseModal}
                category={category}
                itemToEdit={itemToEdit}
            />
            <div className="saved-items-modal-grid">
                {items?.length > 0 ?
                    items.map((item) => (
                        <SavedItemsSettingsItem
                            category={category.name}
                            key={item.id}
                            item={item}
                            onEdit={setItemToEdit}
                            handleOpen={handleOpenEditModal} 
                        />
                    )) :
                    <div className='saved-items-modal-empty'>
                        <span className="saved-items-modal-empty-text">No items saved</span>
                    </div>
                }
            </div>
        </Paper>
    );
};
