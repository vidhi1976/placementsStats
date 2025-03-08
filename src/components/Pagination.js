import React from "react";
import { Loader } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, loading }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      {loading && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin h-8 w-8 mt-10 text-blue-300" />
        </div>
      )}
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading} // Disable if loading
          className="px-4 py-2 mate-regular bg-blue-500 text-white rounded-lg disabled:bg-gray-600"
          style={{ backgroundColor: "#CAE7F7", color: "#0f0000" }}
        >
          Previous 50
        </button>

        <span
          className="text-lg font-semibold mate-regular font-bold"
          style={{ color: "#f4b3b3" }}
        >
          Page {currentPage}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={loading} // Disable if loading
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mate-regular"
          style={{ backgroundColor: "#CAE7F7", color: "#0f0000" }}
        >
          Next 50
        </button>
      </div>
    </div>
  );
};

export default Pagination;
