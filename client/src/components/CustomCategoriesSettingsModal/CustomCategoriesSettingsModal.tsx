import React, { useEffect, useState } from 'react';
import { SavedItemsSettingsModal } from '../SavedItemSettingsModal/SavedItemsSettingsModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalOpen, selectData, deleteCategory } from '../../store/slices/dataSlice';
import { StoreCategory } from '../../models/Store';
import CustomCategoriesSettingItem from '../CustomCategoriesSettingsItem/CustomCategoriesSettingItem';
import { Modal, IconButton } from '@mui/material';
import AddCategoryPopOver  from '../AddCategoryPopOver/AddCategoryPopOver';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './CustomCategoriesSettingsModal.css';

const CustomCategoriesSettingsModal = ({categories}: { categories: StoreCategory[]}) => {
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
            const updatedCategory = data.categories.find((c) => c.id === selectedCategory.id);
            setSelectedCategory(updatedCategory ? updatedCategory : data.categories[0]);
        }
        else if(data.categories.length > 0) setSelectedCategory(data.categories[0]);
    }, [data.categories]);

    const handleCategoryClick = (category: StoreCategory) => {
        setSelectedCategory(category);
    };
    
    const getOnEdit = (category: StoreCategory) => {
        return (event: any) => {
            setCategoryToEdit(category);
            setSelectedCategory(category);
            setAnchorEl(event.currentTarget);
        };
    };

    const thereIsACategory = () => displayedCategories?.length || 0 > 0;
    const circleButtonSX = {color: 'rgba(164, 30, 30, 0.7)'};
    return (
        <Modal className="saved-item-settings-modal" open={modalsOpen['custom']}>
            <div className="flex">
                <div className="custom-categories-side-bar">
                    <IconButton onClick={handleAddCategory} style={{marginLeft: '80px'}}>
                        <AddCircleOutlineIcon sx={circleButtonSX}/>
                    </IconButton>
                    <AddCategoryPopOver
                        anchorEl={anchorEl}
                        categoryToEdit={categorytoEdit}
                        setAnchorEl={setAnchorEl} />
                    { thereIsACategory() ? displayedCategories?.map((category) => (
                        <CustomCategoriesSettingItem
                            category={category}
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            onDelete={(x) => dispatch(deleteCategory({id: x.id as string})) }
                            onEdit={getOnEdit(category)}
                        /> )) 
                        : <div className="no-custom-categories"> No custom categories yet! </div> }
                </div>
                { selectedCategory && <SavedItemsSettingsModal category={selectedCategory}/> }
            </div>
        </Modal>
    );
};

export default CustomCategoriesSettingsModal;