import React, { useEffect, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(10); 

  useEffect(() => {
    const updateMaxVisiblePages = () => {
      setMaxVisiblePages(window.innerWidth < 768 ? 2 : 10); 
    };

    // Set initial value on mount
    updateMaxVisiblePages();

    // Add event listener for window resize
    window.addEventListener("resize", updateMaxVisiblePages);
    
    
    return () => {
      window.removeEventListener("resize", updateMaxVisiblePages);
    };
  }, []); 

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

  
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => onPageChange(1)} className="w-8 h-8">
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center ${
            i === currentPage
              ? "border-primary border text-black font-medium"
              : "text-black hover:bg-gray-50 font-thin"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className="w-8 h-8">
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center mt-[61px]">
      <button
        className="flex items-center gap-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GoArrowLeft
          size={20}
          className={`transition-transform duration-300 transform ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:-translate-x-2'}`}
        />
        <p className={currentPage === 1 ? "text-gray-300 cursor-not-allowed" : ""}>Previous</p>
      </button>
      <div className="flex gap-2 md:translate-y-0 translate-y-16">
        {renderPageNumbers()}
      </div>
      <button
        className="flex items-center gap-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <p className={currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : ""}>Next</p>
        <GoArrowRight
          size={20}
          className={`transition-transform duration-300 transform ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:translate-x-2'}`}
        />
      </button>
    </div>
  );
};
