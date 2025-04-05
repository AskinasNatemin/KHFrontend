import React, { useState } from 'react';
import '../Styles/Ratings.css';
import { Star } from 'lucide-react';

const Ratings = ({ initialRating = 0, onRate, onClose }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="ratingsOverlay">
      <div className="ratingsContainer">
        <button className="ratingsCloseButton" onClick={onClose}>&times;</button>
        <h3>Rate this Book</h3>
        <div className="ratingsStars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`ratingsStar ${hover >= star || rating >= star ? 'ratingsFilled' : ''}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                setRating(star);
              }}
            />
          ))}
          <button onClick={()=>{if (onRate) onRate(rating)}}>submit</button>
                if (onRate) onRate(star);
              }}
            />
          ))}
        </div>
        <span className="ratingsValue">{rating} / 5</span>
      </div>
    </div>
  );
};

export default Ratings;
