import React from 'react';
import './DeleteCategoryPopOver.css';

import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { PopoverOrigin } from '@mui/material/Popover/Popover';
import { Popover } from '@mui/material';

const DeleteCategoryPopOver= ({ anchorEl, onClose, onDelete,} : PopOverProps) => {
    const text =  'This will delete the category and all bookmarks inside of it, are you sure you want to proceed?';
    const anchor: PopoverOrigin = { vertical: 'center', horizontal: 'right' };
    const transform: PopoverOrigin = { vertical: 'bottom', horizontal: 'left' };
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={anchor}
            transformOrigin={transform}>
            <div className="delete-category-text">
                {text}
            </div>
            <IconButton onClick={onClose}>
                <CancelIcon/>
            </IconButton> 
            <IconButton onClick={onDelete}>
                <DeleteIcon/>
            </IconButton> 
        </Popover>
    );
};
interface PopOverProps {
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
    onDelete: () => void;
}

export default DeleteCategoryPopOver;
