import { SavedItem } from '../models/SavedItem';
import { RoundItem } from './RoundItem';
import React from 'react';
import {SystemCategory} from '../models/Store';

export const Bar = ({category} : {category: SystemCategory}) => {

    return (
        <div className="mac-dock">
            <ul className="dock-items">
                { category.items?.map((item: SavedItem) => (<RoundItem key={item.id} item={item}/>)) }
            </ul>
        </div>
    );
};