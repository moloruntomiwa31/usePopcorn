import Star from "./Star";
// import PropTypes from "prop-types";

// StarRating.propTypes = {
//   maxRating: PropTypes.number,
//   rating: PropTypes.number,
//   onSetMovieRating: PropTypes.func.isRequired,
//   messages: PropTypes.arrayOf(PropTypes.string),
// };

export default function StarRating({
  maxRating = 5,
  rating = 0,
  onSetMovieRating,
  messages = [],
}) {
  const handleSetRating = (newRating) => {
    onSetMovieRating(newRating);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            onRate={handleSetRating}
            index={index}
            rating={rating}
          />
        ))}
      </div>
      <p className="text-[#dcbe02] font-bold text-lg">
        {messages.length == maxRating ? messages[rating - 1] : rating || ""}
      </p>
    </div>
  );
}
