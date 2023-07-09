import React, { useState } from 'react';
import { Popover, TextField, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCategory, updateCategory, selectUser } from '../../store/slices/dataSlice';
import './AddCategoryPopover.css';

type AddCategoryPopOverProps = {categoryToEdit: any, anchorEl: any, setAnchorEl: any}
const AddCategoryPopOver = ({categoryToEdit, anchorEl, setAnchorEl} : AddCategoryPopOverProps) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
   
    const isEditing = categoryToEdit !== null;
    const [inputValue, setInputValue] = useState(isEditing ? categoryToEdit.name : '');
    const label = isEditing? 'Edit category: ' + categoryToEdit.name : 'Add category';

    const handleSubmit = () => {
        const payload = { name: inputValue, user };
        const action = isEditing ? updateCategory({...payload, id: categoryToEdit?.id}) : addCategory(payload);
        dispatch(action);
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
        setInputValue('');
    };
    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={!!anchorEl}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className="popover">
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
                        label={label}
                        onChange={(e) => setInputValue(e.target.value)}
                        margin="normal"
                        placeholder="Category name"
                        value={inputValue}
                        variant="standard"
                        required
                    />
                    <IconButton 
                        aria-label="AddOrEdit"
                        color="error"
                        onClick={handleSubmit}
                        sx={{ marginLeft: 'auto' }}
                        type="submit">
                        { !isEditing ? 
                            <AddCircleOutlineIcon fontSize="large"  sx={{widtH: 20, height: 20}}/> 
                            : <EditIcon fontSize="large" sx={{widtH: 20, height: 20}}/>}
                    </IconButton>
                </div>
            </Popover>
        </>
    );
};

export default AddCategoryPopOver;
