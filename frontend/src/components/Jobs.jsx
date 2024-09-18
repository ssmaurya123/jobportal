import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

// normalizeText apne sey likha hai
const normalizeText = (text) => {
  return text
    .toLowerCase() // Convert to lowercase for case-insensitive comparison
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, ""); // Replace multiple spaces with a single space
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          // job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          // job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          // job.location.toLowerCase().includes(searchedQuery.toLowerCase())

          normalizeText(job.title).includes(normalizeText(searchedQuery)) ||
          normalizeText(job.description).includes(
            normalizeText(searchedQuery)
          ) ||
          normalizeText(job.location).includes(normalizeText(searchedQuery)) ||
          normalizeText(job.jobType).includes(normalizeText(searchedQuery))
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            // <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            //   <div className="grid grid-cols-3 gap-4">
            //     {filterJobs.map((job) => (
            //       // <motion.div
            //       //   initial={{ opacity: 0, x: 100 }}
            //       //   animate={{ opacity: 1, x: 0 }}
            //       //   exit={{ opacity: 0, x: -100 }}
            //       //   transition={{ duration: 0.3 }}
            //       //   key={job?._id}
            //       // >
            //       //   <Job job={job} />
            //       // </motion.div>

            //       <motion.div
            //         initial={{ opacity: 0, x: 50, scale: 0.95 }}
            //         animate={{ opacity: 1, x: 0, scale: 1 }}
            //         exit={{ opacity: 0, x: -50, scale: 0.95 }}
            //         transition={{ duration: 0.6, ease: [0.25, 0.8, 0.5, 1] }} // Custom easing for extra smoothness
            //         style={{ overflow: "hidden" }} // Ensure no overflow during animation
            //         key={job?._id}
            //       >
            //         <Job job={job} />
            //       </motion.div>
            //     ))}
            //   </div>
            // </div>

            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <motion.div
                key={filterJobs.length} // Change key to trigger animation on the first filter
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-3 gap-4"
              >
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.8, 0.5, 1] }} // Custom easing for extra smoothness
                    style={{ overflow: "hidden" }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
