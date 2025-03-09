import { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import SidebarFilter from "../components/SidebarFilter"; // Import sidebar component
import { Search, Loader } from "lucide-react";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ minCGPA: 10, minStipend: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const limit = 50;

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const newJobs = await fetchJobs(currentPage, limit);
      setJobs(newJobs);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    loadJobs();
  }, [currentPage]);

  // Filtering jobs
  const filteredJobs = jobs.filter((job) => {
    return (
      job.Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      job.CGPA <= filters.minCGPA && job.Stipend >= filters.minStipend
    );
  });

  return (
    <div className="p-6">
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-6 left-6 z-50 p-2  text-black rounded-md w-10"
        style={{backgroundColor:"#f4b3b3"}}
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰ 
      </button>

      {/* Sidebar Component */}
      <SidebarFilter filters={filters} setFilters={setFilters} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col items-center" style={{ color: "#CAE7F7" }}>
        <h1 className="text-6xl font-bold mb-2 mt-10 mate-regular">Job Listings</h1>
        <p className="text-sm mt-2">@NSUT</p>

        {/* Search Bar */}
        <div className="flex mt-10 w-full max-w-md border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
          <span className="flex items-center px-3 text-gray-600">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Type company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-black"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600">
              Clear
            </button>
          )}
        </div>

        <div className="m-10">
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin h-8 w-8 text-blue-300 mt-10" />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
