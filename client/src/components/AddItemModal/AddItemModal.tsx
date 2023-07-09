import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, IconButton, Avatar } from '@mui/material';
import { SavedItem } from '../../models/SavedItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSavedItem, updateSavedItem, selectUser } from '../../store/slices/dataSlice';
import { SystemCategory, StoreCategory } from '../../models/Store';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import './AddItemModal.css';

type AddOrEditItemModalProps = {
  open: boolean;
  handleClose: () => any;
  category: SystemCategory | StoreCategory;
  itemToEdit?: SavedItem | null;
};

const ImageNotFound = () => {
    return (
        <Typography variant="body2" sx={{ color: 'white', marginBottom: '10px' }}>
        Image not found
        </Typography>
    ); 
};

function AddOrEditItemModal({open, handleClose, category, itemToEdit}: AddOrEditItemModalProps) {
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [imageError, setImageError] = useState(false);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (itemToEdit) {
            const { description, url, image } = itemToEdit;
            setDescription(description);
            setUrl(url);
            setImage(image);
            setImageError(false);
        }
    }, [itemToEdit]);

    const dispatch = useAppDispatch();

    const payload = { category: category.name };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const item: SavedItem = {
            description,
            url,
            image,
            category: category.id,
            user,
        };

        const action = itemToEdit
            ? updateSavedItem({ ...payload, item, id: itemToEdit.id as string })
            : addSavedItem({ ...payload, item });

        dispatch(action);
        handleClose();
    };

    const handleImageLoadError = () => {
        setImageError(true);
    };

    const handleImagePaste = (event: React.ClipboardEvent | undefined) => {
        const clipboardData = event?.clipboardData;
        if (clipboardData) {
            const pastedImage = clipboardData.items[0];
            if (pastedImage.type.indexOf('image') === 0) {
                const imageURL = URL.createObjectURL(pastedImage.getAsFile() as Blob);
                setImage(imageURL);
                setImageError(false);
            }
        }
    };

    const isEditing = Boolean(itemToEdit);
    const title = `${isEditing ? 'Editing' : 'Add a new item to'} category ${category.name}`;

    return (
        <Modal
            className="modal"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
            open={open}>
            <Box className="addItemModal">
                <Typography id="modal-modal-title" variant="h6" component="h6" className="addItemModalTitle">
                    {title}
                </Typography>
                {
                    (image && !imageError) ? (
                        <Avatar
                            alt="Preview"
                            onError={handleImageLoadError}
                            src={image}
                            sx={{
                                width: 100,
                                height: 100,
                                marginBottom: '10px',
                            }}
                        />
                    ) : imageError && <ImageNotFound />
                }
                <form onSubmit={onSubmit}>
                    {['Description', 'URL', 'Image'].map((field) => (
                        <TextField
                            fullWidth
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
                            key={field}
                            margin="normal"
                            label={field}
                            onChange={(e) => {
                                if (field === 'Description') setDescription(e.target.value.slice(0, 40));
                                else if (field === 'URL') setUrl(e.target.value.slice(0, 40));
                                else {
                                    setImage(e.target.value);
                                    setImageError(false);
                                }
                            }}
                            onPaste={field === 'Image' ? handleImagePaste : undefined}
                            value={field === 'Description' ? description.slice(0, 40) : field === 'URL' ? url.slice(0, 40) : image}
                            variant="standard"
                            required // Mark the field as required
                            inputProps={{ maxLength: 40 }} // Restrict the input to a maximum of 40 characters
                        />
                    ))}
                    <div className="submitButtonContainer">
                        <IconButton type="submit" color="error" aria-label="AddOrEdit">
                            {isEditing ? <EditIcon /> : <AddCircleOutlineIcon />}
                        </IconButton>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default AddOrEditItemModal;