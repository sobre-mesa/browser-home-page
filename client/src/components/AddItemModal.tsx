import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { SavedItem } from '../models/SavedItem';
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
import { useDispatch } from 'react-redux';

type BasicModalProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => any;
  category: string;
  handleSubmit: (item: SavedItem) => any;
};

export default function BasicModal({ open, setOpen, category, handleSubmit }: BasicModalProps) {
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const item: SavedItem = {
            description,
            url,
            image,
            category
        };
        dispatch(handleSubmit(item));
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a new item to category
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
