import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCategoryPopOver from '../DeleteCategoryPopover/DeleteCategoryPopOver';
import {Category} from '../../models/Category';
import './CustomCategoriesSettingItem.css';

const styles = {
    icon: {
        cursor: 'pointer',
        marginLeft: 2,
        color: 'rgba(0, 0, 0, 0.503)'
    },
};

export default function CustomCategoriesSettingItem(
    {category, onClick, onDelete, onEdit} : 
{
    category: Category
    onClick: () => void;
    onDelete: (category: Category) => void;
    onEdit: (event: any) => void;
}) {

    const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
    const handleClick = () => {
        console.info('You clicked the Chip.');
        onClick();
    };

    const handleDelete = (event: any) => {
        setDeleteAnchorEl(event.currentTarget);    
    };

    const handleEdit = (event: any) => {
        onEdit(event);
    };

    return (
        <div className="custom-categories-settings-item">
            <span className="custom-categories-settings-item-label"
                onClick={handleClick}>
                {category.name}
            </span>
            <div className="custom-categories-settings-item-icons">
                <EditIcon className="custom-categories-settings-item-icon"
                    onClick={handleEdit} />
                <DeleteIcon className="custom-categories-settings-item-icon"
                    onClick={handleDelete} />
            </div>
            <DeleteCategoryPopOver
                anchorEl={deleteAnchorEl}
                onClose={()=> {setDeleteAnchorEl(null);}}
                onDelete={() => {onDelete(category);}}
            />
        </div>
    );
}
