import React, { useState, useRef } from 'react';
import SquareItem  from '../SquareItem/SquareItem';
import { SavedItem } from '../../models/SavedItem';
import './CustomCategory.css';
const CustomCategory = ({ items }: { items: SavedItem[] }) => {
    const containerRef = useRef<any>(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const LeftArrow = () => {
        const scroll = () => {
            if (containerRef.current) {
                const newScrollLeft = scrollLeft - containerRef.current.offsetWidth;
                setScrollLeft(newScrollLeft >= 0 ? newScrollLeft : 0);
                containerRef.current.scrollLeft = newScrollLeft;
            }
        };

        return <button className="scroll-button left" onClick={scroll}> &lt; </button>;
    };
    const RightArrow = () => {
        const scroll = () => {
            if (containerRef.current) {
                const newScrollLeft = scrollLeft + containerRef.current.offsetWidth;
                const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.offsetWidth;
                setScrollLeft(newScrollLeft <= maxScrollLeft ? newScrollLeft : maxScrollLeft);
                containerRef.current.scrollLeft = newScrollLeft;
            }
        };
        return <button className="scroll-button right" onClick={scroll}> &gt; </button>;
    };
    return (
        <div className="bar-section">
            <LeftArrow />
            <div className="square-items" ref={containerRef}>
                { items?.map((item) => ( <SquareItem item={item} key={item.id}/>)) }
            </div>
            <RightArrow />
        </div>
    );
};

export default CustomCategory;
