import React from 'react';
import { SavedItem } from '../../models/SavedItem';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(Avatar)`
     margin: 8px;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); `;

export const RoundItem = ({item}: { item: SavedItem }) => {
    return (
        <a  href={item.url}>
            <StyledAvatar className="round-item"
                alt={item.description} 
                src={item.image}
                sx={{ width: 40, height: 40 }} />
        </a>
    );
};


