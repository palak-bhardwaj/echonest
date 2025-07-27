import moment from "moment";
import { GrMapLocation } from "react-icons/gr";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md border border-slate-200 max-w-3xl mx-auto">
      {/* Header Buttons */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-3 bg-cyan-50/60 px-4 py-2 rounded-md shadow-sm">
          <button
            className="flex items-center gap-2 text-sm font-medium text-cyan-700 hover:text-cyan-800 hover:bg-cyan-100 transition px-3 py-1 rounded-md"
            onClick={onEditClick}
          >
            <MdUpdate className="text-lg" /> Update
          </button>

          <button
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-100 transition px-3 py-1 rounded-md"
            onClick={onDeleteClick}
          >
            <MdDeleteOutline className="text-lg" /> Delete
          </button>

          <button
            className="flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
            onClick={onClose}
          >
            <MdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          {storyInfo?.title}
        </h1>

        {/* Date and Location */}
        <div className="flex flex-wrap justify-between items-center gap-3 text-sm text-slate-600">
          <span>
            📅 {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
          </span>

          <div className="flex items-center gap-2 bg-cyan-100/60 text-cyan-800 font-medium px-3 py-1 rounded-md">
            <GrMapLocation className="text-base" />
            {storyInfo?.visitedLocation?.join(", ")}
          </div>
        </div>

        {/* Image */}
        <img
          src={storyInfo?.imageUrl}
          alt="Travel Story"
          className="w-full h-[300px] rounded-lg object-cover shadow-sm border border-slate-200"
        />

        {/* Story Text */}
        <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line mt-2 text-justify">
          {storyInfo?.story}
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
