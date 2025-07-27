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
      className="border rounded-2xl overflow-hidden bg-white dark:bg-[#1e1e2e] 
        hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-300/20 dark:hover:shadow-purple-600/20 
        transition-all duration-300 ease-in-out relative cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-56 object-cover rounded-t-2xl"
          onClick={onClick}
        />

        {/* Favourite Button */}
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 dark:bg-white/10 
            backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/30 hover:scale-110 transition z-10"
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteClick();
          }}
        >
          <FaHeart
            className={`text-md ${
              isFavourite ? "text-red-500" : "text-gray-600 dark:text-white"
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3" onClick={onClick}>
        {/* Title and Date */}
        <div className="flex justify-between items-center">
          <h6 className="text-base font-semibold text-purple-700 dark:text-purple-400 truncate">
            {capitalize(title)}
          </h6>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {date ? moment(date).format("Do MMM YYYY") : "-"}
          </span>
        </div>

        {/* Story Snippet */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {story?.slice(0, 90)}
          {story?.length > 90 && "..."}
        </p>

        {/* Location Tag */}
        {visitedLocation.length > 0 && (
          <div className="inline-flex items-center gap-2 text-[13px] text-cyan-700 bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-full px-3 py-1 mt-1 w-fit">
            <GrMapLocation className="text-sm" />
            <span className="truncate max-w-[180px]">{visitedLocation.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelStoryCard;
