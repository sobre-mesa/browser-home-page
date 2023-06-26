import React from 'react';
import { Category } from './CustomCategory';
import { StoreCategory } from '../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
const iconSx = { width: 18, height: 18, marginLeft: '-10px', marginTop: '-10px', color: 'rgba(255, 255, 255, 0.503)' };
export const CustomCategoryPanel = ({ categories }: { categories: StoreCategory[] }) => {
    return (
        <div className="bar" style={{ padding: 20 }}>
            <IconButton style={{marginTop: '-25px', marginLeft: '-10px'}}>
                <SettingsIcon sx={iconSx}/>
            </IconButton>
            {categories.map((category) => (
                <Category key={category.id} category={category.name} items={category.items} />
            ))}
        </div>
    );
};
