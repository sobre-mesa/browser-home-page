import { SavedItem } from '../models/SavedItem';
import { RoundItem } from './RoundItem';
import React from 'react';
import {SystemCategory} from '../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import {toggleSystemCategorySettings} from '../store/slices/dataSlice';
import {useDispatch} from 'react-redux';
import { SavedItemsSettingsModal } from './SavedItemsSettingsModal';
export const Bar = ({category} : {category: SystemCategory}) => {
    const dispatch = useDispatch();
    const openSettings = () => {
        dispatch(toggleSystemCategorySettings(category.name));
    };
    
    return (
        <>
            <SavedItemsSettingsModal category={category}/>
    
            <div className="mac-dock">
                <div>
                    <IconButton onClick={openSettings}>
                        <SettingsIcon />
                    </IconButton>
                </div>
                <ul className="dock-items">
                    { category.items?.map((item: SavedItem) => (<RoundItem key={item.id} item={item}/>)) }
                </ul>
            </div>
        </>
    );
};