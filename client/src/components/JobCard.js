import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JobCard = ({ job }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBranches, setShowBranches] = useState(false);

  if (!job) return null;

  // Format stipend according to Indian currency notation
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  // Toggle flip on click
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="w-96 h-72 relative cursor-pointer perspective-1000"
      onClick={handleCardClick}
    >
      <AnimatePresence >
        {/* Front Side - Company Name */}
{!isFlipped && (
  <motion.div
    key="front"
    initial={{ rotateY: 180, opacity: 0 }}
    animate={{ rotateY: 0, opacity: 1 }}
    exit={{ rotateY: -180, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }} // Faster transition
    className="absolute w-full h-full flex flex-col items-center justify-center text-2xl text-black rounded-3xl backface-hidden shadow-2xl"
    style={{
      backgroundColor: "#f4b3b3",
      boxShadow: "10px 10px 10px #dcfffd", // Large shadow
    }}
  >
    <p className="text-4xl font-extrabold">{job.Name}</p>
    <p className="text-sm mt-2" style={{ color: "#0f0000" }}>
      Came on {job["Arrival Date"]}
    </p>
  </motion.div>
)}


        {/* Back Side - Job Details */}
        {isFlipped && (
          <motion.div
            key="back"
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 180, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }} // Faster transition
            className="absolute w-full h-full text-gray-800 flex flex-col p-4 justify-between border-gray-300 rounded-3xl  backface-hidden"
            style={{ backgroundColor: "#dcfffd", color: "#0f0000" }}
          >
            <div>
              <p className="font-bold text-lg">{job.Title}</p>
              <p>
                <strong>CGPA:</strong> {job.CGPA === 0 ? "N/A" : job.CGPA}
              </p>
              <p>
                <strong>Location:</strong> {job.Location}
              </p>
              <p>
                <strong>Stipend:</strong>{" "}
                {job.Stipend === 0 ? "N/A" : `₹${formatCurrency(job.Stipend)}`}
              </p>
              <p>
                <strong>Type:</strong> {job.Type}
              </p>
              <p>
                <strong>Arrival Date:</strong> {job["Arrival Date"]}
              </p>
            </div>

            {/* Branches List with Hover & Click Effect */}
            <div
              className="relative text-sm cursor-pointer"
              onMouseEnter={() => setShowBranches(true)}
              onMouseLeave={() => setShowBranches(false)}
              onClick={() => setShowBranches(!showBranches)} // Tap to toggle on mobile
            >
              <strong>Branches:</strong> {job["Branches Allowed"].slice(0, 4).join(", ")}...
              {showBranches && (
                <div className="absolute bottom-8 left-0 w-60 p-2 bg-white text-black border border-gray-300 shadow-lg rounded-md z-10">
                  {job["Branches Allowed"].join(", ")}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobCard;
