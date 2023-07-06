import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, IconButton, Avatar } from '@mui/material';
import { SavedItem } from '../../models/SavedItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSavedItem, updateSavedItem, selectUser } from '../../store/slices/dataSlice';
import { SystemCategory } from '../../models/Store';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '78%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const titleStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '10px',
    marginBottom: '10px',
};

type AddOrEditItemModalProps = {
  open: boolean;
  handleClose: () => any;
  category: SystemCategory;
  itemToEdit?: SavedItem | null;
};


export default function AddOrEditItemModal({
    open,
    handleClose,
    category,
    itemToEdit,
}: AddOrEditItemModalProps) {
    const [description, setDescription] = useState(itemToEdit?.description || '');
    const [url, setUrl] = useState(itemToEdit?.url || '');
    const [image, setImage] = useState(itemToEdit?.image || '');
    const [imageError, setImageError] = useState(false);
    const user = useAppSelector(selectUser);
    useEffect(() => {
        setDescription(itemToEdit?.description || '');
        setUrl(itemToEdit?.url || '');
        setImage(itemToEdit?.image || '');
        setImageError(false);
    }, [itemToEdit]);

    const dispatch = useAppDispatch();

    const payload = { category: category.name };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const item: SavedItem = {
            description,
            url,
            image,
            category: category.id,
            user
        };
        console.log(item);
        const action = itemToEdit
            ? updateSavedItem({ ...payload, item, id: itemToEdit.id as string })
            : addSavedItem({ ...payload, item });
        e.preventDefault();
        dispatch(action);
        handleClose();
    };

    const handleImageLoadError = () => {
        setImageError(true);
    };

    const handleImagePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const clipboardData = event.clipboardData;
        if (clipboardData) {
            const pastedImage = clipboardData.items[0];
            if (pastedImage.type.indexOf('image') === 0) {
                const imageURL = URL.createObjectURL(pastedImage.getAsFile() as Blob);
                setImage(imageURL);
                setImageError(false);
            }
        }
    };

    const isEditing = itemToEdit !== null;
    const title =
    (isEditing ? 'Editing ' + itemToEdit?.description + ' in ' : 'Add a new item to ') +
    'category ' +
    category.name;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={titleStyle}>
                    {title}
                </Typography>
                {image && !imageError ? (
                    <Avatar
                        src={image}
                        alt="Preview"
                        sx={{
                            width: 100,
                            height: 100,
                            marginBottom: '10px',
                            backgroundColor: 'transparent',
                        }}
                        onError={handleImageLoadError}
                    />
                ) : (
                    imageError && (
                        <Typography variant="body2" sx={{ color: 'white', marginBottom: '10px' }}>
                Image not found
                        </Typography>
                    )
                )}
                <form onSubmit={onSubmit}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="standard"
                        InputProps={{
                            style: {
                                color: 'white',
                                borderBottomColor: 'white',
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="standard"
                        InputProps={{
                            style: {
                                color: 'white',
                                borderBottomColor: 'white',
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        label="Image"
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value);
                            setImageError(false);
                        }}
                        fullWidth
                        margin="normal"
                        variant="standard"
                        InputProps={{
                            style: {
                                color: 'white',
                                borderBottomColor: 'white',
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        onPaste={handleImagePaste}
                    />
                    <div style={{ display: 'flex' }}>
                        <IconButton style={{ marginLeft: 'auto' }} type="submit" color="error" aria-label="AddOrEdit">
                            {isEditing ? <EditIcon fontSize="large" /> : <AddCircleOutlineIcon fontSize="large" />}
                        </IconButton>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}
