import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { SavedItem } from '../../models/SavedItem';
import './SquareItem.css';

const SquareItem = ({ item }: { item: SavedItem }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const cardSX = {width: 240, height: 115,backgroundColor: 'rgba(0, 0, 0, 0.9)', borderRadius: 3 };
    return (
        <div className="square-item"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={ () => setIsHovered(false)}>
            <Card sx={cardSX}>
                <CardMedia className="media" image={item.image}/>
                <CardContent className={`card-content ${isHovered ? 'expanded' : ''}`}>
                    <Typography variant="body2" color="white"> {item.description}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default SquareItem;
