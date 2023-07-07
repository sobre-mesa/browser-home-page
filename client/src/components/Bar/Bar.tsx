import { SavedItem } from '../../models/SavedItem';
import RoundItem from '../RoundItem/RoundItem';
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

const Bar = ({ category }: { category: SystemCategory }) => {
    const dispatch = useDispatch();
    const modalsOpen = useSelector(selectModalOpen);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const openSettings = () => { dispatch(toggleSystemCategorySettings(category?.name)); };

    const dockElement = document.querySelector('#mac-dock-' + category?.name);
      
    useEffect(() => {
        if (dockElement) {
            setIsOverflowing(dockElement.scrollWidth >= dockElement.clientWidth);
            setScrollPosition(dockElement.scrollLeft);
        }
    }, [dockElement]);
    
    const LeftArrow = () => {
        const scrollLeft = () => {
            if (dockElement) {
                dockElement.scrollLeft -= 100;
                setScrollPosition(dockElement.scrollLeft);
            }
        };
        const visible = () => isOverflowing && scrollPosition > 0;
        if(visible()){
            return (<div className="scroll-arrow left" onClick={scrollLeft}> &lt; </div>);
        }
        return (<></>);
    };
    
    const RightArrow = () => { 
        const scrollRight = () => {
            if (dockElement) {
                dockElement.scrollLeft += 100;
                setScrollPosition(dockElement.scrollLeft);
            }
        };    
        const visible = () => isOverflowing && scrollPosition < (( dockElement?.scrollWidth || 0) - ( dockElement?.clientWidth || 0));
        if(visible()){
            return (<div className="scroll-arrow right" onClick={scrollRight}> &gt; </div>);
        }
        return (<></>);
    };


    return (
        <>
            <div className="outsideBarIShouldDeleteThis">
                <LeftArrow />
                <div id={'mac-dock-' + category.name} className="mac-dock">
                    <ul className="dock-items">
                        <IconButton 
                            onClick={openSettings}>
                            <SettingsIcon 
                                sx={iconSx} />
                        </IconButton>
                        {category.items?.map((item: SavedItem) => (
                            <RoundItem
                                item={item} 
                                key={item.id}/>
                        ))}
                        <p className="vertical-text"> {category?.name?.toUpperCase()}</p>
                    </ul>               
                </div>
                <RightArrow />
            </div>
            <Modal
                className="saved-item-settings-modal"
                open={modalsOpen[category.name] || false}>
                <SavedItemsSettingsModal category={category} />
            </Modal>
        </>
    );
};

export default Bar;