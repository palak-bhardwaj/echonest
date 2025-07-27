import React from "react";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";

const TravelStoryCard = ({
  imgUrl,
  story,
  title,
  date,
  visitedLocation = [],
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

  return (
    <div
      className="group rounded-2xl overflow-hidden border border-transparent 
        bg-white dark:bg-[#111827] hover:border-blue-500 
        hover:shadow-md hover:shadow-blue-400/30 dark:hover:shadow-blue-700/30 
        transition-all duration-300 ease-in-out relative cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-[1.02]"
          onClick={onClick}
        />

        {/* Favourite Icon */}
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center 
            bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full 
            border border-gray-300 dark:border-white/20 
            hover:scale-110 transition z-10"
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteClick();
          }}
        >
          <FaHeart
            className={`text-lg ${
              isFavourite ? "text-red-500" : "text-gray-600 dark:text-white"
            } transition-colors`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3" onClick={onClick}>
        {/* Title and Date */}
        <div className="flex justify-between items-center">
          <h6 className="text-lg font-bold text-blue-700 dark:text-blue-400 truncate">
            {capitalize(title)}
          </h6>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {date ? moment(date).format("Do MMM YYYY") : "-"}
          </span>
        </div>

        {/* Story Preview */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
          {story?.slice(0, 90)}
          {story?.length > 90 && "..."}
        </p>

        {/* Location Badge */}
        {visitedLocation.length > 0 && (
          <div className="inline-flex items-center gap-2 text-sm text-blue-800 bg-blue-100 
            dark:bg-blue-800/20 dark:text-blue-300 rounded-full px-3 py-1 mt-1 w-fit max-w-full">
            <GrMapLocation className="text-base" />
            <span className="truncate max-w-[180px]">{visitedLocation.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelStoryCard;
