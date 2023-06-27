import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function CustomCategoriesSettingItem({
    label,
    onClick,
    onDelete,
}) {

    const handleClick = () => {
        console.info('You clicked the Chip.');
        onClick();
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
        onDelete();
    };

    const handleEdit = () => {
        console.info('You clicked the edit icon.');
    };

    return (
        <div style={styles.container}>
            <span style={styles.label} onClick={handleClick}>
                {label}
            </span>
            <div style={styles.icons}>
                <EditIcon style={styles.icon} onClick={handleEdit} />
                <DeleteIcon style={styles.icon} onClick={handleDelete} />
            </div>
        </div>
    );
}