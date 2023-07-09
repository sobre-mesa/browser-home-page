import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCategoryPopOver from '../DeleteCategoryPopover/DeleteCategoryPopOver';
import {Category} from '../../models/Category';
import './CustomCategoriesSettingItem.css';

type CustomCategoriesSettingItemProps = {
    category: Category
    onClick: () => void;
    onDelete: (category: Category) => void;
    onEdit: (event: any) => void;
}
    
function CustomCategoriesSettingItem({category, onClick, onDelete, onEdit} : CustomCategoriesSettingItemProps) {
    const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);

    return (
        <div className="custom-categories-settings-item">
            <span className="custom-categories-settings-item-label"
                onClick={onClick}>
                {category.name}
            </span>
            <div className="custom-categories-settings-item-icons">
                <EditIcon className="custom-categories-settings-item-icon"
                    onClick={onEdit} />
                <DeleteIcon className="custom-categories-settings-item-icon"
                    onClick={(e) => setDeleteAnchorEl(e.currentTarget as any)} />
            </div>
            <DeleteCategoryPopOver
                anchorEl={deleteAnchorEl}
                onClose={()=> {setDeleteAnchorEl(null);}}
                onDelete={() => {onDelete(category);}}
            />
        </div>
    );
}

export default CustomCategoriesSettingItem;
