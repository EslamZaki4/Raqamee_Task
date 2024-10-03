import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center ${
            i === currentPage
              ? 'border-primary border text-black font-medium'
              : 'text-black hover:bg-gray-50 font-thin'
          }`}
        >
          {i}
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
        <GoArrowLeft size={20} className="transition-transform duration-300 transform hover:-translate-x-2" />
        <p>Previous</p>
      </button>
      <div className="flex gap-2">
        {renderPageNumbers()}
      </div>
      <button
        className="flex items-center gap-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <p>Next</p>
        <GoArrowRight size={20} className="transition-transform duration-300 transform hover:translate-x-2" />
      </button>
    </div>
  );
};
