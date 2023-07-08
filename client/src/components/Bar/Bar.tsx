import { SavedItem } from '../../models/SavedItem';
import RoundItem from '../RoundItem/RoundItem';
import React, {useState, useEffect, useRef} from 'react';
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
    
    const dockElementRef = useRef<HTMLUListElement>(null);
    // const dockElement = document.querySelector('#dock-items-' + category?.name);
      
    useEffect(() => {
        const dockElement = dockElementRef.current;
        if (dockElement) {
            setIsOverflowing(dockElement.scrollWidth >= dockElement.clientWidth);
            setScrollPosition(dockElement.scrollLeft);
        }
    }, [dockElementRef]);
    
    const LeftArrow = () => {
        const scrollLeft = () => {
            const dockElement = dockElementRef.current;
            if (dockElement) {
                dockElement.scrollLeft = scrollPosition - 200;
                setScrollPosition(dockElement.scrollLeft);
            }
        };
        const visible = () => isOverflowing && scrollPosition > 0;
        if(visible()) return (<div className="scroll-arrow left" onClick={scrollLeft}> &lt; </div>);
        return (<></>);
    };
    
    const RightArrow = () => { 
        const dockElement = dockElementRef.current;
        const scrollRight = () => {
            if (dockElement) {
                console.log(dockElement.scrollWidth);
                console.log(dockElement.scrollLeft);
                dockElement.scrollLeft = scrollPosition + 200;
                console.log(dockElement.scrollLeft);
                setScrollPosition(dockElement.scrollLeft);
            }
        };    
       
        const visible = isOverflowing && scrollPosition < (( dockElement.scrollWidth || 0) - ( dockElement?.clientWidth || 0));
        if(visible) return (<div className="scroll-arrow right" onClick={scrollRight}> &gt; </div>);
        return (<></>);
    };

    const SettingsButton = () => {
        return (
            <IconButton 
                onClick={openSettings}>
                <SettingsIcon 
                    sx={iconSx} />
            </IconButton>
        );
    };

    const VerticalTitle = () => <p className="vertical-text"> {category?.name?.toUpperCase()}</p>;

    const RoundItems = () => {
        return (
            <ul ref={dockElementRef} id={'dock-items-' + category.name} className="dock-items">
                {category.items?.map((item: SavedItem) => (
                    <RoundItem
                        item={item} 
                        key={item.id}/>
                     
                ))}
            </ul>   
        );
    };
    return (
        <>
       
            <div id={'mac-dock-' + category.name} className="mac-dock">
                <SettingsButton />
                <LeftArrow />
                <RoundItems />                          
                <RightArrow />
                <VerticalTitle />
            </div>
        
            <Modal
                className="modal saved-item-settings-modal"
                open={modalsOpen[category.name] || false}>
                <SavedItemsSettingsModal category={category} />
            </Modal>
        </>
    );
};

export default Bar;