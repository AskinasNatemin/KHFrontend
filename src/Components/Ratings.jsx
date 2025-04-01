import React, { useState } from 'react';
import '../Styles/Ratings.css';
import { Star } from 'lucide-react';

const Ratings = ({ initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="ratings-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`star ${hover >= star || rating >= star ? 'filled' : ''}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            setRating(star);
            if (onRate) onRate(star);
          }}
        />
      ))}
    </div>
  );
};

export default Ratings;
