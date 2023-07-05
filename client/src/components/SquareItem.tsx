import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { SavedItem } from '../models/SavedItem';

export const Bookmark = ({ item }: { item: SavedItem }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="square-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Card
                sx={{ maxWidth: 240, height: 115, backgroundColor: 'rgba(0, 0, 0, 0.9)', borderRadius: 3, margin: '0 12px', color: 'white' }}
            >
                <CardMedia
                    className="media"
                    sx={{ height: 200, paddingBottom: 0, marginBottom: 0 }}
                    image={item.image}
                />
                <CardContent
                    className={`card-content ${isHovered ? 'expanded' : ''}`}
                    sx={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 10}}
                >
                    <Typography variant="body2" color="white" sx={{ fontSize: 12 }}>
                        {item.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};
