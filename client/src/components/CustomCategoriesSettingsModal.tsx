import React, { useEffect, useState } from 'react';
import { SavedItemsSettingsModal } from './SavedItemsSettingsModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalOpen, selectData, deleteCategory } from '../store/slices/dataSlice';
import { StoreCategory } from '../models/Store';
import CustomCategoriesSettingItem from './CustomCategoriesSettingItem';
import { Modal, IconButton } from '@mui/material';
import AddCategoryPopOver  from './AddCategoryPopOver';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const CustomCategoriesSettingsModal = ({
    categories
}: {
  categories: StoreCategory[];
}) => {
    const [selectedCategory, setSelectedCategory] = useState<StoreCategory | null>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const data = useSelector(selectData);
    const modalsOpen = useSelector(selectModalOpen);
    const dispatch = useDispatch();


    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


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



    return (
        <Modal
            className="saved-item-settings-modal"
            open={modalsOpen['custom']}
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
                    <IconButton onClick={handleButtonClick} style={{marginLeft: '80px'}}>
                        <AddCircleOutlineIcon sx={{color: 'rgba(164, 30, 30, 0.7)'}} />
                    </IconButton>
                    <AddCategoryPopOver
                        categoryToEdit={null}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl} />
                    {categories?.map((category) => (
                        <CustomCategoriesSettingItem
                            key={category.id}
                            category={category}
                            onClick={() => handleCategoryClick(category)}
                            onDelete={(x) => dispatch(deleteCategory({id: x.id})) }
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
