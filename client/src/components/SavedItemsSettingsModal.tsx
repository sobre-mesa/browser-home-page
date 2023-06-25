import React, { useEffect, useState } from 'react';
import { SystemCategory } from '../models/Store';

import { Modal, Paper, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { SavedItemsSettingsItem } from './SavedItemsSettingsItem';
import AddItemModal from './AddItemModal';
import {toggleSystemCategorySettings, selectModalOpen} from '../store/slices/dataSlice';
import {useDispatch, useSelector} from 'react-redux';

export const SavedItemsSettingsModal = ({ category }: { category: SystemCategory }) => {
    const [itemToEdit, setItemToEdit] = useState(null);
    const [items, setItems] = useState(category.items);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const modalsOpen = useSelector(selectModalOpen);
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

    const handleCloseSelf = () => {
        dispatch(toggleSystemCategorySettings(category.name));
    };

    useEffect(() => {
        setItems(category.items);
    }, [category]);

    return (
        <>
            <Modal
                className="saved-item-settings-modal"
                open={modalsOpen.editSystemCategory[category.name]}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    backdropFilter: 'blur(5px)',
                }}
            >
                <Paper style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
                        aria-label="close"
                        onClick={handleCloseSelf }
                    >
                        <CloseIcon />
                    </IconButton>
                    <div style={{ marginTop: '20px' }}>
                        <IconButton aria-label="add" onClick={handleOpenAddModal}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                    <AddItemModal
                        open={modalOpen}
                        handleClose={handleCloseModal}
                        category={category}
                        itemToEdit={itemToEdit}
                    />
                    <Paper
                        elevation={1}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gridTemplateRows: 'repeat(4, 1fr)',
                            padding: '10px',
                            height: 'calc(4 * 121px)', // Adjust the row limit as per your item's height
                            overflowY: 'auto',
                            backgroundColor: 'white',
                        }}
                    >
                        {items.map((item) => (
                            <SavedItemsSettingsItem
                                category={category.name}
                                key={item.id}
                                item={item}
                                onEdit={setItemToEdit}
                                handleOpen={handleOpenEditModal}
                            />
                        ))}
                    </Paper>
                </Paper>
            </Modal>
        </>
    );
};
