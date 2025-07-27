import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <div className="bg-gradient-to-r from-cyan-100 via-cyan-50 to-white shadow-md px-1 sm:px-8 py-2 sticky top-0 z-20 flex items-center justify-between rounded-b-lg">
      {/* Logo / Title */}
      <h1 className="text-2xl sm:text-2xl font-bold text-[#01b0cb] tracking-tight">
        WanderTales
      </h1>

      {/* Conditional render based on login */}
      {isToken && (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto mt-3 sm:mt-0">
          {/* Search */}
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          {/* Profile Info */}
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
