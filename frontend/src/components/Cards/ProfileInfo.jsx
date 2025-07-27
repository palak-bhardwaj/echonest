import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-4 px-4 py-1 rounded-full bg-[#dffbff]  shadow-sm transition-all duration-300">
        {/* Avatar with initials */}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#01b0cb] text-white font-semibold text-lg shadow-inner">
          {getInitials(userInfo?.fullName || "")}
        </div>
        
        {/* logout button */}
        <div className="flex flex-col">
          {/* <p className="text-sm font-medium text-[#016d85]">{userInfo.fullName}</p> */}
          <button
            className="text-xs text-white px-3 py-2 rounded-full bg-[#01b0cb] hover:bg-[#0193aa] transition-colors duration-200 shadow-sm"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
