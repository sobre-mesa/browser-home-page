import React, {useState} from 'react';

import type { Dispatch, SetStateAction } from 'react';
import type { SavedItem } from '../../models/SavedItem';

import { useAppDispatch } from '../../store/hooks';
import {  deleteSavedItem } from '../../store/slices/dataSlice';
import AreYouSureModal from '../AreYouSureModal/AreYouSureModal';

import { Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteSharp } from '@mui/icons-material';


const SavedItemsSettingsItem = ({ category, item, onEdit, handleOpen}: ItemProps) => {
    const dispatch = useAppDispatch();
    const handleModalOpen = () => {
        handleOpen();
        onEdit(item as EditAction);
    };

    const onDelete = () => {
        dispatch(deleteSavedItem({category: category, id: item.id as string}));
    };

    const [open, setOpen] = useState(false);
    const iconSx = { width: 15, height: 15 };

    const buttonSx = { paddingTop: 0, marginTop: '-16px' };

    const StyledAvatar = styled(Avatar)`
        margin: 10px;
        margin-left: 18px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    `;

    return (
        <div>
            <StyledAvatar
                key={item.id}
                onClick={handleModalOpen}
                alt={item.description}
                src={item.image} />
            <div style={{marginLeft: 12}}>
                <IconButton aria-label="edit" size="small" onClick={handleModalOpen} sx={buttonSx}  >
                    <EditIcon sx={iconSx}/>
                </IconButton>
                <IconButton aria-label="edit" size="small" onClick={() => setOpen(true)} sx={buttonSx} >
                    <DeleteSharp sx={iconSx}/>
                </IconButton>
                <AreYouSureModal
                    message="This action cannot be undone."
                    onConfirm={onDelete}
                    open={open}
                    setOpen={setOpen}
                    title="Are you sure you want to delete this item?" />
            </div>
        </div>
    );
};

type ItemProps = {
    category: string;     
    item: SavedItem;
    onEdit: EditFunction;
    handleOpen: () => void;
}

type EditAction = SetStateAction<SavedItem> & SetStateAction<null>
type EditFunction = Dispatch<SetStateAction<SavedItem>> | Dispatch<SetStateAction<null>>;
export default SavedItemsSettingsItem;