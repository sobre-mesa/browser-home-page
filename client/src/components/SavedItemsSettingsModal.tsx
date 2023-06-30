import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Paper, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { SystemCategory, StoreCategory } from '../models/Store';
import { SavedItemsSettingsItem } from './SavedItemsSettingsItem';
import AddItemModal from './AddItemModal';
import { toggleSystemCategorySettings } from '../store/slices/dataSlice';


export const SavedItemsSettingsModal = ({ category }: { category: SystemCategory | StoreCategory}) => {
    const [itemToEdit, setItemToEdit] = useState(null);
    const [items, setItems] = useState(category.items);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleOpenEditModal = () => {
        setModalOpen(true);
    };
    const handleOpenAddModal = () => {
        setItemToEdit(null);
        setModalOpen(true);
    };
    const categoryName = category.name ===  'apps' || category.name === 'channels' ? category.name : 'custom';
    const handleCloseSelf = () => {
        dispatch(toggleSystemCategorySettings(categoryName));
    };
  
    useEffect(() => {
        setItems(category.items);
    }, [category]);
    
    const closeButtonSx = { position: 'absolute', top: '10px', right: '10px', zIndex: 1 };
    const closeIconSX = { width: 15, height: 15, marginRight: '-10px', marginTop: '-15px', color: 'rgba(255, 255, 255, 0.3)' };
    const addIconSX = { width: 20, height: 20, color: 'rgba(255, 255, 255, 0.3)', paddingBottom: '6px' };
    const titleStyle = {
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20px',
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 6,
        fontFamily: 'Cutive Mono'
    };
    const paperstyle = {
        outer: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: categoryName === 'apps' ? 'rgba(0, 0, 0, 0.503)' : 'rgba(164, 30, 30, 0.7)',
        },
        inner: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
            padding: '10px',
            height: 'calc(4 * 121px)', // Adjust the row limit as per your item's height
            overflowY: 'auto',
            backgroundColor: 'white',
        }
    };

    const noItemsStyle = {
        outer: {width: 270, display: 'flex', justifyContent: 'center', alignItems: 'center', gridColumn: '1 / -1', gridRow: '1 / -1'},
        inner: {color: 'rgba(0, 0, 0, 0.3)', fontSize: '16px'}
    };

    return (
        <Paper sx={paperstyle.outer}>
            <span style={titleStyle}> {category.name.toUpperCase()}</span>
            <IconButton
                sx={closeButtonSx}
                aria-label="close"
                onClick={handleCloseSelf}
            >
                <CloseIcon sx={closeIconSX}/>
            </IconButton>
            <div>
                <IconButton aria-label="add" onClick={handleOpenAddModal}>
                    <AddCircleOutlineIcon sx={addIconSX} />
                </IconButton>
            </div>
            <AddItemModal
                open={modalOpen}
                handleClose={handleCloseModal}
                category={category}
                itemToEdit={itemToEdit}
            />
            <Paper elevation={1} sx={paperstyle.inner}>
                {items?.length > 0 ? items.map((item) => (
                    <SavedItemsSettingsItem
                        category={category.name}
                        key={item.id}
                        item={item}
                        onEdit={setItemToEdit}
                        handleOpen={handleOpenEditModal} 
                    />
                )) : 
                    <div style={noItemsStyle.outer}>
                        <div style={noItemsStyle.inner}>No items saved</div>
                    </div>
                }
            </Paper>
        </Paper>
    );
};
