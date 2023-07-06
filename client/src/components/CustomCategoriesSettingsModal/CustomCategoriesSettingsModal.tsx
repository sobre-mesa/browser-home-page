import React, { useEffect, useState } from 'react';
import { SavedItemsSettingsModal } from '../SavedItemSettingsModal/SavedItemsSettingsModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalOpen, selectData, deleteCategory } from '../../store/slices/dataSlice';
import { StoreCategory } from '../../models/Store';
import CustomCategoriesSettingItem from '../CustomCategoriesSettingsItem/CustomCategoriesSettingItem';
import { Modal, IconButton } from '@mui/material';
import AddCategoryPopOver  from '../AddCategoryPopOver/AddCategoryPopOver';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const CustomCategoriesSettingsModal = ({
    categories
}: {
  categories: StoreCategory[];
}) => {
    const [displayedCategories, setDisplayedCategories] = useState<StoreCategory[] | null>(categories);
    const [selectedCategory, setSelectedCategory] = useState<StoreCategory | null>(null);
    const [categorytoEdit, setCategoryToEdit] = useState<StoreCategory | null>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const data = useSelector(selectData);
    const modalsOpen = useSelector(selectModalOpen);
    const dispatch = useDispatch<any>();

    const handleAddCategory = (event: any) => {
        setCategoryToEdit(null);
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        setDisplayedCategories(data.categories);
        if (selectedCategory) {
            const updatedCategory = data.categories.find((category) => category.id === selectedCategory.id);
            if (updatedCategory) {
                setSelectedCategory(updatedCategory);
            }
            else { 
                setSelectedCategory(data.categories[0]);
            }
        }
        else {
            if(data.categories.length > 0)
                setSelectedCategory(data.categories[0]);
        }
    }, [data.categories]);

    // useEffect(() => {
    //     setDisplayedCategories(data.categories);
    // }, [data.categories]);

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
                    <IconButton onClick={handleAddCategory} style={{marginLeft: '80px'}}>
                        <AddCircleOutlineIcon sx={{color: 'rgba(164, 30, 30, 0.7)'}} />
                    </IconButton>
                    <AddCategoryPopOver
                        anchorEl={anchorEl}
                        categoryToEdit={categorytoEdit}
                        setAnchorEl={setAnchorEl} />
                    {displayedCategories?.length || 0 > 0 ? 
                        displayedCategories?.map((category) => (
                            <CustomCategoriesSettingItem
                                category={category}
                                key={category.id}
                                onClick={() => handleCategoryClick(category)}
                                onDelete={(x) => dispatch(deleteCategory({id: x.id as string})) }
                                onEdit={(event) => {
                                    setCategoryToEdit(category);
                                    setSelectedCategory(category);
                                    setAnchorEl(event.currentTarget);
                                }}
                            />
                        )) :
                        <div style={{marginLeft: '80px', marginTop: '20px', color: 'rgba(164, 30, 30, 0.7)'}}>
                        No custom categories yet!
                        </div>
                    }
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
