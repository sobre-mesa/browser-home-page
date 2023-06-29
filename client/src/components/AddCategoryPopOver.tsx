import React, { useState } from 'react';
import { Popover, TextField, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppDispatch } from '../store/hooks';
import { addCategory, updateCategory } from '../store/slices/dataSlice';
const AddCategoryPopOver = (
    {categoryToEdit, anchorEl, setAnchorEl} 
    : {categoryToEdit: any, anchorEl: any, setAnchorEl: any}
) => {
   
    const [inputValue, setInputValue] = useState('');
    const open = Boolean(anchorEl);
    const isEditing = categoryToEdit !== null;
    const label = isEditing? 'Edit category' : 'Add category';
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        const payload = { name: inputValue };
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
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div style={{ 
                    paddingLeft: '10px',
                    backgroundColor:'black',
                    borderRadius: 3,
                    display: 'flex',
                    height: '66px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 12,
                }}>
                    <TextField
                        label={label}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="standard"
                        placeholder="Category name"
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
                    <IconButton style={{ marginLeft: 'auto' }} type="submit" color="error" aria-label="AddOrEdit" onClick={handleSubmit}>
                        <AddCircleOutlineIcon fontSize="large"  sx={{widtH: 20, height: 20}}/>
                    </IconButton>
                </div>
            </Popover>
        </>
    );
};

export default AddCategoryPopOver;
