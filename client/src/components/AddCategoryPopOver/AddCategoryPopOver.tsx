import React, { useState } from 'react';
import { Popover, TextField, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCategory, updateCategory, selectUser } from '../../store/slices/dataSlice';
const AddCategoryPopOver = (
    {categoryToEdit, anchorEl, setAnchorEl} 
    : {categoryToEdit: any, anchorEl: any, setAnchorEl: any}
) => {
   
    const open = Boolean(anchorEl);
    const isEditing = categoryToEdit !== null;
    const [inputValue, setInputValue] = useState(isEditing ? categoryToEdit.name : '');
    const label = isEditing? 'Edit category: ' + categoryToEdit.name : 'Add category';
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
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
                        { !isEditing ? <AddCircleOutlineIcon fontSize="large"  sx={{widtH: 20, height: 20}}/> : <EditIcon fontSize="large" sx={{widtH: 20, height: 20}}/>}
                    </IconButton>
                </div>
            </Popover>
        </>
    );
};

export default AddCategoryPopOver;
