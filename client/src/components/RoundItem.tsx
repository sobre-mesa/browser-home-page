import React from 'react';
import { SavedItem } from '../models/SavedItem';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled Avatar component with border
const StyledAvatar = styled(Avatar)`
     margin: 10px;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a
`;

export const RoundItem = ({item}: { item: SavedItem }) => {
    return (
        <a href={item.url}>
            <StyledAvatar 
                alt={item.description} 
                src={item.image}
                sx={{ width: 56, height: 56 }} />
        </a>
    );
};


