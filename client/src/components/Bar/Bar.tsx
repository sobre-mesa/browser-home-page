import { SavedItem } from '../../models/SavedItem';
import { RoundItem } from '../RoundItem/RoundItem';
import React, {useState, useEffect} from 'react';
import { SystemCategory } from '../../models/Store';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { toggleSystemCategorySettings, selectModalOpen } from '../../store/slices/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SavedItemsSettingsModal } from '../SavedItemSettingsModal/SavedItemsSettingsModal';
const iconSx = { width: 15,
    height: 15,
    marginLeft: '-10px',
    marginTop: '-10px',
    color: 'rgba(255, 255, 255, 0.503)' };

import { Modal } from '@mui/material';
import './Bar.css';

export const Bar = ({ category }: { category: SystemCategory }) => {
    const dispatch = useDispatch();
    const modalsOpen = useSelector(selectModalOpen);
    const appStyle = {backgroundColor: 'rgba(0, 0, 0, 0.503)'};
    const channelStyle = {backgroundColor: 'rgba(164, 30, 30, 0.7)'};

    const [isOverflowing, setIsOverflowing] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const dockElement = document.querySelector('#mac-dock-' + category?.name);
    const scrollLeft = () => {
        if (dockElement) {
            dockElement.scrollLeft -= 100;
            setScrollPosition(dockElement.scrollLeft);
        }
    };
      
    const scrollRight = () => {
        if (dockElement) {
            dockElement.scrollLeft += 100;
            setScrollPosition(dockElement.scrollLeft);
        }
    };

    const openSettings = () => {
        dispatch(toggleSystemCategorySettings(category?.name));
    };

    useEffect(() => {
        if (dockElement) {
            setIsOverflowing(dockElement.scrollWidth >= dockElement.clientWidth);
            setScrollPosition(dockElement.scrollLeft);
        }
    }, [dockElement]);
      
    return (
        <>
            <div style={{display: 'flex', width: 900, justifyContent: 'center', alignItems: 'center'}}>
                {isOverflowing && scrollPosition > 0 && (
                    <div className="scroll-arrow left" style={{color: 'white', marginTop: 44, paddingRight: 10}} onClick={scrollLeft}>
                        &lt;
                    </div>
                )}
                <Modal
                    className="saved-item-settings-modal"
                    open={modalsOpen[category.name] || false}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        backdropFilter: 'blur(5px)',
                    }}>
                    <div>
                        <SavedItemsSettingsModal category={category} />
                    </div>
                </Modal>
                <div id={'mac-dock-' + category.name} className="mac-dock" style={category.name == 'apps' ? appStyle : channelStyle}>
                    <ul id={'dock-items-' + category.name} className="dock-items">
                        <div>
                            <IconButton onClick={openSettings}>
                                <SettingsIcon sx={iconSx} />
                            </IconButton>
                        </div>
                        {category.items?.map((item: SavedItem) => (
                            <RoundItem key={item.id} item={item} />
                        ))}
                        <p className="vertical-text">{category?.name?.toUpperCase()}</p>
                    </ul>               
                </div>
                {isOverflowing && scrollPosition < (( dockElement?.scrollWidth || 0) - ( dockElement?.clientWidth || 0)) && (
                    <div className="scroll-arrow right"
                        style={{color: 'white',
                            marginTop: 44,
                            paddingLeft: 10}} onClick={scrollRight}>
                    &gt;
                    </div>
                )}
            </div>
        </>
    );
};
