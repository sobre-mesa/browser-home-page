import React from 'react';
import { SavedItem } from '../models/SavedItem';
export const Bookmark = ({item}: { item: SavedItem }) => {
    return (
        <div className="bar-item">
            <div className="bar-item-title">{item.description}</div>
            <div className="bar-item-url">{item.url}</div>
            <div className="bar-item-url">{item.image}</div>
            <div className="bar-item-url">{item.category}</div>
            <div className="bar-item-url">{item.id}</div>
        </div>
    );
};