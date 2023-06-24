import React from 'react';
import type { SavedItem } from '../models/SavedItem';
import { Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../store/hooks';
import {  toggleModal } from '../store/slices/dataSlice';
import { DeleteSharp } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';
// Custom styled Avatar component with border
const StyledAvatar = styled(Avatar)`
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a */
`;

export const SavedItemsSettingsItem = ({
    item,
    onEdit
}: {
  item: SavedItem;
  onEdit: Dispatch<SetStateAction<SavedItem>>;
}) => {
    const dispatch = useAppDispatch();
    const handleModalOpen = () => {
        dispatch(toggleModal('savedItem'));
        onEdit(item);
    };
    return (
        <div>
            <StyledAvatar
                key={item.id}
                onClick={handleModalOpen}
                alt={item.description}
                src={item.image}
                sx={{ width: 40, height: 40 }}
                style={{marginLeft:18}}
            />
            <IconButton aria-label="edit" size="small" onClick={handleModalOpen}>
                <EditIcon className="MuiIconButton-sizeSmall" />
            </IconButton>
            <IconButton aria-label="edit" size="small">
                <DeleteSharp className="MuiIconButton-sizeSmall" />
            </IconButton>
        </div>
    );
};
