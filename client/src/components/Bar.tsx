import { SavedItem } from '../models/SavedItem';
import { BarItem } from './BarItem';
import React from 'react';

export const Bar = ({items} : { items: SavedItem[] }) => {
    const BarItems = () => items?.map((item: SavedItem) => {
        return (
            <BarItem 
                key={item.id} 
                item={item} />
        );
    });
    return (
        <div className="mac-dock">
            <ul className="dock-items">
                {BarItems()}
            </ul>
        </div>
    );
};