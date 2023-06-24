import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { SavedItem } from '../models/SavedItem';
import { useAppDispatch } from '../store/hooks';
import {  addSavedItem, updateSavedItem } from '../store/slices/dataSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
import { SystemCategory } from '../models/Store';

type BasicModalProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => any;
  category: SystemCategory;
  itemToEdit?: SavedItem;
};

export default function BasicModal({ open, setOpen, category, itemToEdit}: BasicModalProps) {
    const [description, setDescription] = useState(itemToEdit?.description || '');
    const [url, setUrl] = useState(itemToEdit?.url || '');
    const [image, setImage] = useState(itemToEdit?.image || '');

    useEffect(() => {
        setDescription(itemToEdit?.description || '');
        setUrl(itemToEdit?.url || '');
        setImage(itemToEdit?.image || '');
    }, [itemToEdit]);
    const dispatch = useAppDispatch();
    console.log(itemToEdit);
    const handleClose = () => setOpen(false);
   
    const payload = {category: category.name};
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const item: SavedItem = {
            description,
            url,
            image,
            category: category.id
        };
        const action =  itemToEdit ? 
            updateSavedItem({...payload, item, id: itemToEdit.id as string}) :
            addSavedItem({...payload, item});
        e.preventDefault();
        dispatch(action);
        handleClose();
    };
    const title = (itemToEdit ? 'Editing ' + itemToEdit.description + 'in ' : 'Add a new item to ') + 'category ' + category.name;
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
            Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
