import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa';


import './styles.css';

interface IProps { 
    numberOfStars?: number; 
    rate?: number;
    size?: number;
    defaultColor?: string;
    highlighColor?: string;
    onRate?: (rating: number) => void; // Callback when the user clicks a star
    onHover?: (hoverRating: number) => void; // Callback when the user hovers over a star
    onHoverLeave?: () => void; // Callback when the user stops hovering
}

const StarRating = (props: IProps) => {
    const { numberOfStars = 10, rate = 0, size = 40, defaultColor = '#e4e5e9', highlighColor = '#ffc107', onRate, onHover, onHoverLeave } = props;

    const [rating, setRating] = useState(rate);
    const [hover, setHover] = useState(0);

    const handleMouseClick = (currentIndex: number) => {
        setRating(currentIndex);
        onRate && onRate(currentIndex);
    }

    const handleMouseMove = (currentIndex: number) => {
        setHover(currentIndex);
        onHover && onHover(currentIndex);
    }

    const handleMouseLeave = () => {
        setHover(rating);
        onHoverLeave && onHoverLeave();
    }
    
    return (
        <div>
            {
                [...Array(numberOfStars)].map((_: string, index: number) => {
                    index += 1;
                    return(
                        <FaStar 
                            key={`star-${index}`}
                            className={`star`}
                            onClick={() => handleMouseClick(index)}
                            onMouseMove={() => handleMouseMove(index)}
                            onMouseLeave={() => handleMouseLeave()}
                            size={size}
                            color={index <= (hover || rating) ? highlighColor : defaultColor}
                        />
                    )
                })
            }
        </div>
    );
}

export default StarRating;