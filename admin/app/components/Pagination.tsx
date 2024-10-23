// import React, { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setcpage: (value: React.SetStateAction<number>) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setcpage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (page: number) => {
    setcpage(page);
    console.log(page);
    
  };
  return (
    <div className="pagination flex flex-row justify-end items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-button border px-4 py-1 bg-gray-800 rounded-md cursor-pointer mr-4 flex flex-row items-center justify-center gap-2 border-[#AAFFA9]"
      >
        <GrFormPreviousLink/>Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            currentPage === page ? "active bg-[#AAFFA9] border rounded-md border-[#AAFFA9] px-4 py-1 text-gray-800 mr-2" : "mr-2 rounded-md border px-4 py-1"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-button border px-4 py-1 bg-gray-800 rounded-md cursor-pointer ml-4 flex flex-row items-center justify-center gap-2 border-[#AAFFA9]"
      >
        Next <GrFormNextLink/>
      </button>
    </div>
  );
};

export default Pagination;
