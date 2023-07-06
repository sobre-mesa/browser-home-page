import React, { useState, useRef } from 'react';
import { Bookmark } from '../SquareItem/SquareItem';
import { SavedItem } from '../../models/SavedItem';

export const Category = ({ category, items }: { category: string; items: SavedItem[] }) => {
    const containerRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleScrollLeft = () => {
        if (containerRef.current) {
            const newScrollLeft = scrollLeft - containerRef.current.offsetWidth;
            setScrollLeft(newScrollLeft >= 0 ? newScrollLeft : 0);
            containerRef.current.scrollLeft = newScrollLeft;
        }
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            const newScrollLeft = scrollLeft + containerRef.current.offsetWidth;
            const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.offsetWidth;
            setScrollLeft(newScrollLeft <= maxScrollLeft ? newScrollLeft : maxScrollLeft);
            containerRef.current.scrollLeft = newScrollLeft;
        }
    };

    return (
        <div className="bar-section" style={{display: 'flex', padding: '1px', backgroundColor: ' rgba(255, 255, 255,0.05)', borderRadius: 10}}>
            <button className="scroll-button left" onClick={handleScrollLeft}>
                &lt;
            </button>
            <div className="bar-section-items" ref={containerRef}>
                {items?.map((item) => (
                    <Bookmark key={item.id} item={item} />
                ))}
            </div>
            <button className="scroll-button right" onClick={handleScrollRight}>
                &gt;
            </button>
        </div>
    );
};
