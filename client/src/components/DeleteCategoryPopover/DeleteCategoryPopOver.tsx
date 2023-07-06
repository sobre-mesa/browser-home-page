import { Popover, Button } from '@mui/material';

import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

interface DeleteCategoryPopOverProps {
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteCategoryPopOver: React.FC<DeleteCategoryPopOverProps> = ({
    anchorEl,
    onClose,
    onDelete,
}) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div style={{display: 'block'}}>
                <div style={{fontSize: 12, overflow: 'wrap', width: 220, padding: 10}}> This will delete the category and all bookmarks inside of it, are you sure you want to proceed? </div>
                <IconButton onClick={onClose}><CancelIcon /></IconButton> 
                <IconButton onClick={onDelete}><DeleteIcon /></IconButton> 
            </div>
         
        </Popover>
    );
};

export default DeleteCategoryPopOver;
