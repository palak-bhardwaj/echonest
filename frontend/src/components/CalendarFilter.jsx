import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-day-picker/dist/style.css";

const CalendarFilter = ({ dateRange, setDateRange, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayClick = (range) => {
    setDateRange(range);
    onDateChange(range);
  };

  return (
    <div className="w-full flex justify-end relative z-40 mb-6">
      <button
        onClick={() => setShowCalendar((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm shadow"
      >
        <FaCalendarAlt />
        {showCalendar ? "Hide Calendar" : "Select Date"}
      </button>

      {showCalendar && (
        <div className="absolute top-full mt-2 right-0 w-[320px] bg-white border border-slate-200 rounded-xl shadow-xl p-4">
          <DayPicker
            captionLayout="dropdown-buttons"
            mode="range"
            selected={dateRange}
            onSelect={handleDayClick}
            pagedNavigation
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarFilter;
