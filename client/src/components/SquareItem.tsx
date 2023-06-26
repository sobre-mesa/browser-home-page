import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { SavedItem } from '../models/SavedItem';

export const Bookmark = ({ item }: { item: SavedItem }) => {
    return (
        <div className="square-item">
            <Card sx={{ width: 200, backgroundColor: 'rgba(0, 0, 0, 0.9)', borderRadius: 3, margin: '0 12px', color: 'white' }}>
                <CardMedia sx={{ height: 80, paddingBottom: 0, marginBottom: 0 }} image={item.image} />
                <CardContent sx={{ height: 12, marginTop: "-10px", paddingBottom: 0 }}>
                    <Typography variant="body2" color="white" sx={{fontSize: 12}}>
                        {item.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};
