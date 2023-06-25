import React, {useState} from 'react';
import type { SavedItem } from '../models/SavedItem';
import { Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../store/hooks';
import {  deleteSavedItem } from '../store/slices/dataSlice';
import { DeleteSharp } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';
import { AreYouSureModal } from './AreYouSureModal';
const StyledAvatar = styled(Avatar)`
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a */
`;

type EditAction = SetStateAction<SavedItem > | SetStateAction<null>
type EditFunction = Dispatch<EditAction>;
export const SavedItemsSettingsItem = ({
    category,
    item,
    onEdit,
    handleOpen,

}: {
  category: string;     
  item: SavedItem;
  onEdit: EditFunction;
  handleOpen: () => void;
}) => {
    const dispatch = useAppDispatch();
    const handleModalOpen = () => {
        handleOpen();
        onEdit(item as EditAction);
    };

    const onDelete = () => {
        dispatch(deleteSavedItem({category: category, id: item.id as string}));
    };

    console.log(category);

    const [open, setOpen] = useState(false);
    const iconSx = { width: 15, height: 15 };

    const buttonSx = { paddingTop: 0, marginTop: '-16px' };
    return (
        <div>
            <StyledAvatar
                key={item.id}
                onClick={handleModalOpen}
                alt={item.description}
                src={item.image}
                sx={{ width: 40, height: 40, marginTop: '0px' }}
                style={{marginLeft:18}}
            />
            <div style={{marginLeft: 12}}>
                <IconButton aria-label="edit" size="small" onClick={handleModalOpen}  sx={buttonSx}  >
                    <EditIcon className="MuiIconButton-sizeSmall" sx={iconSx}/>
                </IconButton>
                <IconButton aria-label="edit" size="small" onClick={() => setOpen(true)} sx={buttonSx} >
                    <DeleteSharp className="MuiIconButton-sizeSmall" sx={iconSx}/>
                </IconButton>
                <AreYouSureModal
                    open={open}
                    setOpen={setOpen}
                    onConfirm={onDelete}
                    title="Are you sure you want to delete this item?"
                    message="This action cannot be undone."
                />
            </div>
        </div>
    );
};

