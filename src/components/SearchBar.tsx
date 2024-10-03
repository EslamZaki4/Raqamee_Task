import searchIcon from "../assets/searchIcon.svg";
import { SearchBarProps } from "../types/types";
export const SearchBar = ({ onSearch }:SearchBarProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative lg:w-[38%] w-full">
      <input
        type="text"
        placeholder="Search"
        className=" rounded border px-[13px] py-[11px] w-full pl-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[14px] placeholder:text-[#737373]"
        onChange={handleSearch}
      />

      <img
        src={searchIcon}
        alt="searchIcon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
      />
    </div>
  );
};
