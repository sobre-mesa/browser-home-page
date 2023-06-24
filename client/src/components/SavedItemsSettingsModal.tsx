import React, { useEffect, useState }  from 'react';
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

    const [items, setItems] = useState(category.items);
    useEffect(() => {
        setItems(category.items);
    }, [category]);

    const [itemToEdit, setItemToEdit] = useState(null);
    return (
        <>
            <Modal className="saved-item-settings-modal" open={true} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backdropFilter: 'blur(5px)',
            }}>
                <Paper>
                    <IconButton style={{marginLeft: '39%'}}aria-label="add" onClick={handleModalOpen} >
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
                            />
                        ))}
                    </Paper>
                </Paper>
            </Modal>
        </>
    );
};
