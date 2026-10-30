import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  value: number; // 0 to 5
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  showText?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  interactive = false,
  size = 'md',
  onChange,
  showText = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const labels = ['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Very Good 😊', 'Exceptional! 🌟'];

  const currentVal = hoverValue !== null ? hoverValue : value;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= currentVal;
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(star)}
              onMouseEnter={() => interactive && setHoverValue(star)}
              onMouseLeave={() => interactive && setHoverValue(null)}
              aria-label={interactive ? `Rate ${star} star${star > 1 ? 's' : ''}` : undefined}
              className={`${
                interactive
                  ? 'cursor-pointer hover:scale-115 transition-transform p-0.5 focus:outline-hidden'
                  : 'cursor-default pointer-events-none'
              }`}
            >
              <Star
                className={`${starSizes[size]} transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 text-stone-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showText && interactive && currentVal > 0 && (
        <span className="text-xs font-bold text-amber-700 ml-1">
          {labels[currentVal]}
        </span>
      )}
    </div>
  );
};
