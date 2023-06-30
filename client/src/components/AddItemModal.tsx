import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, IconButton, Avatar } from '@mui/material';
import { TextField } from '@mui/material';
import { SavedItem } from '../models/SavedItem';
import { useAppDispatch } from '../store/hooks';
import { addSavedItem, updateSavedItem } from '../store/slices/dataSlice';
import { StoreCategory, SystemCategory } from '../models/Store';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import './AddItemModal.css';

type AddOrEditItemModalProps = {
  open: boolean;
  handleClose: () => any;
  category: SystemCategory | StoreCategory;
  itemToEdit?: SavedItem | null;
};

type CustomTextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, value, onChange }) => (
    <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        margin="normal"
        variant="standard"
        InputProps={{
            className: 'inputField',
        }}
        InputLabelProps={{
            className: 'inputLabel',
        }}
    />
);

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
        };
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
            <Box className="modalContainer">
                <Typography id="modal-modal-title" variant="h6" component="h2" className="title">
                    {title}
                </Typography>
                {image && !imageError ? (
                    <Avatar
                        src={image}
                        alt="Preview"
                        className="imagePreview"
                        onError={handleImageLoadError}
                    />
                ) : (
                    imageError && (
                        <Typography variant="body2" className="imageErrorText">
              Image not found
                        </Typography>
                    )
                )}
                <form onSubmit={onSubmit}>
                    <CustomTextField label="Description" value={description} onChange={setDescription} />
                    <CustomTextField label="URL" value={url} onChange={setUrl} />
                    <CustomTextField label="Image" value={image} onChange={setImage} onPaste={handleImagePaste} />
                    <div style={{ display: 'flex' }}>
                        <IconButton className="submitButton" type="submit" color="error" aria-label="AddOrEdit">
                            {isEditing ? <EditIcon fontSize="large" /> : <AddCircleOutlineIcon fontSize="large" />}
                        </IconButton>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}
