import React from 'react';
import { Bookmark } from './Bookmark';
import { SavedItem } from '../models/SavedItem';

export const Category = ({ category, items }: { category: string; items: SavedItem[] }) => {
    return (
        <div className="bar-section">
            <div className="bar-section-title">{category}</div>
            <div className="bar-section-items">
                {items.map((item) => (
                    <Bookmark
                        key={item.id}
                        item={item} />
                ))}
            </div>
        </div>
    );
};