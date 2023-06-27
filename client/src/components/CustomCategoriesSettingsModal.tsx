import React, { useEffect, useState } from 'react';
import { SavedItemsSettingsModal } from './SavedItemsSettingsModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalOpen, selectData } from '../store/slices/dataSlice';
import { StoreCategory } from '../models/Store';
import CustomCategoriesSettingItem from './CustomCategoriesSettingItem';
import { Modal } from '@mui/material';

export const CustomCategoriesSettingsModal = ({
    categories
}: {
  categories: StoreCategory[];
}) => {
    const [selectedCategory, setSelectedCategory] = useState<StoreCategory | null>(null);
    const data = useSelector(selectData);
    const modalsOpen = useSelector(selectModalOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        // Update the selected category if its items have changed
        if (selectedCategory) {
            const updatedCategory = data.categories.find((category) => category.id === selectedCategory.id);
            if (updatedCategory) {
                setSelectedCategory(updatedCategory);
            }
        }
    }, [data.categories, selectedCategory]);

    useEffect(() => {
    // Update the selected category if its items have changed
        if (selectedCategory) {
            const updatedCategory = data.categories.find((category) => category.id === selectedCategory.id);
            if (updatedCategory) {
                setSelectedCategory(updatedCategory);
            }
        }
    }, [data.categories, selectedCategory]);

    const handleCategoryClick = (category: StoreCategory) => {
        setSelectedCategory(category);
    };

    const handleDeleteItem = (itemId: string) => {
    // Dispatch an action to delete the item
        dispatch(deleteSavedItem({ category: selectedCategory?.name || '', id: itemId }));
    };

    return (
        <Modal
            className="saved-item-settings-modal"
            open={modalsOpen.editSystemCategory['custom']}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backdropFilter: 'blur(5px)',
            }}
        >
            <div className="custom-categories-settings-modal" style={{ display: 'flex' }}>
                <div className="custom-categories-side-bar" style={{ marginRight: 60, marginLeft: '-220px' }}>
                    {categories?.map((category) => (
                        <CustomCategoriesSettingItem
                            key={category.id}
                            label={category.name}
                            onClick={() => handleCategoryClick(category)}
                            onDelete={handleDeleteItem}
                        />
                    ))}
                </div>
                {selectedCategory && (
                    <SavedItemsSettingsModal
                        category={selectedCategory}
                    />
                )}
            </div>
        </Modal>
    );
};
