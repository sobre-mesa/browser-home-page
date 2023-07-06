import React from 'react';
import { Category } from '../CustomCategory/CustomCategory';
import { StoreCategory } from '../../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { toggleSystemCategorySettings } from '../../store/slices/dataSlice';
import { useDispatch } from 'react-redux';
const iconSx = { width: 18, height: 18, marginLeft: '-10px', marginTop: '-10px', color: 'rgba(255, 255, 255, 0.503)' };
const warningStyle = {color: 'white',
    height: 100,
    backgroundColor: ' rgba(255, 255, 255,0.05)',
    padding: 10, margin: 10,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    cursor: 'pointer'};
export const CustomCategoryPanel = ({ categories }: { categories: StoreCategory[] }) => {
    const dispatch = useDispatch();
    const openSettings = () => {
        dispatch(toggleSystemCategorySettings('custom'));
    };
    return (
        <div style={{ padding: 20}}>
            <IconButton onClick={openSettings} style={{marginTop: '-25px', marginLeft: '-10px'}}>
                <SettingsIcon sx={iconSx}/>
            </IconButton>
            {categories?.length > 0 ? 
                ( categories.map((category) => category?.items?.length > 0 ?
                    <Category key={category.id} category={category.name} items={category.items} /> :
                    <div key={category.id} style={warningStyle}> No items added to {category.name} yet </div> ) ) :
                ( <div style={{...warningStyle, height: '340px', backgroundColor: ' rgba(255, 255, 255,0.03)',}}>No categories added yet</div> )
            }
        </div>
    );
};
