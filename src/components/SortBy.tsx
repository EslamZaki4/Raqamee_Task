import { useEffect, useRef, useState } from "react";
import { Option, SortByProps } from "../types/types";



export const SortBy: React.FC<SortByProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [selectedValue, setSelectedValue] = useState<string>("A-Z"); 
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null); 

  const options: Option[] = [ 
    { value: "name-asc", label: "A-Z" },
    { value: "name-desc", label: "Z-A" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const handleSort = (value: string) => {
    onSort(value);
    setSelectedValue(options.find((option) => option.value === value)?.label || ""); 
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    buttonRef.current?.focus(); 
  };

  return (
    <>
      <p className="hidden md:flex justify-center items-center text-[14px]">Sort by</p>
      <div className="relative inline-block" ref={dropdownRef}>
        <div
          onClick={handleClick}
          ref={buttonRef}
          tabIndex={0} 
          className="border p-2 text-[14px] rounded w-[202.11px] h-full pr-8 cursor-pointer transition duration-300 ease-in-out
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {selectedValue}
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
              className={`w-4 h-4 text-black transition-transform duration-300 ease-in-out select-none
                          ${isOpen ? "transform rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>

        {isOpen && (
          <ul className="absolute left-0 w-full bg-white border rounded shadow-md z-10">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSort(option.value)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
