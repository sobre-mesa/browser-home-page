import React, {useEffect, useState} from 'react';
import {SavedItemsSettingsModal} from './SavedItemsSettingsModal';
import {Dispatch, SetStateAction} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toggleSystemCategorySettings} from '../store/slices/dataSlice';
import {StoreCategory} from '../models/Store';
import CustomCategoriesSettingItem from './CustomCategoriesSettingItem';
export const CustomCategoriesSettingsModal = ({
    open,
    setOpen,
    onEdit,
    categories
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onEdit: Dispatch<SetStateAction<StoreCategory | null>>;
    categories: StoreCategory[];
}) => {
    console.log(categories);
    const [selectedCategory, setSelectedCategory] = useState<StoreCategory | null>(categories[0]);
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        onEdit(null);
    };
    console.log(selectedCategory)
    return (
        <div style={{marginLeft: 500, marginTop: 80, zIndex: 999}}className="custom-categories-settings-modal">
            <div className="custom-categories-side-bar">
                {categories?.map((category) => (
                    <CustomCategoriesSettingItem
                        key={category.id}
                        label={category.name}
                        onClick={() => setSelectedCategory(category)}
                        onDelete={() => {}}
                    />
                ))}
            </div>
            {selectedCategory &&    
            <SavedItemsSettingsModal
                category={selectedCategory}
            />
            }
         
        </div>
    );
};
