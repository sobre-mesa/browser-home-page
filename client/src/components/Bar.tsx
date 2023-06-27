import { SavedItem } from '../models/SavedItem';
import { RoundItem } from './RoundItem';
import React from 'react';
import { SystemCategory } from '../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { toggleSystemCategorySettings, selectModalOpen } from '../store/slices/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SavedItemsSettingsModal } from './SavedItemsSettingsModal';
const iconSx = { width: 15,
    height: 15,
    marginLeft: '-10px',
    marginTop: '-10px',
    color: 'rgba(255, 255, 255, 0.503)' };

import { Modal } from '@mui/material';

export const Bar = ({ category }: { category: SystemCategory }) => {
    const dispatch = useDispatch();
    const openSettings = () => {
        dispatch(toggleSystemCategorySettings(category.name));
    };
    const modalsOpen = useSelector(selectModalOpen);
    const appStyle = {backgroundColor: 'rgba(0, 0, 0, 0.503)'};
    const channelStyle = {backgroundColor: 'rgba(164, 30, 30, 0.7)'};

    return (
        <div style={{display: 'flex'}}>
            <Modal
                className="saved-item-settings-modal"
                open={modalsOpen.editSystemCategory[category.name]}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    backdropFilter: 'blur(5px)',
                }}
            >
                <SavedItemsSettingsModal category={category} />
            </Modal>
            <div className="mac-dock" style={category.name == 'apps' ? appStyle : channelStyle}>
               
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
            </div>
        </div>
    );
};
