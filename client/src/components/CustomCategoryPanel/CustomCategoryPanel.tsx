import React from 'react';
import { Category } from '../CustomCategory/CustomCategory';
import { StoreCategory } from '../../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { toggleSystemCategorySettings } from '../../store/slices/dataSlice';
import { useDispatch } from 'react-redux';
import './CustomCategoryPanel.css';
const iconSx = { width: 18, height: 18, marginLeft: '-20px', marginTop: '-35px', color: 'rgba(255, 255, 255, 0.503)' };

export const CustomCategoryPanel = ({ categories }: { categories: StoreCategory[] }) => {
    const dispatch = useDispatch();
    const openSettings = () => dispatch(toggleSystemCategorySettings('custom'));

    const NoItemsYet = ({name} : {name: string}) => <div className="custom-category-warning"> No items added to {name} yet</div>;
    const NoCategoriesYet = () =>  <div className="custom-category-warning no-categories-yet"> No categories added yet </div>;
    const Categories = () => {
        if(categories?.length > 0) {
            return (
                <>{ categories.map((c) => c?.items?.length > 0 ?
                    <Category
                        category={c.name}
                        items={c.items}
                        key={c.id} />
                    : <NoItemsYet 
                        key={c.id}
                        name={c.name}/> )}</>
            );
        }
        else {
            return <NoCategoriesYet />;
        }
    };

    return (
        <div style={{ padding: 20}}>
            <IconButton onClick={openSettings}>
                <SettingsIcon sx={iconSx}/>
            </IconButton>
            <Categories/> 
        </div>
    );
};
