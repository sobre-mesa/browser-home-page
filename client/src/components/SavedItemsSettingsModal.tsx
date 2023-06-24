import React, { useState }  from 'react';
import { SystemCategory } from '../models/Store';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectModalOpen, toggleModal } from '../store/slices/dataSlice';

import { Modal, Paper, IconButton } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

import { SavedItemsSettingsItem } from './SavedItemsSettingsItem';
import AddItemModal from './AddItemModal';

export const SavedItemsSettingsModal = ( { category } : {category: SystemCategory}) => {
    const modalOpen = useAppSelector(selectModalOpen) as Record<string, boolean>;
    const dispatch = useAppDispatch();
    const handleModalOpen = () => {
        dispatch(toggleModal('savedItem'));
    };

    const [itemToEdit, setItemToEdit]= useState(null);
    return (
        <>
            <Modal open={true}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        backdropFilter: 'blur(5px)',
                        backgroundColor: 'rgba(0,0,30,0.2)',
                    }}
                >
                    <Paper
                        style={{
                            backgroundColor: '#93B5C6',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            paddingBottom: '36px',
                            paddingTop: '0px',
                        }}
                    >
                        <IconButton aria-label="delete" onClick={handleModalOpen} >
                            <AddCircleOutline />
                        </IconButton>
                        <AddItemModal
                            open={modalOpen['savedItem']}
                            setOpen={handleModalOpen}
                            category={category}
                            itemToEdit={itemToEdit}
                        />
                        <Paper
                            elevation={1}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gridTemplateRows: 'repeat(4, 1fr)',

                                height: 'calc(4 * 100px)', // Adjust the row limit as per your item's height
                                overflowY: 'auto',
                                backgroundColor: 'white',
                            }}
                        >
                            {category.items.map((item) => (
                                <SavedItemsSettingsItem
                                    key={item.id}
                                    item={item}
                                    onEdit={setItemToEdit}
                                />
                            ))}
                        </Paper>
                    </Paper>
                </div>
            </Modal>
        </>
    );
};
