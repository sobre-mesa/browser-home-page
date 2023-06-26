import { SavedItem } from '../models/SavedItem';
import { RoundItem } from './RoundItem';
import React from 'react';
import { SystemCategory } from '../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { toggleSystemCategorySettings } from '../store/slices/dataSlice';
import { useDispatch } from 'react-redux';
import { SavedItemsSettingsModal } from './SavedItemsSettingsModal';
const iconSx = { width: 15, height: 15, marginLeft: "-10px", marginTop: "-10px", color: "rgba(255, 255, 255, 0.503)" };


export const Bar = ({ category }: { category: SystemCategory }) => {
    const dispatch = useDispatch();
    const openSettings = () => {
        dispatch(toggleSystemCategorySettings(category.name));
    };

    const appStyle = {backgroundColor: 'rgba(0, 0, 0, 0.503)'}
    const channelStyle = {backgroundColor: 'rgba(164, 30, 30, 0.7)'}

    return (
        <div style={{display: 'flex'}}>
            <SavedItemsSettingsModal category={category} />

            <div className="mac-dock" style={category.name == "apps" ? appStyle : channelStyle}>
               
                <ul className="dock-items">
                    <div>
                        <IconButton onClick={openSettings}>
                            <SettingsIcon sx={iconSx} />
                        </IconButton>
                    </div>
                    {category.items?.map((item: SavedItem) => (
                        <RoundItem key={item.id} item={item} />
                    ))}
                    <p className="vertical-text">{category.name.toUpperCase()}</p>
                </ul>
              
                {/* Vertical Bar */}
               
            </div>
        </div>
    );
};
