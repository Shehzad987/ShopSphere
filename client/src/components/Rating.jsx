import { FiStar } from 'react-icons/fi';

const Rating = ({ value = 0, numReviews, size = 14 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={size}
          className={star <= Math.round(value) ? 'fill-primary text-primary' : 'text-textMuted'}
        />
      ))}
      {numReviews !== undefined && (
        <span className="text-xs text-textMuted ml-1">({numReviews})</span>
      )}
    </div>
  );
};

export default Rating;
