import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCategoryPopOver from '../DeleteCategoryPopover/DeleteCategoryPopOver';
import {Category} from '../../models/Category';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(164, 30, 30, 0.7)',
        borderRadius: '7 7 0 0',
        padding: '10',
        width: 200,
        height: 30,
        marginBottom: 2
    },
    label: {
        marginLeft: 6,
        cursor: 'pointer',
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 13,
    },
    icons: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
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
        <div style={styles.container}>
            <span style={styles.label} onClick={handleClick}>
                {category.name}
            </span>
            <div style={styles.icons}>
                <EditIcon style={styles.icon} onClick={handleEdit} />
                <DeleteIcon style={styles.icon} onClick={handleDelete} />
                <DeleteCategoryPopOver
                    onDelete={() => {onDelete(category);}}
                    anchorEl={deleteAnchorEl}
                    onClose={()=> {setDeleteAnchorEl(null);}}
                />
            </div>
        </div>
    );
}
