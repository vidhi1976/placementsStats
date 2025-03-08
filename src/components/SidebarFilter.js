import { motion, AnimatePresence } from "framer-motion";

export default function SidebarFilter({ filters, setFilters, isOpen, setIsOpen }) {
  // Function to clear filters
  const clearFilters = () => {
    setFilters({ minCGPA: 10, minStipend: 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }} // Start hidden
          animate={{ x: 0, opacity: 1 }} // Slide in
          exit={{ x: -300, opacity: 0 }} // Slide out when closed
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-96 h-full mate-regular text-white p-6 z-50 shadow-lg"
          style={{ backgroundColor: "#CAE7F7", color: "#0f0000" }}
        >
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-xl" onClick={() => setIsOpen(false)}>
            ✖
          </button>

          <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>

          {/* CGPA Filter */}
          <label className="block mb-2">CGPA cap:</label>
          <input
            type="number"
            className="w-full p-2 mb-4 text-black rounded-md"
            placeholder="Enter CGPA"
            value={filters.minCGPA === 0 ? "" : filters.minCGPA}
            onChange={(e) =>
              setFilters({ ...filters, minCGPA: e.target.value === "" ? 0 : Number(e.target.value) })
            }
          />

          {/* Stipend Filter */}
          <label className="block mb-2">Minimum Stipend:</label>
          <input
            type="number"
            className="w-full p-2 mb-4 text-black rounded-md"
            placeholder="Enter Stipend"
            value={filters.minStipend === 0 ? "" : filters.minStipend}
            onChange={(e) =>
              setFilters({ ...filters, minStipend: e.target.value === "" ? 0 : Number(e.target.value) })
            }
          />

          {/* Button Container */}
          <div className="flex justify-between mt-4">
            {/* Apply Filters Button */}
            <button
              className="w-1/2 p-2 rounded-md text-white"
              style={{ backgroundColor: "#0f0000" }}
              onClick={() => setIsOpen(false)}
            >
              Apply Filters
            </button>

            {/* Clear Filters Button */}
            <button
              className="w-1/2 p-2 rounded-md text-white ml-2"
              style={{ backgroundColor: "#e30202" }} // Red color for reset
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
