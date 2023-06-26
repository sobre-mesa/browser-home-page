import React from 'react';
import { Category } from './CustomCategory';
import { StoreCategory } from '../models/Store';

export const CustomCategoryPanel = ({ categories }: { categories: StoreCategory[] } ) => {
    return (
        <div className="bar">
            {categories.map((category) => (
                <Category
                    key={category.id}
                    category={category.name}
                    items={category.items} />
            ))}
        </div>
    );
};
